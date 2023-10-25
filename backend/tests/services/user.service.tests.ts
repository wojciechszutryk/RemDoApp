import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";

import { getUserCollection } from "dbSchemas/user.schema";
import { UserService } from "services/user/user.service";
import { mockedUser } from "../mocks/user.mock";

describe(`User service`, () => {
  let userService: UserService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getUserCollection().create(mockedUser);
    userService = new UserService(getUserCollection());
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return user by email`, async () => {
    const users = await userService.getUsersByEmails([mockedUser.email]);

    expect(users[0].displayName).toEqual(mockedUser.displayName);
  });
});
