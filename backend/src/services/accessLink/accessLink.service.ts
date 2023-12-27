import Crypto from "crypto";
import {
  AccessLinkCollectionName,
  AccessLinkCollectionType,
  mapAccessLinkToAttached,
} from "dbSchemas/accessLink.schema";
import { injectable } from "inversify";
import { inject } from "inversify/lib/annotation/inject";
import { IAccessLinkScopes } from "linked-models/accessLink/accessLink.model";
import { SHARE_HASH_PARAM } from "linked-models/accessLink/accessLink.url";
import { TODO_LIST_PARAM } from "linked-models/todoList/todoList.urls";
import { USER_PARAM } from "linked-models/user/user.urls";
import { IAccessLink, IAccessLinkAttached } from "models/accessLink.model";
import { decodeHash } from "./accessLink.helpers";

@injectable()
export class AccessLinkService {
  constructor(
    @inject(AccessLinkCollectionName)
    private readonly accessLinkCollection: AccessLinkCollectionType
  ) {}

  private createNonce = () => {
    return Crypto.createHash("sha256")
      .update(Crypto.randomBytes(128))
      .digest("hex");
  };

  private createHash = (accessLinkId: string, nonce: string) => {
    const hash = Crypto.createHash("sha256")
      .update(accessLinkId + nonce + process.env.HASH_CONSTANT)
      .digest("hex");

    const data = `${accessLinkId}.${hash}`;
    const buff = Buffer.from(data);
    const base64Hash = buff.toString("base64");

    return base64Hash;
  };

  private getAccessLinkByHash = async (
    hash: string
  ): Promise<IAccessLinkAttached | undefined> => {
    const decodedHash = decodeHash(hash);
    const accessLinkId = decodedHash.split(".")[0];

    const accessLink = await this.accessLinkCollection.findOne({
      _id: accessLinkId,
    });

    return accessLink ? mapAccessLinkToAttached(accessLink) : undefined;
  };

  public checkValidity = async (
    hash: string,
    scope?: Partial<IAccessLinkScopes>
  ) => {
    const accessLink = await this.getAccessLinkByHash(hash);
    if (!accessLink || accessLink.expiryDate < new Date()) return false;
    if (accessLink[USER_PARAM] && !scope?.[USER_PARAM]) return false;
    if (accessLink[TODO_LIST_PARAM] && !scope?.[TODO_LIST_PARAM]) return false;
    if (scope?.[USER_PARAM] && accessLink[USER_PARAM] !== scope[USER_PARAM])
      return false;
    if (
      scope?.[TODO_LIST_PARAM] &&
      accessLink[TODO_LIST_PARAM] !== scope[TODO_LIST_PARAM]
    )
      return false;

    const newHash = this.createHash(accessLink.id, accessLink.nonce);

    return hash === newHash;
  };

  public composeLink = (url: string, accessLink: IAccessLinkAttached) => {
    const hash = this.createHash(accessLink.id, accessLink?.nonce);

    return `${url}?${SHARE_HASH_PARAM}=${hash}`;
  };

  public createAccessLink = async (
    expiryDate: Date,
    scopes?: IAccessLinkScopes
  ): Promise<IAccessLinkAttached> => {
    const nonce = this.createNonce();

    const newAccessLink: IAccessLink & IAccessLinkScopes = {
      nonce: nonce,
      expiryDate: expiryDate,
      whenCreated: new Date(),
    };

    if (scopes?.[USER_PARAM]) newAccessLink[USER_PARAM] = scopes[USER_PARAM];
    if (scopes?.[TODO_LIST_PARAM])
      newAccessLink[TODO_LIST_PARAM] = scopes[TODO_LIST_PARAM];

    const createdAccessLink = await this.accessLinkCollection.create(
      newAccessLink
    );

    return mapAccessLinkToAttached(createdAccessLink);
  };
}
