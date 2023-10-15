import "./style/index.scss";
import Handlebars from "handlebars";
import { imageUrl } from "./config";
import Block from "./core/Block";
import { Globals, Global } from "./types";
import { loadGlobals, registerGlobals } from "./utils/utils";

const Components: Globals = import.meta.glob("./components/**/*.ts", {
  eager: true,
});
const Pages: Globals = import.meta.glob("./pages/**/*.ts", {
  eager: true,
});
const importPartials: Globals = import.meta.glob("./partials/**/*.ts", {
  eager: true,
});

const components: Global = loadGlobals(Components);
const pages: Global = loadGlobals(Pages);
const partials: Global = loadGlobals(importPartials);

registerGlobals(components);
registerGlobals(pages);
registerGlobals(partials);

const navigate = (page: string) => {
  if (pages[page]) {
    const app = document.getElementById("app");
    if (app) {
      const Component = pages[page] as unknown as typeof Block;
      if (typeof Component !== "string") {
        const component = new Component({});
        const content = component.getContent();
        if (content !== null) {
          app.innerHTML = "";
          app.append(content);
        }
      } else {
        const content = Handlebars.compile(pages[page])({});
        if (content !== null) {
          app.innerHTML = content;
        }
      }
    }
  }
};

// Login
// Signup
// NotFound
// ServerError
// ChatPage
// ProfilePage
// EditProfilePage
// EditPasswordPage
// ChangeAvatarPage

document.addEventListener("DOMContentLoaded", () => navigate("Login"));

document.addEventListener("click", (e) => {
  const target: HTMLElement = e.target as HTMLElement;
  const page = target.getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper("image", (options) => {
  const attrs = Object.keys(options.hash)
    .map((key) => {
      if (key === "src") {
        const imgUrl = new URL(imageUrl + options.hash[key], import.meta.url)
          .href;
        return key + '="' + imgUrl + '"';
      }
      return key + '="' + options.hash[key] + '"';
    })
    .join(" ");

  return "<img " + attrs + ">" + "</>";
});
