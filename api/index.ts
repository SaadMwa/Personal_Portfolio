import "dotenv/config";
import app from "../server/app";
import { connectMongo } from "../server/mongo";
import type { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await connectMongo();
  return app(req, res);
}
