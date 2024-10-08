import { describe, expect, it } from "@jest/globals";
import { extractPropertiesToUpdate } from "helpers/extractPropertiesToUpdate";
import { TodoListIconEnum } from "linked-models/todoList/todoList.enum";
import { ITodoList } from "linked-models/todoList/todoList.model";

describe(`extractPropertiesToUpdate helper`, () => {
  interface IRandomData extends ITodoList {
    text: string;
    completionDate: Date;
    finishDate: Date;
    startDate: Date;
    todoListId: string;
  }

  const randomData: IRandomData = {
    name: "name",
    assignedOwners: ["owner1"],
    assignedUsers: ["user1"],
    text: "task1",
    completionDate: new Date(),
    finishDate: new Date(),
    startDate: new Date(),
    todoListId: "todoListId",
    icon: TodoListIconEnum.Child,
  };
  const todoListKeys: (keyof ITodoList)[] = [
    "name",
    "assignedUsers",
    "assignedOwners",
    "icon",
  ];

  it(`should extract only those properties that are part of passed keys array`, () => {
    const todoListProperties = extractPropertiesToUpdate<ITodoList>(
      randomData,
      todoListKeys
    );

    expect(todoListProperties).toEqual({
      name: "name",
      assignedUsers: ["user1"],
      assignedOwners: ["owner1"],
      icon: TodoListIconEnum.Child,
    });
    expect(Object.keys(todoListProperties)).toEqual(todoListKeys);
  });
});
