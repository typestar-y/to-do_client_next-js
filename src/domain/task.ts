import dayjs from "dayjs";
import { Status } from "./status";

export class Task {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _due: Date;
  private readonly _status: Status;

  private constructor(id: string, name: string, due: Date, status: Status) {
    this._id = id;
    this._name = name;
    this._due = due;
    this._status = status;
  }

  static of(id: string, name: string, due: string, status: string) {
    return new Task(id, name, new Date(due), Status.of(status));
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get due(): Date {
    return this._due;
  }

  get status(): Status {
    return this._status;
  }

  getDueString(): string {
    return dayjs(this._due).format("YYYY-MM-DD");
  }
}
