import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { API_PREFIX_URL } from "linked-models/abstraction/api.prefix.url";

@controller(API_PREFIX_URL)
export class HealthCheckController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor() {
    super();
  }

  @httpGet("/check-hash")
  async healthCheck(): Promise<OkResult> {
    return this.ok();
  }
}
