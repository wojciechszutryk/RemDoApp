import { NextFunction, Request, Response } from "express";
import { CacheService } from "framework/cache/cache.service";
import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { idempotencyKey as idempotencyBodyKey } from "linked-models/pwa/pwa.constants";

@injectable()
export class CheckIdempotency extends BaseMiddleware {
  constructor(
    @inject(CacheService)
    private readonly cacheService: CacheService
  ) {
    super();
  }

  async handler(req: Request, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = req.body[idempotencyBodyKey];

      if (!idempotencyKey) {
        return res.status(400).json({
          error:
            "Idempotency key (idempotencyKey) is required for this request",
        });
      }

      const existing = this.cacheService.get<string>(idempotencyKey);
      if (existing) {
        //todo cache specific responses
        return res.status(200).json(JSON.parse(existing));
      }

      res.locals.idempotencyKey = idempotencyKey;
      next();
    } catch (error) {
      console.error("Idempotency middleware error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
