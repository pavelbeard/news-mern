import { describe, expect, it } from "vitest";
import { AppError } from "./appError";

function generator400() {
  try {
    const request = 1 / 0;

    if (request === Infinity)
      throw new AppError("BAD_REQUEST", "Is not allowed to divide by 0!");

    console.log(request);
  } catch (e) {
    if (e instanceof AppError) {
      throw e;
    }
  }
}

function generator404() {
  const someArrayWithData = [
    {
      name: "andrea",
    },
    {
      name: "maria",
    },
    {
      name: "jose",
    },
  ];

  const nameToFind = "notExists";

  if (someArrayWithData.findIndex((a) => a.name === nameToFind) === -1) {
    throw new AppError("NOT_FOUND", "Name not found");
  }
}

function generator500() {
  throw new AppError("SERVER", "Because I do whatever I want!");
}

describe("Test App Error", () => {
  it("Should throw 400", () => {
    expect(() => generator400()).toThrowError("Is not allowed to divide by 0!");
  });

  it("Should throw 404", () => {
    expect(() => generator404()).toThrowError("Name not found");
  });

  it("Should throw 500", () => {
    expect(() => generator500()).toThrowError("Because I do whatever I want!");
  });
});
