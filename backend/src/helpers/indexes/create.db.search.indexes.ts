import { TaskCollectionName } from "dbSchemas/task.schema";
import { TodoListCollectionName } from "dbSchemas/todoList.schema";
import { UserCollectionName } from "dbSchemas/user.schema";
import { Document } from "mongodb";
import mongoose from "mongoose";

const checkIndexExist = (indexes: Document[], indexName: string) => {
  return indexes.some(({ name }) => name === indexName);
};

const todoIndexName = "name_index";
const taskIndexName = "text_description_link_index";
const userIndexName = "displayName_email_index";

export const ensureIndexExists = async (connection: mongoose.Connection) => {
  try {
    const todoCollection = connection.db.collection(TodoListCollectionName);
    const taskCollection = connection.db.collection(TaskCollectionName);
    const userCollection = connection.db.collection(UserCollectionName);

    const [todoIndexesCursor, taskIndexesCursor, userIndexesCursor] =
      await Promise.all([
        todoCollection.listIndexes(),
        taskCollection.listIndexes(),
        userCollection.listIndexes(),
      ]);

    const [taskIndexes, todoIndexes, userIndexes] = 
    await Promise.all([
      taskIndexesCursor.toArray(),
      todoIndexesCursor.toArray(),
      userIndexesCursor.toArray(),
    ]);

    const todoIndexExists = checkIndexExist(todoIndexes, todoIndexName);
    const taskIndexExists = checkIndexExist(taskIndexes, taskIndexName);
    const userIndexExists = checkIndexExist(userIndexes, userIndexName);

    if (!todoIndexExists) {
      console.log(
        "Creating text index for todoList collection on name field..."
      );
      await todoCollection.createIndex(
        {
          name: "text",
        },
        { name: todoIndexName }
      );
    }

    if (!taskIndexExists) {
      console.log(
        "Creating text index for task collection on text, description and link fields..."
      );
      await taskCollection.createIndex(
        { text: "text", description: "text", link: "text" },
        { name: taskIndexName }
      );
    }

    if (!userIndexExists) {
      console.log(
        "Creating text index for users collection on displayName and email fields..."
      );
      await userCollection.createIndex(
        { email: "text", displayName: "text" },
        { name: userIndexName }
      );
    }
  } catch (error) {
    console.error("Error ensuring indexes exist:", error);
  }
};
