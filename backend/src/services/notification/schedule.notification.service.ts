import { injectable } from "inversify";
import { IUserAttached } from "linked-models/user/user.model";
import { scheduleJob, scheduledJobs } from "node-schedule";

@injectable()
export class ScheduleNotificationService {
  public createScheduleJobName(userId: string, resourceId: string) {
    return `${userId}-${resourceId}`;
  }

  public async scheduleNotification(
    user: IUserAttached,
    date: Date,
    notificationResourceId: string,
    action: () => void
  ) {
    const jobName = this.createScheduleJobName(user.id, notificationResourceId);

    //if job already exists, cancel it - new one will be created
    if (scheduledJobs[jobName]) {
      scheduledJobs[jobName].cancel();
    }

    scheduleJob(jobName, date, action);
  }

  public async cancelScheduledNotification(userId: string, resourceId: string) {
    const jobName = this.createScheduleJobName(userId, resourceId);

    if (scheduledJobs[jobName]) {
      scheduledJobs[jobName].cancel();
    }
  }
}
