import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ISearchHistoryDto } from "linked-models/search/search.history.dto";
import {
  SEARCH_HISTORY_RECORD_PARAM,
  URL_HISTORY,
  URL_SEARCH,
  URL_SINGLE_HISTORY,
} from "linked-models/search/search.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SearchHistoryDeleteService } from "services/search/search.history.delete.service";
import { SearchHistoryService } from "services/search/search.history.service";

@controller(URL_SEARCH + URL_HISTORY, SetCurrentUser)
export class SearchHistoryController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(SearchHistoryService)
    private readonly searchHistoryService: SearchHistoryService,
    @inject(SearchHistoryDeleteService)
    private readonly searchHistoryDeleteService: SearchHistoryDeleteService
  ) {
    super();
  }

  @httpGet("")
  async getSearchHistoryForUser(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    const searchHistory =
      await this.searchHistoryService.getSearchHistoryForUser(currentUser.id);

    return this.ok(searchHistory);
  }

  @httpPost("")
  async saveSearchHistoryForUser(
    @currentUser() currentUser: IUserAttached,
    @requestBody() body: ISearchHistoryDto
  ): Promise<OkResult> {
    try {
      const searchHistory =
        await this.searchHistoryService.createSearchHistoryRecord(
          currentUser.id,
          body
        );
      if (!searchHistory) return this.badRequest();
      return this.ok(searchHistory);
    } catch (e) {
      return this.badRequest();
    }
  }

  @httpDelete(URL_SINGLE_HISTORY())
  async deleteSingleSearchHistoryRecord(
    @currentUser() currentUser: IUserAttached,
    @requestParam(SEARCH_HISTORY_RECORD_PARAM) searchRecordId: string
  ): Promise<OkResult> {
    await this.searchHistoryDeleteService.deleteSearchHistoryRecordById(
      currentUser.id,
      searchRecordId
    );

    return this.ok();
  }

  @httpDelete("")
  async deleteSearchHistoryForUser(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    await this.searchHistoryDeleteService.deleteSearchHistoryForUser(
      currentUser.id
    );

    return this.ok();
  }
}
