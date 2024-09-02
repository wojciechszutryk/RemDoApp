import { UserCollectionName, UserCollectionType } from "dbSchemas/user.schema";
import { mapUserDocumentToUserPublicData } from "helpers/user/mapUserToUserPublicData.helper";
import { inject, injectable } from "inversify";
import {
  ISearchResults,
  SearchCategory,
} from "linked-models/search/search.model";

@injectable()
export class SearchService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async searchInAllScopes(
    searchPhrase: string,
    limit: number
  ): Promise<ISearchResults> {
    return {
      [SearchCategory.User]: [],
      [SearchCategory.Reminder]: [],
      [SearchCategory.Task]: [],
      [SearchCategory.TodoList]: [],
    };
  }

  public async searchForUsers(
    searchPhrase: string,
    limit: number
  ): Promise<ISearchResults> {
    const foundUsers = await this.userCollection.aggregate([
      {
        $match: {
          $or: [
            { displayName: { $regex: searchPhrase, $options: "i" } },
            { email: { $regex: searchPhrase, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          displayName: 1,
          avatarUrl: 1,
          email: 1,
          similarityScore: {
            $sum: [
              { $cond: [{ $eq: ["$displayName", searchPhrase] }, 10, 0] },
              { $cond: [{ $eq: ["$email", searchPhrase] }, 5, 0] },
            ],
          },
        },
      },
      {
        $sort: { similarityScore: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return {
      [SearchCategory.User]: foundUsers.map((u) =>
        mapUserDocumentToUserPublicData(u)
      ),
      [SearchCategory.Reminder]: [],
      [SearchCategory.Task]: [],
      [SearchCategory.TodoList]: [],
    };
  }
}
