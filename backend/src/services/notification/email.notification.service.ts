import { render } from "@react-email/render";
import sendgrid, { MailService } from "@sendgrid/mail";
import { injectable } from "inversify";

@injectable()
export class EmailNotificationService {
  private readonly sendGridClient: MailService;

  constructor() {
    this.sendGridClient = sendgrid;
    this.sendGridClient.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  public async sendEmail(
    email: string,
    /** React.Element - template of email to send */
    template: any
  ): Promise<void> {
    const emailHtml = render(template);

    const options = {
      from: "wscode@wscode.com.pl",
      to: email,
      subject: "hello world",
      html: emailHtml,
    };

    this.sendGridClient.send(options);
  }
}
