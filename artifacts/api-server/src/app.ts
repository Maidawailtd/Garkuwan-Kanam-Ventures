import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { looseRateLimit } from "./middleware/rateLimit";
import { securityHeaders, corsConfig } from "./middleware/securityHeaders";

const app: Express = express();

// Disable ETags so DB changes are always reflected without 304 stale responses
app.set("etag", false);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// Security headers first
app.use(securityHeaders);

app.use(cors(corsConfig()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply global rate limiting
app.use(looseRateLimit);

app.use("/api", router);

export default app;
