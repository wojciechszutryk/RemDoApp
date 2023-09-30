import { apiPost } from "framework/asyncInteractions";
import { FRONTIFY_URL } from "framework/asyncInteractions/frontifyRequestUrl.helper";
import {
  URL_PUSH,
  URL_SUBSCRIBE,
} from "linked-models/pushSubscription/pushSubscription.urls";

async function regSw() {
  if ("serviceWorker" in navigator) {
    const url = process.env.PUBLIC_URL + "/sw.js";
    const reg = await navigator.serviceWorker.register(url, { scope: "/" });
    console.log("service config is", { reg });
    return reg;
  }

  throw Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg: ServiceWorkerRegistration) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();

  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BAakkS83jr79aQ2MB5QK9MazuXWqpvMC4WlvopbGEnDLlME7L2BZWADcaaMJZXcKsuH0Zuc0MbrK9hFaYXZwqjw",
    });
    apiPost(FRONTIFY_URL(URL_PUSH, URL_SUBSCRIBE), subscription);
  }
}

export { regSw, subscribe };
