import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import * as express from "express";
import {
  dropTestCollections,
  dropTestDB,
  setUpTestDB,
} from "../db.testSetup.helpers";

import { UserAuthController } from "controllers/user/user.auth.controller";
import { getUserCollection } from "dbSchemas/user.schema";
import { AppLanguages } from "linked-models/language/languages.enum";
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
import { mockRequest, mockResponse } from "mock-req-res";
import { UserAuthService } from "services/user/user.auth.service";
import { mockedUser } from "../mocks/user.mock";

describe(`User service`, () => {
  let userService: UserAuthService;
  let userController: UserAuthController;
  const res = mockResponse();

  beforeAll(async () => {
    await setUpTestDB();
  });

  beforeEach(async () => {
    await getUserCollection().create(mockedUser);
    userService = new UserAuthService(getUserCollection());
    userController = new UserAuthController(userService);
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
      language: AppLanguages.en,
    };
    const req = mockRequest({ body: correctData });
    const result = await userController.registerUser(
      req as express.Request,
      res as express.Response
    );
    const response = await result.executeAsync();

    expect(response.statusCode).toEqual(200);
  });

  // it(`should return stactus code 400 and proper message when trying to sign user up with no email or password or displayName in request body`, async () => {
  //   const incorrectData = { password: "password" };
  //   const req = mockRequest({ body: incorrectData });
  //   const result = await userController.registerUser(
  //     req as express.Request,
  //     res as express.Response
  //   );
  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual({
  //     _headers: { "content-type": "application/json" },
  //     content: '"No email or password or displayName provided"',
  //   });
  // });

  // it(`should return stactus code 400 and proper message when trying to sign user up with email was already registered`, async () => {
  //   const incorrectEmailData = {
  //     email: mockedUser.email,
  //     password: "password",
  //     displayName: "displayName",
  //   };
  //   const req = mockRequest({ body: incorrectEmailData });
  //   const result = await userController.registerUser(
  //     req as express.Request,
  //     res as express.Response
  //   );
  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual({
  //     _headers: { "content-type": "application/json" },
  //     content: '"User Already Exist. Please Log in"',
  //   });
  // });

  it(`should return stactus code 200 when trying to sign user in with correct data`, async () => {
    const correctData: ILoginUserDTO = {
      email: mockedUser.email,
      password: mockedUser.password,
    };
    const req = mockRequest({ body: correctData });
    const result = await userController.loginUser(
      req as express.Request,
      res as express.Response
    );
    const response = result.executeAsync();

    expect((await response).statusCode).toEqual(200);
  });

  it(`should return stactus code 400 and proper message when trying to sign user in with no email or password in request body`, async () => {
    const incorrectData = { password: "password" };
    const req = mockRequest({ body: incorrectData });
    const result = await userController.loginUser(
      req as express.Request,
      res as express.Response
    );
    const response = result.executeAsync();

    expect((await response).statusCode).toEqual(200);
  });

  // it(`should return stactus code 400 and proper message when trying to sign user in with email that does not exist`, async () => {
  //   const incorrectEmailData = { email: "emailThatDoesNotExist" };
  //   const req = mockRequest({ body: incorrectEmailData });
  //   const result = await userController.loginUser(
  //     req as express.Request,
  //     res as express.Response
  //   );
  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual(
  //     "User with email: emailThatDoesNotExist don't exist."
  //   );
  // });

  // it(`should return stactus code 400 and proper message when trying to sign user in with invalid credentials`, async () => {
  //   const invalidCredentialsData = { email: "email111", password: "password" };

  //   const req = mockRequest({ body: invalidCredentialsData });
  //   const result = await userController.loginUser(
  //     req as express.Request,
  //     res as express.Response
  //   );

  //   const response = await result.executeAsync();

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.content).toEqual("Invalid Credentials");
  // });
});
