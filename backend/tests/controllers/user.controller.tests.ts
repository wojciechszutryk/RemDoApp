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
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
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

  it(`should return stactus code 200 when trying to sign user up with correct data`, async () => {
    const correctData: IRegisterUserDTO = {
      email: "email",
      password: "password",
      displayName: "displayName",
    };
    const result = await userController.registerUser(correctData);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  it(`should return stactus code 400 and proper message when trying to sign user up with no email or password or displayName in request body`, async () => {
    const incorrectData = { password: "password" };
    const result = await userController.registerUser(
      incorrectData as IRegisterUserDTO
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
    expect(response.content).toEqual({
      _headers: { "content-type": "application/json" },
      content: '"No email or password or displayName provided"',
    });
  });

  it(`should return stactus code 400 and proper message when trying to sign user up with email was already registered`, async () => {
    const incorrectEmailData = {
      email: mockedUser.email,
      password: "password",
      displayName: "displayName",
    };
    const result = await userController.registerUser(incorrectEmailData);
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(400);
    expect(response.content).toEqual({
      _headers: { "content-type": "application/json" },
      content: '"User Already Exist. Please Log in"',
    });
  });

  it(`should return stactus code 200 when trying to sign user in with correct data`, async () => {
    const correctData: ILoginUserDTO = {
      email: mockedUser.email,
      password: mockedUser.password,
    };
    const result = await userController.loginUser(correctData);
    const response = result.executeAsync();

    expect((await response).statusCode).toEqual(200);
  });

  // it(`should return stactus code 400 and proper message when trying to sign user in with no email or password in request body`, async () => {
  //   const incorrectData = { password: "password" };
  //   const result = await userController.loginUser(
  //     incorrectData as ILoginUserDTO
  //   );
  //   const response = result.executeAsync();

  //   expect((await response).statusCode).toEqual(200);
  // });

  // it(`should return stactus code 400 and proper message when trying to sign user in with email that does not exist`, async () => {
  //   const incorrectEmailData = { email: "emailThatDoesNotExist" };
  //   const result = await userController.loginUser(
  //     incorrectEmailData as ILoginUserDTO
  //   );
  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual(
  //     "User with email: emailThatDoesNotExist don't exist."
  //   );
  // });

  // it(`should return stactus code 400 and proper message when trying to sign user in with invalid credentials`, async () => {
  //   const invalidCredentialsData = { email: "email111", password: "password" };
  //   const result = await userController.loginUser(invalidCredentialsData);
  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual("Invalid Credentials");
  // });
});
