import App from "./app";
import { createElement } from "./lib/dom/client";

const app = document.getElementById("app") as HTMLElement;
app.appendChild(createElement(<App />));
