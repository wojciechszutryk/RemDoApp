type EventParameters<T> = {
  isStoppable?: boolean;
  defaultArgs?: Partial<T>;
};

export class TypedEvent<T> {
  public readonly defaultArgs: Partial<T>;
  private readonly isStoppable: boolean;
  private _isStopped = false; //private setter
  public get isStopped() {
    return this._isStopped;
  }

  constructor(
    readonly name: string,
    { defaultArgs, isStoppable }: EventParameters<T> = {}
  ) {
    this.defaultArgs = defaultArgs || {};
    this.isStoppable = isStoppable || false;
  }

  public stopPropagation() {
    if (this.isStoppable && !this._isStopped) this._isStopped = true;
  }
}
