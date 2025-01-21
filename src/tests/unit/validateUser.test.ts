import { Request, Response, NextFunction } from "express";
import { validateUserRegistration } from "../../middlewares/userValidator";
import { validationResult } from "express-validator";

const mockRequest = (body: any) => ({ body } as Request);
const mockResponse = {} as Response;
const mockNext = jest.fn();

describe("User Registration Validation Middleware (Unit Test)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pass validation for valid input", async () => {
    const req = mockRequest({ username: "fabio", password: "password123" });

    await Promise.all(validateUserRegistration.map((middleware) => middleware(req, mockResponse, mockNext)));


    expect(mockNext).toHaveBeenCalledTimes(validateUserRegistration.length);
  });

  it("should return an error if username is missing", async () => {
    const req = mockRequest({ password: "password123" });

    await Promise.all(validateUserRegistration.map((middleware) => middleware(req, mockResponse, mockNext)));

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "username", msg: "Username is required" }),
        expect.objectContaining({ path: "username", msg: "Username must be at least 3 characters" }),
      ])
    );
  });

  it("should return an error if password is too short", async () => {
    const req = mockRequest({ username: "fabio", password: "123" });

    await Promise.all(validateUserRegistration.map((middleware) => middleware(req, mockResponse, mockNext)));


    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "password", msg: "Password must be at least 6 characters" }),
      ])
    );
  });
});

