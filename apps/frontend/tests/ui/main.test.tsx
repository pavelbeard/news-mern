import { createRoutesStub } from "react-router";
import { vi, describe, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Home from "@/components/main-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dummyData from "tests/ui/fixtures/news1.json";
import dummyData_objects from "tests/ui/fixtures/news2_array.json";
import NewsPage from "@/components/news-page";

const queryClient = new QueryClient();
const MockedProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
  };
});

vi.mock("@/lib/hooks/news/use-get-last-news", () => ({
  useGetLastNews: () => {
    return {
      data: {
        dummyData,
        object: {
          ...dummyData.object,
          date: new Date(dummyData.object.date.$date).toISOString(),
        },
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    };
  },
}));

describe("Testing components", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("Render testings", () => {
    it("should render", async () => {
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: Home,
        },
      ]);

      const doc = render(
        <MockedProvider>
          <Stub initialEntries={["/"]} />
        </MockedProvider>
      );
      doc.debug();

      doc.findByText("title");
    });
  });

  describe("Data fetching testings", () => {
    describe("<Home />", () => {
      it("should fetch last news data", async () => {
        const Stub = createRoutesStub([
          {
            path: "/",
            Component: Home,
          },
        ]);

        const doc = render(
          <MockedProvider>
            <Stub initialEntries={["/"]} />
          </MockedProvider>
        );

        doc.findByLabelText(dummyData.object.title);
        doc.findByText(dummyData.object.content);
      });

      it("should not fetch last news data", async () => {
        vi.mock("@/lib/hooks/news/use-get-last-news", () => ({
          useGetLastNews: () => ({
            data: undefined,
            isLoading: false,
            isError: true,
            refetch: vi.fn(),
          }),
        }));

        const Stub = createRoutesStub([
          {
            path: "/",
            Component: Home,
          },
        ]);

        const doc = render(
          <MockedProvider>
            <Stub initialEntries={["/"]} />
          </MockedProvider>
        );

        doc.debug();

        await doc.findByText("There is no news.");
      });
    });

    describe("<News page />", () => {
      it("should fetch all unarchived news", async () => {
        vi.mock("@/lib/hooks/news/use-get-news", () => ({
          useGetNews: () => ({
            data: {
              ...dummyData_objects,
            },
            isLoading: false,
            isError: false,
            refetch: vi.fn(),
          }),
        }));

        const Stub = createRoutesStub([
          {
            path: "/news",
            Component: NewsPage,
          },
        ]);

        const doc = render(
          <MockedProvider>
            <Stub initialEntries={["/news"]} />
          </MockedProvider>
        );

        doc.debug();

        await doc.findByLabelText(dummyData_objects.objects[0].title);
        await doc.findByText("Add news?");
      });
    });
  });
});
