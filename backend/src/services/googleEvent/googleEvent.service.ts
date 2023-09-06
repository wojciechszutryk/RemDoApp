import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";
import { injectable } from "inversify";

const calendar = google.calendar("v3");

@injectable()
export class GoogleEventService {
  public async createEventInGoogleCallendar(
    currentUserOAuth2Client: OAuth2Client,
    data: calendar_v3.Schema$Event
  ): Promise<undefined | calendar_v3.Schema$Event> {
    const createdEventResponse = await calendar.events.insert({
      auth: currentUserOAuth2Client,
      calendarId: "primary",
      requestBody: { ...data, attendees: [] },
    });

    if (createdEventResponse.status !== 200)
      throw new Error(
        `Cannot create event in google calendar. Status: ${createdEventResponse.status}`
      );

    if (createdEventResponse.data) {
      return createdEventResponse.data;
    }
  }

  public async updateEventInGoogleCallendar(
    currentUserOAuth2Client: OAuth2Client,
    eventId: string,
    data: calendar_v3.Schema$Event
  ): Promise<calendar_v3.Schema$Event | undefined> {
    const updatedEventResponse = await calendar.events.update(
      {
        auth: currentUserOAuth2Client,
        calendarId: "primary",
        eventId,
        requestBody: data,
      },
      {}
    );
    if (updatedEventResponse.status !== 200)
      throw new Error(
        `Cannot update event in google calendar. Status: ${updatedEventResponse.status}`
      );

    if (updatedEventResponse.data) {
      return updatedEventResponse.data;
    }
  }

  public async deleteEventInGoogleCallendar(
    currentUserOAuth2Client: OAuth2Client,
    eventId: string
  ): Promise<void> {
    const deletedEventResponse = await calendar.events.delete({
      auth: currentUserOAuth2Client,
      calendarId: "primary",
      eventId,
    });
    if (deletedEventResponse.status !== 200)
      throw new Error(
        `Cannot delete event in google calendar. Status: ${deletedEventResponse.status}`
      );
  }
}
