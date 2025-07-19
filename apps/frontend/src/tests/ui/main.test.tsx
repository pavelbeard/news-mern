import { readFileSync } from "fs";
import { createRoutesStub } from "react-router";
import { vi, describe, it, beforeEach, afterEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import Home from "@/components/main-page";

function dummyData() {
  const data = readFileSync(
    process.cwd() + "/src/tests/ui/fixtures/news1.json",
    "utf-8"
  );
  return { object: { ...JSON.parse(data), date: new Date() } };
}

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
  };
});

describe("Test <Home />", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Render testings", () => {
    it("should render", async () => {
      const Stub = createRoutesStub([
        {
          path: "/",
          Component: Home,
          loader() {
            return dummyData();
          },
        },
      ]);

      const doc = render(<Stub initialEntries={["/"]} />);
      doc.debug()

      await waitFor(() => doc.findAllByTestId("title"));
    });
  });
});
