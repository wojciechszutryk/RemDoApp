// Listen for the "activate" event
self.addEventListener("activate", function (event) {
  console.log("Push service worker activated");
});

// Listen for the "notificationclick" event
self.addEventListener("notificationclick", function (event) {
  //TODO check if works properly
  const clickedNotification = event.notification;
  const link = event.notification.data;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow(link);
      })
  );

  clickedNotification.close();
});

// Listen for the "push" event
self.addEventListener("push", async function (event) {
  try {
    const { title, link, body, img } = await event.data?.json();

    await event.waitUntil(
      self.registration.showNotification(title, {
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        body,
        icon: img,
        data: link,
      })
    );
  } catch (err) {
    console.error("Error handling push event:", err);
  }
});
