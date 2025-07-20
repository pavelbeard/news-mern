import type { Response } from "express";
import mongoose from "mongoose";
import { News } from "src/lib/db/models/news.models";
import * as newsQueries from "src/lib/db/queries/news.queries";
import { AppError } from "src/lib/utils/appError";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  NewsArchiveRequest,
  NewsController,
  NewsCreateRequest,
  NewsReadRequest,
  NewsUpdateRequest,
} from "./news.controller";

vi.mock("queries/news.queries", () => ({
  saveNews: vi.fn(),
  getNewsByTitle: vi.fn(),
  getNewsById: vi.fn(),
  updateNewsById: vi.fn(),
  setNewsArchived: vi.fn(),
}));

describe("News controller", () => {
  let request;
  let response: Response;
  const next = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();

    response = {
      status: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      clearCookie: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Save news", () => {
    it("should throw error if there is not body.", async () => {
      request = {
        body: null,
      } as unknown as NewsCreateRequest;

      await NewsController.saveNews(request, response, next);

      expect(next).toHaveBeenCalledWith(
        new AppError("BAD_REQUEST", "There is no body.")
      );

      const calledNext = next.mock.calls[0]?.at(0);

      expect(calledNext).toBeInstanceOf(AppError);
      expect(calledNext.message).toBe("There is no body.");
      expect(calledNext.statusCode).toBe(400);
    });

    it("should throw error with the same title", async () => {
      const body = new News({
        title: "Random random title",
        date: new Date(),
        content: "Random content",
        author: "Random author",
        description: "Random description",
      });

      vi.mocked(newsQueries.getNewsByTitle).mockResolvedValue(body);

      const request = {
        body,
      } as unknown as NewsCreateRequest;

      await NewsController.saveNews(request, response, next);

      expect(next).toBeCalled();

      const calledNext = next.mock.calls[0]?.at(0);

      expect(calledNext).toBeInstanceOf(AppError);
      expect(calledNext.message).toBe(
        "The article with that title already exists."
      );
      expect(calledNext.statusCode).toBe(400);
    });

    it("should save the news object", async () => {
      const body = new News({
        title: "Random random title",
        date: new Date(),
        content: "Random content",
        author: "Random author",
        description: "Random description",
      });

      const request = {
        body,
      } as unknown as NewsCreateRequest;

      vi.mocked(newsQueries.getNewsByTitle).mockResolvedValue(null);

      vi.mocked(newsQueries.saveNews).mockResolvedValueOnce(body);

      await NewsController.saveNews(request, response, next);

      expect(next).not.toBeCalled();

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        object: { ...body },
      });
    });
  });

  describe("Find news", () => {
    it("should throw an error if news not found", async () => {
      const request = {
        params: {
          _id: new mongoose.Types.ObjectId(),
        },
      } as unknown as NewsReadRequest;

      vi.mocked(newsQueries.getNewsById).mockResolvedValueOnce(null);

      await NewsController.getNewsById(request, response, next);

      const calledNext = next.mock.calls[0]?.at(0);

      expect(next).toHaveBeenCalledWith(
        new AppError("NOT_FOUND", "News not found.")
      );
      expect(calledNext.message).toBe("News not found.");
      expect(calledNext.statusCode).toBe(404);
    });

    it("should get the news object", async () => {
      const request = {
        params: {
          _id: new mongoose.Types.ObjectId(),
        },
      } as unknown as NewsReadRequest;

      const body = new News({
        title: "Random random title",
        date: new Date(),
        content: "Random content",
        author: "Random author",
        description: "Random description",
      });

      vi.mocked(newsQueries.getNewsById).mockResolvedValueOnce(body);

      await NewsController.getNewsById(request, response, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        object: { ...body },
      });
    });
  });

  describe("Update news", () => {
    describe("Update the whole news", () => {
      it("should throw an error if there is not body.", async () => {
        request = {
          body: null,
          params: {
            _id: new mongoose.Types.ObjectId(),
          },
        } as unknown as NewsUpdateRequest;

        await NewsController.updateNews(request, response, next);

        expect(next).toHaveBeenCalledWith(
          new AppError("BAD_REQUEST", "There is no body.")
        );

        const calledNext = next.mock.calls[0]?.at(0);

        expect(calledNext).toBeInstanceOf(AppError);
        expect(calledNext.message).toBe("There is no body.");
        expect(calledNext.statusCode).toBe(400);
      });

      it("should throw an error if news not found", async () => {
        const body = {
          title: "Random random title",
          date: new Date(),
          content: "Random content",
          author: "Random author",
          description: "Random description",
        };

        request = {
          body,
          params: {
            _id: new mongoose.Types.ObjectId(),
          },
        } as unknown as NewsUpdateRequest;

        vi.mocked(newsQueries.updateNewsById).mockResolvedValueOnce(null);

        await NewsController.updateNews(request, response, next);

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "NOT_FOUND",
            "News didn't updated, because it doesn't exist."
          )
        );

        const calledNext = next.mock.calls[0]?.at(0);

        expect(calledNext).toBeInstanceOf(AppError);
        expect(calledNext.message).toBe(
          "News didn't updated, because it doesn't exist."
        );
        expect(calledNext.statusCode).toBe(404);
      });

      it("should return updated object", async () => {
        const body = new News({
          title: "Random title",
          date: new Date(),
          content: "Random content",
          author: "Random author",
          description: "Random description",
        });

        request = {
          body,
          params: {
            _id: new mongoose.Types.ObjectId(),
          },
        } as unknown as NewsUpdateRequest;

        vi.mocked(newsQueries.getNewsById).mockResolvedValueOnce(body);

        await NewsController.getNewsById(request, response, next);

        expect(response.json).toHaveBeenCalledWith({
          object: body,
        });

        const updatedObject = body.set({
          title: "New random title",
        });

        vi.mocked(newsQueries.updateNewsById).mockResolvedValueOnce(
          updatedObject
        );

        await NewsController.updateNews(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
          object: { ...updatedObject },
        });
      });
    });

    describe("Archive the news", () => {
      it("should throw an error if there is not body.", async () => {
        request = {
          body: null,
          params: {
            _id: new mongoose.Types.ObjectId(),
          },
        } as unknown as NewsArchiveRequest;

        await NewsController.archiveNews(request, response, next);

        expect(next).toHaveBeenCalledWith(
          new AppError("BAD_REQUEST", "There is no body.")
        );

        const calledNext = next.mock.calls[0]?.at(0);

        expect(calledNext).toBeInstanceOf(AppError);
        expect(calledNext.message).toBe("There is no body.");
        expect(calledNext.statusCode).toBe(400);
      });

      it("should throw an error if news not found", async () => {
        const body = {
          archiveDate: new Date(),
        };

        request = {
          body,
          params: {
            _id: new mongoose.Types.ObjectId(),
          },
        } as unknown as NewsArchiveRequest;

        vi.mocked(newsQueries.setNewsArchived).mockResolvedValueOnce(null);

        await NewsController.archiveNews(request, response, next);

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "NOT_FOUND",
            "News didn't updated, because it doesn't exist."
          )
        );

        const calledNext = next.mock.calls[0]?.at(0);

        expect(calledNext).toBeInstanceOf(AppError);
        expect(calledNext.message).toBe(
          "News didn't updated, because it doesn't exist."
        );
        expect(calledNext.statusCode).toBe(404);
      });

      it("should return updated object", async () => {
        const body1 = new News({
          title: "Random title",
          date: new Date(),
          content: "Random content",
          author: "Random author",
          description: "Random description",
        });

        const request1 = {
          body: body1,
          params: {
            _id: "random_id",
          },
        } as unknown as NewsReadRequest;

        vi.mocked(newsQueries.getNewsById).mockResolvedValueOnce(body1);

        await NewsController.getNewsById(request1, response, next);

        expect(response.json).toHaveBeenCalledWith({
          object: body1,
        });

        const archiveDate = new Date();

        const body2 = {
          archiveDate: new Date(
            archiveDate.setHours(archiveDate.getHours() + 1)
          ),
        };

        request = {
          body: body2,
          params: {
            _id: "random_id",
          },
        } as unknown as NewsArchiveRequest;

        const updatedObject = body1.set({
          archiveDate,
        });

        vi.mocked(newsQueries.setNewsArchived).mockResolvedValueOnce(
          updatedObject
        );

        await NewsController.archiveNews(request, response, next);

        expect(next).not.toHaveBeenCalled();
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({
          object: { ...updatedObject },
        });
      });
    });
  });
});
