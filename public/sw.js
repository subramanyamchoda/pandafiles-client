self.addEventListener("push", function (event) {
  const data = event.data?.json() || {
    title: "📢 New Notification",
    body: "You have a new message!",
    url: "/",
  };

  const options = {
    body: data.body,
    icon: "/tlogo.jpg",
    vibrate: [200, 100, 200],
    data: { url: data.url },
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});
