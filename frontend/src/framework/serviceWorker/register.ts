import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  URL_PUSH,
  URL_SUBSCRIBE,
} from "linked-models/pushSubscription/pushSubscription.urls";

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const url = process.env.PUBLIC_URL + "/sw.js";
    const reg = await navigator.serviceWorker.register(url, { scope: "/" });
    console.log("service config is", { reg });
    return reg;
  }

  throw Error("serviceworker not supported");
}

async function pushSubscribe(serviceWorkerReg: ServiceWorkerRegistration) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();

  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY,
    });
    apiPost(FRONTIFY_URL(URL_PUSH, URL_SUBSCRIBE), subscription);
  }
}

export { registerServiceWorker as regSw, pushSubscribe as subscribe };
