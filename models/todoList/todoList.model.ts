export interface ITask {
  /** Text of task */
  text: string;

  /** Date when task should be started */
  whenShouldBeStarted?: Date;

  /** Date when task should be finished */
  whenShouldBeFinished?: Date;

  /** Date when task was started */
  startDate?: string;

  /** Date when task was finished */
  finishDate?: Date;

  /** Boolean to determine if task is important */
  important?: false;

  /** Task's background color in hex */
  color?: string;
}

export interface ITaskWithReadonlyProperties extends ITask {
  /** Readonly creator id. */
  readonly creator?: string;

  /** Date when task was created. */
  readonly whenCreated: Date;

  /** Date when task was updated. */
  readonly whenUpdated: Date;
}
