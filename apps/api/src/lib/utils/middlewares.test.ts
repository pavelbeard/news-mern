import {
  newsArchiveSchema,
  newsCreateSchema,
  newsReadSchema,
  newsUpdateSchema,
} from "@/features/news/news.schema";
import type { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppError } from "./appError";
import {
  errorFallbackMiddleware,
  schemaValidationMiddleware,
} from "./middlewares";

describe("Tests middlewares", () => {
  describe("Tests errorFallback", () => {
    const request = vi.fn() as unknown as Request;
    const next = vi.fn();

    it("Should return 400", () => {
      const response = {
        send: vi.fn().mockReturnThis(),
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;

      errorFallbackMiddleware(
        new AppError("BAD_REQUEST", "Test 400"),
        request,
        response,
        next
      );

      expect(response.json).toHaveBeenCalled();
      expect(response.json).toHaveBeenCalledWith({
        message: "Test 400",
      });
    });
  });

  describe("Tests validate", () => {
    let request: Request;
    let response: Response;
    const next = vi.fn();

    beforeEach(() => {
      vi.restoreAllMocks();
      vi.useFakeTimers();
      response = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      } as unknown as Response;
      request = {} as Request;
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    describe("newsCreateSchema", () => {
      it("should throw a validation error", async () => {
        request.body = {};

        await schemaValidationMiddleware(newsCreateSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "BAD_REQUEST",
            `Invalid or missing inputs provided for: title, content, author`
          )
        );
      });

      it("should pass", async () => {
        request.body = {
          title: "Random title",
          content: "Random content",
          author: "Random author",
        };

        await schemaValidationMiddleware(newsCreateSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("newsReadSchema", () => {
      it("should throw a validation error", async () => {
        request.params = {};

        await schemaValidationMiddleware(newsReadSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "BAD_REQUEST",
            `Invalid or missing input provided for: _id`
          )
        );
      });

      it("should pass", async () => {
        request.params = {
          _id: "random",
        };

        await schemaValidationMiddleware(newsReadSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("newsUpdateSchema", () => {
      it("should throw a validation error", async () => {
        request.params = {};
        request.body = {};

        await schemaValidationMiddleware(newsUpdateSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "BAD_REQUEST",
            `Invalid or missing inputs provided for: _id, title, content, author`
          )
        );
      });

      it("should pass", async () => {
        request.params = {
          _id: "random",
        };
        request.body = {
          title: "Random title",
          content: "Random content",
          author: "Random author",
        };

        await schemaValidationMiddleware(newsUpdateSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith();
      });
    });

    describe("newsArchiveSchema", () => {
      it("should throw a validation error", async () => {
        request.params = {};

        await schemaValidationMiddleware(newsArchiveSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith(
          new AppError(
            "BAD_REQUEST",
            `Invalid or missing inputs provided for: _id, body`
          )
        );
      });

      it("should pass", async () => {
        request.params = {
          _id: "random",
        };
        request.body = {
          archiveDate: new Date().toISOString(),
        };

        await schemaValidationMiddleware(newsReadSchema)(
          request,
          response,
          next
        );

        expect(next).toHaveBeenCalledWith();
      });
    });
  });
});
