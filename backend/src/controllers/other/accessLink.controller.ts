import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  queryParam,
  request,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { AccessHashesForTodoListDTO } from "linked-models/accessLink/accessLink.dto";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import {
  ACCESS_LINK_HEADER,
  ROLE_PARAM,
  SHARE_HASH_PARAM,
  URL_ACCESS_LINK,
  URL_IS_VALID,
  URL_ROLE,
  URL_ROLES,
  URL_SCOPES,
  URL_SHARED,
} from "linked-models/accessLink/accessLink.url";
import { TodoListRole } from "linked-models/permissions/todoList.permissions.enum";
import {
  TODO_LIST_PARAM,
  URL_TODO_LIST,
  URL_TODO_LISTS,
} from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import { AccessLinkService } from "services/accessLink/accessLink.service";

@controller(URL_ACCESS_LINK)
export class AccessLinkController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(AccessLinkService)
    private readonly accessLinkService: AccessLinkService
  ) {
    super();
  }

  @httpGet(URL_SHARED + URL_IS_VALID)
  async checkHashValidity(
    @queryParam(SHARE_HASH_PARAM) hash: string,
    @queryParam(USER_PARAM) userId: string | undefined,
    @queryParam(TODO_LIST_PARAM) todoListId: string | undefined
  ): Promise<OkResult> {
    const scope: Partial<IAccessLinkScopes> = {};
    if (userId) scope[USER_PARAM] = userId;
    if (todoListId) scope[TODO_LIST_PARAM] = todoListId;

    const isValid = await this.accessLinkService.checkValidity(hash, scope);
    return this.ok({ isValid });
  }

  @httpGet(URL_SCOPES)
  async getScopesForToken(@request() req: Express.Request): Promise<OkResult> {
    const hash = req.headers[ACCESS_LINK_HEADER];

    const accessLink = await this.accessLinkService.getAccessLinkByHash(hash);

    if (!accessLink) return this.statusCode(404);

    const scopes: IAccessLinkScopes = {
      [USER_PARAM]: accessLink[USER_PARAM],
      [TODO_LIST_PARAM]: accessLink[TODO_LIST_PARAM],
      todoListRole: accessLink?.todoListRole,
    };
    return this.ok(scopes);
  }

  @httpGet(URL_TODO_LISTS + URL_TODO_LIST())
  async getLinksForTodoList(
    @requestParam(TODO_LIST_PARAM) todoListId: string
  ): Promise<OkResult> {
    if (!todoListId) return this.json("todoListId is required", 400);
    const links = await this.accessLinkService.getAccessLinksByScope({
      todoListId,
    });

    const linksDTO = {} as AccessHashesForTodoListDTO;

    const todoListUrl = `${
      process.env.CLIENT_URL
    }${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}`;

    for (const link of links) {
      if (!link.todoListRole) continue;

      const fullLink = this.accessLinkService.composeLink(todoListUrl, link);
      linksDTO[link.todoListRole] = fullLink;
    }

    return this.ok(linksDTO);
  }

  @httpPost(URL_TODO_LISTS + URL_TODO_LIST() + URL_ROLES + URL_ROLE())
  async createLinkForTodoListAndRole(
    @request() req: Express.Request,
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestParam(ROLE_PARAM) role: TodoListRole
  ): Promise<OkResult> {
    
    if (!todoListId) return this.json("todoListId is required", 400);
    if (!role) return this.json("role is required", 400);

    const links = await this.accessLinkService.getAccessLinksByScope({
      todoListId,
      todoListRole: role,
    });

    if (links.length > 0) return this.ok(links[0]);

    const newLink = await this.accessLinkService.createAccessLink(undefined, {
      todoListId,
      todoListRole: role,
    });

    const todoListUrl = `${
      process.env.CLIENT_URL
    }${URL_TODO_LISTS}${URL_TODO_LIST(todoListId)}`;

    const fullLink = this.accessLinkService.composeLink(todoListUrl, newLink);

    return this.ok(fullLink);
  }

  @httpDelete(URL_TODO_LISTS + URL_TODO_LIST() + URL_ROLES + URL_ROLE())
  async deleteLinkForTodoListAndRole(
    @requestParam(TODO_LIST_PARAM) todoListId: string,
    @requestParam(ROLE_PARAM) role: TodoListRole
  ): Promise<OkResult> {
    if (!todoListId) return this.json("todoListId is required", 400);
    if (!role) return this.json("role is required", 400);

    await this.accessLinkService.deleteAccessLinksByScope({
      todoListId,
      todoListRole: role,
    });

    return this.ok();
  }
}
