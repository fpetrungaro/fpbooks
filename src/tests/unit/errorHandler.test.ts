import { errorHandler } from "../../middlewares/errorHandler";
import { Request, Response, NextFunction } from "express";

describe("Centralized Error Handler", () => {
  let mockReq: Request;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {} as Request;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    mockNext = jest.fn();
  });

  it("should return a 500 status and default message for unknown errors", () => {
    const error = new Error("Something went wrong");

    errorHandler(error, mockReq, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      errors: [],
    });
  });

  it("should return the error status and message if provided", () => {
    const error = { status: 400, message: "Bad Request", errors: ["Invalid input"] };

    errorHandler(error, mockReq, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Bad Request",
      errors: ["Invalid input"],
    });
  });
});

