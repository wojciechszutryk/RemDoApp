import { UserCollectionName, UserCollectionType } from "dbSchemas/user.schema";
import { mapUserToUserPublicData } from "helpers/user/mapUserToUserPublicData.helper";
import { inject, injectable } from "inversify";
import { IUserPublicDataDTO } from "linked-models/user/user.dto";

@injectable()
export class UserSearchService {
  constructor(
    @inject(UserCollectionName)
    private readonly userCollection: UserCollectionType
  ) {}

  public async searchForUsers(
    searchPhrase: string,
    limit: number
  ): Promise<IUserPublicDataDTO[]> {
    const foundUsers = await this.userCollection
      .find(
        {
          $or: [
            { displayName: { $regex: searchPhrase, $options: "i" } },
            { email: { $regex: searchPhrase, $options: "i" } },
          ],
        },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(limit);
    return foundUsers.map((u) => mapUserToUserPublicData(u));
  }
}
