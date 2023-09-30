

// Listen for the "activate" event
self.addEventListener("activate", function (event) {
  console.log("Service worker activated");
});

// Listen for the "push" event
self.addEventListener("push", async function (event) {
  try {
    const message = await event.data?.json();
    if (!message) return;

    const { title, description, image } = message;

    if (!title || !description || !image) {
      console.error("Invalid push message format:", message);
      return;
    }

    await event.waitUntil(
      self.registration.showNotification(title, {
        body: description,
        icon: image,
      })
    );
  } catch (err) {
    console.error("Error handling push event:", err);
  }
});

// Listen for the "notificationclick" event
self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;

  console.log("User clicked the notification");
  event.waitUntil(clients.openWindow("https://example.com"));

  clickedNotification.close();
});
