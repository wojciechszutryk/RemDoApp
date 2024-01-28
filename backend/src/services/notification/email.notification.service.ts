import { render } from "@react-email/render";
import sendgrid, { MailService } from "@sendgrid/mail";
import { getWelcomeEmailSubject } from "helpers/emails/welcomeEmail.translations";
import { inject, injectable } from "inversify";
import { AppLanguages } from "linked-models/language/languages.enum";
import { IUserAttached } from "linked-models/user/user.model";
import {
  URL_USER,
  URL_USERS,
  URL_VERIFY_ACCOUNT,
  USER_PARAM,
} from "linked-models/user/user.urls";
import { INotificationsTexts } from "models/notification.text.model";
import React from "react";
import { AccessLinkService } from "services/accessLink/accessLink.service";
import EventTemplate from "../../emails/emails/EventTemplate";
import WelcomeTemplate from "../../emails/emails/WelcomeTemplate";

@injectable()
export class EmailNotificationService {
  private readonly sendGridClient: MailService;

  constructor(
    @inject(AccessLinkService)
    private readonly accessLinkService: AccessLinkService
  ) {
    this.sendGridClient = sendgrid;
    this.sendGridClient.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  public async sendEmailNotifications(
    notificationTexts: INotificationsTexts,
    notificationLink: string | null,
    usersToNotify: IUserAttached[],
    eventCreatorImg: string | undefined
  ) {
    const emails = usersToNotify.map((user) => {
      const userLang = user.preferences.language || AppLanguages.en;
      const userTheme = user.preferences.theme || "light";

      return {
        from: process.env.FROM_EMAIL!,
        to: user.email,
        subject: notificationTexts.title[AppLanguages.pl],
        html: render(
          React.createElement(EventTemplate, {
            preview: notificationTexts.title[AppLanguages.pl],
            body: notificationTexts.description[userLang],
            link: notificationLink,
            isDarkTheme: userTheme === "dark",
            eventCreatorImg: eventCreatorImg,
            language: userLang,
            name: user.displayName,
            unsubNotifyParams: {
              userId: user.id,
              unsubToken: user.preferences.emailUnsubscribeToken,
            },
          })
        ),
      };
    });

    await this.sendGridClient.send(emails).catch((error) => {
      console.error(error);
    });
  }

  public async sendWelcomeEmail(user: IUserAttached, withVerify: boolean) {
    let verifyAccountLink = undefined;
    if (withVerify) {
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

      verifyAccountLink = this.accessLinkService.composeLink(
        `${baseUrl}${URL_USERS}${URL_USER(user.id)}${URL_VERIFY_ACCOUNT}`,
        accessLink
      );
    }

    const subject = getWelcomeEmailSubject(user?.preferences?.language);

    this.sendGridClient.send({
      from: process.env.FROM_EMAIL!,
      to: user.email,
      subject,
      html: render(
        React.createElement(WelcomeTemplate, {
          preview: subject,
          name: user.displayName,
          language: user.preferences.language,
          isDarkTheme: user.preferences.theme === "dark",
          verifyAccountLink,
        })
      ),
    });
  }

  public async sendEmail(
    email: string[] | string,
    subject: string,
    /** React.Element - template of email to send */
    template: any
  ): Promise<void> {
    const emailHtml = render(template);

    const options = {
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: subject,
      html: emailHtml,
    };

    try {
      await this.sendGridClient.send(options).catch((error) => {
        console.error(error);
      });
    } catch (error) {
      console.error(error);
    }
  }
}
