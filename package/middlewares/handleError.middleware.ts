import { NextFunction, Request, Response } from "express";

class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (typeof err === "string") {
    // Handle human-readable error messages directly
    res.status(400).json({ message: err });
  } else if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
