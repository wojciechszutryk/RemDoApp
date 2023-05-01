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
import { IUserAttached } from "linked-models/User/User.model";
import { UserAuthService } from "services/user.auth.service";
import { mockedUser } from "../mocks/user.mock";

describe(`User service`, () => {
  let userService: UserAuthService;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getUserCollection().create(mockedUser);
    userService = new UserAuthService(getUserCollection());
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return user by email`, async () => {
    const user = await userService.getUserByEmail(mockedUser.email);

    expect(user?.displayName).toEqual(mockedUser.displayName);
  });

  it(`should register new user`, async () => {
    const newUser = {
      email: "newEmail.com",
      displayName: "displayName",
      password: "password",
    };
    const registeredUser = await userService.registerUser(
      newUser.email,
      newUser.displayName,
      newUser.password
    );

    expect(registeredUser?.displayName).toEqual(newUser.displayName);
  });

  it(`should sign user in`, async () => {
    const newUser = {
      email: "newEmail.com",
      displayName: "displayName",
      password: "password",
    };
    const registeredUser = await userService.registerUser(
      newUser.email,
      newUser.displayName,
      newUser.password
    );

    const signedUser = await userService.signTokenToUser(
      registeredUser as unknown as IUserAttached,
      newUser.password
    );

    expect(signedUser?.displayName).toEqual(registeredUser.displayName);
  });
});
