// Listen for the "activate" event
self.addEventListener("activate", function (event) {
  console.log("Push service worker activated");
});

// Listen for the "notificationclick" event
self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );

  clickedNotification.close();
});

// Listen for the "push" event
self.addEventListener("push", async function (event) {
  try {
    const { payload, notification, language } = await event.data?.json();

    console.log("payload", payload);
    console.log("notification", notification);
    console.log("language", language);

    if (!payload) return;

    let description = "";

    const todoListNamePart = payload?.name ? ` (${payload.name})` : "";
    const taskTitlePart = payload?.text ? ` (${payload.text})` : "";
    const byUserPart = payload?.eventCreator?.displayName
      ? ` ${language === "pl" ? "przez" : "by"} ${
          payload.eventCreator?.displayName
        }`
      : notification?.actionCreator?.displayName
      ? ` ${language === "pl" ? "przez" : "by"} ${
          notification.actionCreator?.displayName
        }`
      : "";

    switch (notification.action) {
      case "TODOLIST_CREATED":
        if (language === "pl")
          description = `Zostałeś/aś zaproszony/a do nowej listy zadań${todoListNamePart}${byUserPart}`;
        else
          description = `You have been invited to new todo list${todoListNamePart}${byUserPart}`;
        break;
      case "TODOLIST_UPDATED":
        if (language === "pl")
          description = `Lista zadań${todoListNamePart} została zaktualizowana${byUserPart}`;
        else
          description = `Todo list ${todoListNamePart} was updated${byUserPart}`;
        break;
      case "TODOLIST_DELETED":
        if (language === "pl")
          description = `Lista zadań${todoListNamePart} została usunięta${byUserPart}`;
        else
          description = `Todo list${todoListNamePart} was deleted${byUserPart}`;
        break;
      case "TODOLIST_MEMBER_ADDED":
        if (language === "pl")
          description = `Do listy zadań${todoListNamePart} dodano nowego członka${byUserPart}`;
        else
          description = `New member was added to todo list${todoListNamePart}${byUserPart}`;
        break;
      case "TODOLIST_MEMBER_REMOVED":
        if (language === "pl")
          description = `Z listy zadań${todoListNamePart} usunięto członka${byUserPart}`;
        else
          description = `Member was removed from todo list${todoListNamePart}${byUserPart}`;
        break;
      case "TASK_CREATED":
        if (language === "pl")
          description = `Do listy zadań${todoListNamePart} dodano nowe zadanie ${taskTitlePart}${byUserPart}`;
        else
          description = `New task${taskTitlePart} was added to todo list${todoListNamePart}${byUserPart}`;
        break;
      case "TASK_UPDATED":
        if (language === "pl")
          description = `Zadanie${taskTitlePart} zostało zaktualizowane w liście zadań${todoListNamePart}${byUserPart}`;
        else
          description = `Task${taskTitlePart} was updated in todo list${todoListNamePart}${byUserPart}`;
        break;
      case "TASK_DELETED":
        if (language === "pl")
          description = `Zadanie${taskTitlePart} zostało usunięte z listy zadań${todoListNamePart}${byUserPart}`;
        else
          description = `Task${taskTitlePart} was deleted from todo list${todoListNamePart}${byUserPart}`;
        break;
      case "COLLABOARTION_REQUESTED":
        if (language === "pl")
          description = `Zostałeś/aś zaproszony/a do współpracy${byUserPart}`;
        else
          description = `You have been invited to collaboration${byUserPart}`;
        break;
      case "COLLABOARTION_ACCEPTED":
        if (language === "pl")
          description = `Zaproszenie do współpracy zostało zaakceptowane${byUserPart}`;
        else description = `Collaboration request was accepted${byUserPart}`;
        break;
      case "COLLABOARTION_RE_OPENED":
        if (language === "pl")
          description = `Zaproszenie do współpracy zostało wznowione${byUserPart}`;
        else description = `Collaboration request was reopened${byUserPart}`;
        break;
      case "COLLABOARTION_REJECTED":
        if (language === "pl")
          description = `Zaproszenie do współpracy zostało odrzucone${byUserPart}`;
        else description = `Collaboration request was rejected${byUserPart}`;
        break;
      case "COLLABOARTION_BLOCKED":
        if (language === "pl")
          description = `Współpraca została zablokowana${byUserPart}`;
        else description = `Collaboration was blocked${byUserPart}`;
        break;
      case "SCHEDULE_TASK_NOTIFICATION":
        if (language === "pl")
          description = `Zaplanowane zadanie${taskTitlePart}`;
        else description = `Task${taskTitlePart}was scheduled`;
        break;
      case "SCHEDULE_REMINDER_NOTIFICATION":
        if (language === "pl")
          description = `Zaplanowane przypomnienie${taskTitlePart}`;
        else description = `Reminder${taskTitlePart}was scheduled`;
        break;
    }

    console.log("description", description);

    await event.waitUntil(
      self.registration.showNotification(description, {
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        icon: payload.eventCreator?.avatarUrl,
      })
    );
  } catch (err) {
    console.error("Error handling push event:", err);
  }
});
