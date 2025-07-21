import supertest from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import app from "../api";
import { resetDb } from "../src/lib/db/reset-db"; // Import the reset function to clean up after tests
import { seedDb } from "../src/lib/db/seed"; // Ensure the seed file is imported to set up the environment

describe("News API Tests", () => {
  beforeEach(async () => {
    process.env.MONGODB_URL = "mongodb://localhost:27019";
    await seedDb();
  });

  afterEach(async () => {
    await resetDb();
  });

  describe("[POST] /api/v1/news", () => {
    it("should throw an error if there is no body", async () => {
      await supertest(app)
        .post("/api/v1/news")
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing input provided for: body",
          });
        });
    });

    it("should throw an error if the body is invalid", async () => {
      await supertest(app)
        .post("/api/v1/news")
        .send({ title: "Test Title" }) // Missing content and author
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing inputs provided for: content, author",
          });
        });
    });

    it("should create news with valid body and then create one with the same title.", async () => {
      const newsData = {
        title: "Test News",
        author: "Test Author",
        content: "This is a test news content.",
        description: "Test description",
      };

      await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual({
            object: expect.objectContaining(newsData),
          });
        });

      await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "The news with that title already exists.",
          });
        });
    });
  });

  describe("[GET] /api/v1/news", () => {
    describe("getAllNews", async () => {
      it("should return all news", async () => {
        await supertest(app)
          .post("/api/v1/news")
          .send({
            title: "Test News",
            author: "Test Author",
            content: "This is a test news content.",
            description: "Test description",
          })
          .expect(201);

        await supertest(app)
          .get("/api/v1/news")
          .expect(200)
          .expect((res) => {
            expect(res.body.objects).toBeDefined();
            expect(res.body.objects).toBeInstanceOf(Array);
            expect(res.body.objects.length).toBeGreaterThan(0);
          });
      });
    });

    describe("getAllArchiveNews", async () => {
      it("should return all archived news", async () => {
        await supertest(app)
          .get("/api/v1/news-archive")
          .expect(200)
          .expect((res) => {
            expect(res.body.objects).toBeDefined();
            expect(res.body.objects).toBeInstanceOf(Array);

            expect(res.body.objects.length).toBeGreaterThan(0);
          });
      });
    });

    describe("getNewsById", async () => {
      it("should throw 404 if news not found", async () => {
        await supertest(app)
          .get("/api/v1/news/999")
          .expect(404)
          .expect((res) => {
            expect(res.body.message).toBe("News not found.");
          });
      });

      it("should return news by ID", async () => {
        const createNewsResponse = await supertest(app)
          .post("/api/v1/news")
          .send({
            title: "Test News By ID",
            author: "Test Author",
            content: "This is a test news content for ID retrieval.",
            description: "Test description for ID retrieval",
          })
          .expect(201);

        const newsId = createNewsResponse.body.object._id;

        await supertest(app)
          .get(`/api/v1/news/${newsId}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.object).toBeDefined();
            expect(res.body.object._id).toBe(newsId);
          });
      });
    });

    describe("getLastNews", async () => {
      it("should return nothing", async () => {
        await resetDb();

        await supertest(app)
          .get("/api/v1/news-last")
          .expect(404)
          .expect((res) => {
            expect(res.body.message).toBe("News not found.");
          });
      });

      it("should return the last news", async () => {
        await seedDb();

        await supertest(app)
          .get("/api/v1/news-last")
          .expect(200)
          .expect((res) => {
            expect(res.body.object).toBeDefined();
          });
      });
    });
  });

  describe("[PUT] /api/v1/news/:_id", () => {
    it("should throw an error if there is no body", async () => {
      await supertest(app)
        .put("/api/v1/news/123")
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing input provided for: body",
          });
        });
    });

    it("should throw an error if the body is invalid", async () => {
      await supertest(app)
        .put("/api/v1/news/123")
        .send({ title: "Updated Title" }) // Missing content and author
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing inputs provided for: content, author",
          });
        });
    });

    it("should throw an error if there is wrong ID format", async () => {
      const newsData = {
        title: "Test News Update",
        author: "Test Author",
        content: "This is a test news content for update.",
        description: "Test description for update",
      };

      await supertest(app)
        .put("/api/v1/news/123")
        .send(newsData)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "News didn't update, because it doesn't exist.",
          });
        });
    });

    it("should update news with valid body", async () => {
      const newsData = {
        title: "Test News Update",
        author: "Test Author",
        content: "This is a test news content for update.",
        description: "Test description for update",
      };

      const createResponse = await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201);

      const newsId = createResponse.body.object._id;

      const updatedData = {
        ...newsData,
        title: "Updated Test News",
      };

      await supertest(app)
        .put(`/api/v1/news/${newsId}`)
        .send(updatedData)
        .expect(200)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
          expect(res.body.object.title).toBe(updatedData.title);
        });
    });
  });

  describe("[PATCH] /api/v1/news/:_id", () => {
    it("should throw an error if there is no archiveDate", async () => {
      const newsData = {
        title: "Test News Archive",
        author: "Test Author",
        content: "This is a test news content for archive.",
        description: "Test description for archive",
      };

      const response = await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
        });

      await supertest(app)
        .patch(`/api/v1/news/${response.body.object._id}`)
        .send({ archiveDate: "" }) // Empty archiveDate
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing input provided for: archiveDate",
          });
        });
    });

    it("should throw an error if the body is invalid", async () => {
      const newsData = {
        title: "Test News Archive",
        author: "Test Author",
        content: "This is a test news content for archive.",
        description: "Test description for archive",
      };

      await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
        });

      const response = await supertest(app)
        .get("/api/v1/news-last")
        .expect(200)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
        });

      await supertest(app)
        .patch(`/api/v1/news/${response.body.object._id}`)
        .send({ archiveDate: "Updated Title" }) // Missing content and author
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "Invalid or missing input provided for: archiveDate",
          });
        });
    });

    it("should throw an error if there is wrong ID format", async () => {
      const newsData = {
        archiveDate: new Date().toISOString(),
      };

      await supertest(app)
        .patch("/api/v1/news/123")
        .send(newsData)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "News didn't update, because it doesn't exist.",
          });
        });
    });

    it("should archive news with valid body", async () => {
      const newsData = {
        title: "Test News Archive 1",
        author: "Test Author",
        content: "This is a test news content for archive.",
        description: "Test description for archive",
      };

      const response = await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
        });

      await supertest(app)
        .patch(`/api/v1/news/${response.body.object._id}`)
        .send({ archiveDate: new Date() })
        .expect(200)
        .expect((res) => {
          expect(res.body.object).toBeDefined();
          expect(res.body.object.archiveDate).toBeDefined();
        });
    });
  });

  describe("[DELETE] /api/v1/news/:_id", () => {
    it("should throw an error if there is wrong ID format", async () => {
      await supertest(app)
        .delete("/api/v1/news/123")
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({
            message: "News didn't delete, because it doesn't exist.",
          });
        });
    });

    it("should delete news by ID", async () => {
      const newsData = {
        title: "Test News Delete",
        author: "Test Author",
        content: "This is a test news content for delete.",
        description: "Test description for delete",
      };

      const createResponse = await supertest(app)
        .post("/api/v1/news")
        .send(newsData)
        .expect(201);

      const newsId = createResponse.body.object._id;

      await supertest(app).delete(`/api/v1/news/${newsId}`).expect(204);
    });
  });
});
