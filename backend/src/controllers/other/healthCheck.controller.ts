import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";

@controller("")
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
