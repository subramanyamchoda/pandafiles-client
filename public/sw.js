self.addEventListener("push", function (event) {
  const data = event.data.json();
  const title = data.title || "Notification";
  const options = {
    body: data.body || "You have a new notification!",
    icon: "/tlogo.jpg", // Ensure this path is correct
    vibrate: [200, 100, 300], // Vibration effect
    badge: "/badge-icon.png", // Optional: adds a small icon on mobile notifications
    actions: [
      {
        action: "open", // Action that will be triggered when clicked
        title: "Open",
      },
    ],
    data: data.url,
  };

  // Display the notification as a popup
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the notification
  const url = event.notification.data;
  if (url) {
    clients.openWindow(url); // Open the URL in a new tab or window
  }
});
