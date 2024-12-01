/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkOnly, StaleWhileRevalidate } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }: { request: Request; url: URL }) => {
  if (request.mode !== "navigate") {
    return false;
  }

  if (
    url.pathname.startsWith("/_") ||
    url.pathname.startsWith("/users/google") ||
    url.pathname.startsWith("/auth") ||
    url.pathname.startsWith("/google") ||
    url.pathname.startsWith("/redirect")
  ) {
    return false;
  }

  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }

  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

const todoSyncQueue = new BackgroundSyncPlugin("todo-queue", {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  ({ url, request }) =>
    url.pathname.startsWith("/api/todos") &&
    ["POST", "PUT", "DELETE"].includes(request.method),
  new NetworkOnly({
    plugins: [todoSyncQueue],
  })
);

registerRoute(
  ({ url }) => url.pathname.startsWith("/users/google"),
  new NetworkOnly()
);

registerRoute(({ url }) => url.pathname.startsWith("/auth"), new NetworkOnly());
registerRoute(
  ({ url }) => url.pathname.startsWith("/google"),
  new NetworkOnly()
);

registerRoute(
  ({ url }) => url.pathname.startsWith("/redirect"),
  new NetworkOnly()
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
