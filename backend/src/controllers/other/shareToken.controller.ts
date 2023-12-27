import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
  queryParam,
  request,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import {
  SHARE_HASH_PARAM,
  URL_IS_VALID,
  URL_SHARED,
} from "linked-models/accessLink/accessLink.url";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import { AccessLinkService } from "services/accessLink/accessLink.service";

@controller(URL_SHARED)
export class ShareTokenController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(AccessLinkService)
    private readonly accessLinkService: AccessLinkService
  ) {
    super();
  }

  @httpGet(URL_IS_VALID)
  async checkHashValidity(
    @queryParam(SHARE_HASH_PARAM) hash: string,
    @queryParam(USER_PARAM) userId: string | undefined,
    @queryParam(TODO_LIST_PARAM) todoListId: string | undefined,
    @request() req: Request
  ): Promise<OkResult> {
    const scope: Partial<IAccessLinkScopes> = {};
    if (userId) scope[USER_PARAM] = userId;
    if (todoListId) scope[TODO_LIST_PARAM] = todoListId;

    const isValid = await this.accessLinkService.checkValidity(hash, scope);
    return this.ok({ isValid });
  }
}
