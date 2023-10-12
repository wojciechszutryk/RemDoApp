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

    if (!payload) return;

    const EventTranslations = {
      TASK_CREATED: {
        pl: "Nowe zadanie zostało utworzone",
        en: "New task was created",
      },
      TASK_UPDATED: {
        pl: "Zadanie zostało zaktualizowane",
        en: "Task was updated",
      },
      TASK_DELETED: {
        pl: "Zadanie zostało usunięte",
        en: "Task was deleted",
      },
      TODOLIST_CREATED: {
        pl: "Nowa lista zadań została utworzona",
        en: "New todo list was created",
      },
      TODOLIST_UPDATED: {
        pl: "Lista zadań została zaktualizowana",
        en: "Todo list was updated",
      },
      TODOLIST_DELETED: {
        pl: "Lista zadań została usunięta",
        en: "Todo list was deleted",
      },
      TODOLIST_MEMBER_ADDED: {
        pl: "Do listy zadań dodano członka",
        en: "Member was added to todo list",
      },
      TODOLIST_MEMBER_REMOVED: {
        pl: "Z listy zadań usunięto członka",
        en: "Member was removed from todo list",
      },
      COLLABOARTION_REQUESTED: {
        pl: "Prośba o współpracę została wysłana",
        en: "Collaboration request was sent",
      },
      COLLABOARTION_ACCEPTED: {
        pl: "Współpraca została zaakceptowana",
        en: "Collaboration was accepted",
      },
      COLLABOARTION_RE_OPENED: {
        pl: "Prośba o współpracę została wznowiona",
        en: "Collaboration request was reopened",
      },
      COLLABOARTION_REJECTED: {
        pl: "Współpraca została odrzucona",
        en: "Collaboration was rejected",
      },
      COLLABOARTION_BLOCKED: {
        pl: "Współpraca została zablokowana",
        en: "Collaboration was blocked",
      },
    };

    const ByUserPart = {
      pl: " przez ",
      en: " by ",
    };

    const description = `${EventTranslations[notification.action][language]}${
      payload.eventCreator
        ? ByUserPart[language] + payload.eventCreator?.displayName
        : ""
    }`;

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
