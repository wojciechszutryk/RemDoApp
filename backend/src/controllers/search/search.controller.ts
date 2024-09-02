import express from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  interfaces,
  queryParam,
  response,
} from "inversify-express-utils";
import { SearchCategory } from "linked-models/search/search.model";
import {
  SEARCH_PHRASE_PARAM,
  URL_SEARCH,
} from "linked-models/search/search.urls";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SearchService } from "services/search/search.service";

@controller(URL_SEARCH, SetCurrentUser)
export class SearchController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(SearchService) private readonly searchService: SearchService
  ) {
    super();
  }

  @httpGet("")
  async search(
    @response() res: express.Response,
    @queryParam(SEARCH_PHRASE_PARAM) searchPhrase?: string,
    @queryParam(TODO_LIST_PARAM) todoListId?: string,
    @queryParam(SEARCH_PHRASE_PARAM) searchScope?: SearchCategory,
    @queryParam(SEARCH_PHRASE_PARAM) searchLimit?: number
  ) {
    try {
      if (!searchPhrase) {
        return this.ok([]);
      }

      const limit = searchLimit || 20;
      switch (searchScope) {
        case SearchCategory.User:
          return this.searchService.searchForUsers(searchPhrase, limit);
        case SearchCategory.Reminder:
          //TODO: implement
          return this.ok([]);
        case SearchCategory.Task:
          //TODO: implement
          return this.ok([]);
        case SearchCategory.TodoList:
          //TODO: implement
          return this.ok([]);
        case undefined:
          return this.searchService.searchInAllScopes(searchPhrase, limit);
        default:
          return this.ok([]);
      }
    } catch (error) {
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      });
    }
  }
}
