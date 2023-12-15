import { render } from "@react-email/render";
import sendgrid, { MailService } from "@sendgrid/mail";
import { inject, injectable } from "inversify";
import { AppLanguages } from "linked-models/language/languages.enum";
import { IUserAttached } from "linked-models/user/user.model";
import { INotificationsTexts } from "models/notification.text.model";
import React from "react";
import { UserService } from "services/user/user.service";
import EventTemplate from "../../../emails/EventTemplate";

@injectable()
export class EmailNotificationService {
  private readonly sendGridClient: MailService;

  constructor(
    @inject(UserService)
    private readonly userService: UserService
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
        from: "wscode@wscode.com.pl",
        to: user.email,
        subject: notificationTexts.title[AppLanguages.pl],
        html: render(
          React.createElement(EventTemplate, {
            preview: notificationTexts.title[AppLanguages.pl],
            body: notificationTexts.description[userLang],
            link: notificationLink,
            isDarkTheme: userTheme === "dark",
            eventCreatorImg: eventCreatorImg,
            userId: user.id,
            unsubToken: user.preferences.emailUnsubscribeToken,
          })
        ),
      };
    });

    await this.sendGridClient.send(emails);
  }

  public async sendEmail(
    email: string[] | string,
    /** React.Element - template of email to send */
    template: any,
    subject: string
  ): Promise<void> {
    const emailHtml = render(template);

    const options = {
      from: "wscode@wscode.com.pl",
      to: email,
      subject: subject,
      html: emailHtml,
    };

    await this.sendGridClient.send(options);
  }
}
