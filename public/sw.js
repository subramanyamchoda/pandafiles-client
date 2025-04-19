self.addEventListener("push", function (event) {
  const data = event.data.json();
  const title = data.title || "Notification";
  const options = {
    body: data.body || "You have a new notification!",
    icon: "/tlogo.jpg", // Make sure this path is correct
    vibrate: [200, 100, 300],
    data: data.url,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const url = event.notification.data;
  if (url) {
    clients.openWindow(url);
  }
});
