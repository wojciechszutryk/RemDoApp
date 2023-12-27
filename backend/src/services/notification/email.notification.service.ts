import { render } from "@react-email/render";
import sendgrid, { MailService } from "@sendgrid/mail";
import { injectable } from "inversify";
import { AppLanguages } from "linked-models/language/languages.enum";
import { IUserAttached } from "linked-models/user/user.model";
import { INotificationsTexts } from "models/notification.text.model";
import React from "react";
import EventTemplate from "../../../emails/emails/EventTemplate";

@injectable()
export class EmailNotificationService {
  private readonly sendGridClient: MailService;

  constructor() {
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
