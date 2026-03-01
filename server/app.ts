import express, { type NextFunction, type Request, type Response } from "express";
import { registerRoutes } from "./routes";

const app = express();

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV !== "production") {
    console.error("Internal Server Error:", err);
  }

  return res.status(status).json({ message });
});

export default app;
