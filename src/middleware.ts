import { NextFunction, Request, Response } from "express";

export function battleValid(req: Request, res: Response, next: NextFunction) {
  const { firstUser, secondUser } = req.body;

  if (!firstUser || !secondUser) {
    throw { type: "unprocessableEntity" };
  }

  res.locals.body = { firstUser, secondUser };
  next();
}

export function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (error.type === "unprocessableEntity") {
    return res.sendStatus(422);
  } else if (error.type === "notFound") {
    return res.sendStatus(404);
  }

  return res.sendStatus(500);
}
