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

import { UserController } from "controllers/user.controller";
import { getUserCollection } from "dbSchemas/user.schema";
import { ILoginUserDTO } from "linked-models/user/user.dto";
import { IUserAttached } from "linked-models/User/User.model";
import { UserService } from "services/user.service";
import { mockedUser } from "../mocks/user.mock";

describe(`User service`, () => {
  let userService: UserService;
  let userController: UserController;

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getUserCollection().create(mockedUser);
    userService = new UserService(getUserCollection());
    userController = new UserController(userService);
  });

  afterEach(async () => {
    await dropTestCollections();
  });

  afterAll(async () => {
    await dropTestDB();
  });

  it(`should return user by email`, async () => {
    const loginData: ILoginUserDTO = { email: "email", password: "password" };
    const user = await userController.loginUser();

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
