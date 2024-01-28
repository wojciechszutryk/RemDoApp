import { inject, injectable } from "inversify";
import { URL_SHARED } from "linked-models/accessLink/accessLink.url";
import { AppLanguages } from "linked-models/language/languages.enum";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_FORGET_PASSWORD,
  URL_USER,
  URL_USERS,
  USER_PARAM,
} from "linked-models/user/user.urls";
import React from "react";
import { AccessLinkService } from "services/accessLink/accessLink.service";
import { EmailNotificationService } from "services/notification/email.notification.service";
import ForgetPasswordTemplate from "../../emails/emails/ForgetPasswordTemplate";

@injectable()
export class PasswordRecoverService {
  constructor(
    @inject(AccessLinkService)
    private readonly accessLinkService: AccessLinkService,
    @inject(EmailNotificationService)
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  public sendPasswordRecoveryEmail = async (user: IUserAttached) => {
    const userLang = user.preferences.language || AppLanguages.en;
    const userTheme = user.preferences.theme;

    const subject =
      userLang === AppLanguages.pl
        ? "Zgłoszone żądanie zmiany hasła"
        : "Password recovery request";

    const datePlusOneDay = new Date();
    datePlusOneDay.setDate(datePlusOneDay.getDate() + 1);

    const accessLink = await this.accessLinkService.createAccessLink(
      datePlusOneDay,
      {
        [USER_PARAM]: user.id,
      }
    );

    const baseUrl = process.env.CLIENT_URL?.includes("#")
      ? process.env.CLIENT_URL
      : process.env.CLIENT_URL + "/#";

    const changePasswordLink = this.accessLinkService.composeLink(
      `${baseUrl}${URL_SHARED}${URL_FORGET_PASSWORD}${URL_USERS}${URL_USER(
        user.id
      )}`,
      accessLink
    );

    this.emailNotificationService.sendEmail(
      user.email,
      subject,
      React.createElement(ForgetPasswordTemplate, {
        preview: subject,
        link: changePasswordLink,
        isDarkTheme: userTheme === "dark",
        language: userLang,
      })
    );
  };
}
