import { AxiosInstance } from "axios";
import { route as ziggyRoute } from "ziggy-js";
import Echo from "laravel-echo";

declare global {
  interface Window {
    axios: AxiosInstance;
    Pusher: unknown;
    Echo: Echo;
  }

  var route: typeof ziggyRoute;
}
