import { currentUser } from "decorators/currentUser.decorator";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  interfaces,
  requestParam,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import {
  SEARCH_HISTORY_RECORD_PARAM,
  URL_HISTORY,
  URL_SEARCH,
  URL_SINGLE_HISTORY,
} from "linked-models/search/search.urls";
import { IUserAttached } from "linked-models/user/user.model";
import { SetCurrentUser } from "middlewares/user/setCurrentUser.middleware";
import { SearchHistoryService } from "services/search/search.history.service";

@controller(URL_SEARCH + URL_HISTORY, SetCurrentUser)
export class SearchHistoryController
  extends BaseHttpController
  implements interfaces.Controller
{
  constructor(
    @inject(SearchHistoryService)
    private readonly searchHistoryService: SearchHistoryService
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

  @httpDelete(URL_SINGLE_HISTORY())
  async deleteSingleSearchHistoryRecord(
    @currentUser() currentUser: IUserAttached,
    @requestParam(SEARCH_HISTORY_RECORD_PARAM) searchRecordId: string
  ): Promise<OkResult> {
    await this.searchHistoryService.deleteSearchHistoryRecord(
      currentUser.id,
      searchRecordId
    );

    return this.ok();
  }

  @httpDelete("")
  async deleteSearchHistoryForUser(
    @currentUser() currentUser: IUserAttached
  ): Promise<OkResult> {
    await this.searchHistoryService.deleteSearchHistoryForUser(currentUser.id);

    return this.ok();
  }
}
