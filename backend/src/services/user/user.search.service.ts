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
    
    return foundUsers.map((u) => mapUserToUserPublicData(u));
  }
}
