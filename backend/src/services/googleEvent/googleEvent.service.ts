import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { calendar_v3 } from "googleapis/build/src/apis/calendar/v3";
import { injectable } from "inversify";
import { IReminderAttached } from "linked-models/reminder/reminder.model";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { IUserAttached } from "linked-models/user/user.model";

const calendar = google.calendar("v3");

@injectable()
export class GoogleEventService {
  public async getGoogleEventsForDateRange(
    currentUserOAuth2Client: OAuth2Client,
    startDate: Date,
    endDate: Date
  ): Promise<undefined | calendar_v3.Schema$Event[]> {
    const listEventResp = await calendar.events.list({
      auth: currentUserOAuth2Client,
      calendarId: "primary",
      timeMax: endDate.toISOString(),
      timeMin: startDate.toISOString(),
    });

    if (listEventResp.status !== 200)
      throw new Error(
        `Cannot get events in google calendar. Status: ${listEventResp.status}`
      );

    if (listEventResp.data) {
      return listEventResp.data.items;
    }
  }

  public async createEventInGoogleCallendar(
    currentUserOAuth2Client: OAuth2Client,
    data: calendar_v3.Schema$Event
  ): Promise<undefined | calendar_v3.Schema$Event> {
    const createdEventResponse = await calendar.events.insert({
      auth: currentUserOAuth2Client,
      calendarId: "primary",
      requestBody: data,
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

  public convertGoogleEventToReminder(
    event: calendar_v3.Schema$Event,
    currentUser: IUserAttached
  ): IReminderAttached | null {
    const startDate = event.start?.dateTime
      ? new Date(event.start.dateTime)
      : event.start?.date
      ? new Date(event.start.date)
      : new Date();
    const finishDate = event.end?.dateTime
      ? new Date(event.end.dateTime)
      : event.end?.date
      ? new Date(event.end.date)
      : new Date();

    if (!startDate || !finishDate || !event.id) return null;

    return {
      text: event.description || "",
      name: event.summary || "",
      startDate,
      finishDate,
      recurrance: event.recurrence || undefined,
      todoListId: `google-${event.id}`,
      taskId: `google-${event.id}`,
      creator: event.creator?.self ? currentUser : (event.creator as any),
      whenCreated: event.created ? new Date(event.created) : new Date(),
      whenUpdated: event.updated ? new Date(event.updated) : new Date(),
      assignedOwners:
        event.attendees?.map((attendee) => ({
          id: attendee.id!,
          email: attendee.email!,
          displayName: attendee.displayName!,
          whenCreated: new Date(),
        })) || [],
      assignedUsers: [],
      icon: TodoListIconEnum.Google,
    };
  }

  public convertReminderToGoogleEvent(
    reminder: IReminderAttached
  ): calendar_v3.Schema$Event {
    return {
      summary: reminder.text,
      description: reminder.name,
      start: {
        dateTime: reminder.startDate?.toISOString(),
        timeZone: "Europe/Warsaw",
      },
      end: {
        dateTime: reminder.finishDate?.toISOString(),
        timeZone: "Europe/Warsaw",
      },
      attendees: reminder.assignedOwners.map((owner) => ({
        email: owner.email,
        displayName: owner.displayName,
        responseStatus: "accepted",
      })),
      recurrence: reminder.recurrance,
    };
  }
}
