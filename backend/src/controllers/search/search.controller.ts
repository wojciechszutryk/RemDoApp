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
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";
import {
  SEARCH_LIMIT_PARAM,
  SEARCH_PHRASE_PARAM,
  SEARCH_SCOPE_PARAM,
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
    @queryParam(SEARCH_SCOPE_PARAM) searchScope?: SearchCategory,
    @queryParam(SEARCH_LIMIT_PARAM) searchLimit?: string
  ) {
    try {
      if (!searchPhrase) {
        return this.ok([]);
      }

      const limit = searchLimit ? parseInt(searchLimit) : 20;

      const results: ISearchResults = {
        [SearchCategory.User]: [],
        [SearchCategory.Reminder]: [],
        [SearchCategory.Task]: [],
        [SearchCategory.TodoList]: [],
      };
      switch (searchScope) {
        case SearchCategory.User:
          results[SearchCategory.User] =
            await this.searchService.searchForUsers(searchPhrase, limit);

          return results;
        case SearchCategory.Reminder:
          results[SearchCategory.Reminder] =
            await this.searchService.searchForReminders(searchPhrase, limit);

          return results;
        case SearchCategory.Task:
          results[SearchCategory.Task] =
            await this.searchService.searchForTasks(searchPhrase, limit);

          return results;
        case SearchCategory.TodoList:
          results[SearchCategory.TodoList] =
            await this.searchService.searchForTodoLists(
              searchPhrase,
              limit,
              false
            );

          return results;
        default:
          const [reminders, todoLists, tasks] = await Promise.all([
            this.searchService.searchForReminders(searchPhrase, limit),
            this.searchService.searchForTodoLists(searchPhrase, limit, false),
            this.searchService.searchForTasks(searchPhrase, limit),
          ]);

          return {
            [SearchCategory.Reminder]: reminders,
            [SearchCategory.TodoList]: todoLists,
            [SearchCategory.Task]: tasks,
            [SearchCategory.User]: [],
          };
      }
    } catch (error) {
      res.status(500).send({
        message: "Error Something went wrong",
        error,
      });
    }
  }
}
