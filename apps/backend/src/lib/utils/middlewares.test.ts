import { type Response, Request } from "express";
import { describe, expect, it, vi } from "vitest";
import { AppError } from "./appError";
import { errorFallbackMiddleware } from "./middlewares";

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
});
