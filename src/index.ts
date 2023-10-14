import "./style/index.scss";
import Handlebars from "handlebars";
import { imageUrl } from "./config";
import { registerComponent } from "./core/registerComponent";
import Block from "./core/Block";
import { Globals, Global } from "./types";

const Components: Globals = import.meta.glob("./components/**/*.ts", {
  eager: true,
});
const Pages: Globals = import.meta.glob("./pages/**/*.ts", {
  eager: true,
});
const importPartials: Globals = import.meta.glob("./partials/**/*.ts", {
  eager: true,
});

const loadGlobals = (globals: Globals): Global => {
  const result: Global = {};
  Object.keys(globals).forEach((route: string) => {
    Object.keys(globals[route]).forEach((name: string) => {
      result[name] = globals[route][name];
    });
  });
  return result;
};

const components: Global = loadGlobals(Components);
const pages: Global = loadGlobals(Pages);
const partials: Global = loadGlobals(importPartials);

const registerGlobals = (globals: Global) => {
  Object.keys(globals).forEach((name: string) => {
    const value = globals[name];
    if (typeof value === "string") {
      Handlebars.registerPartial(name, value);
    } else {
      registerComponent(name, value);
    }
  });
};

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
// Profile
// EditProfile
// EditPassword
// ChangeAvatar

document.addEventListener("DOMContentLoaded", () => navigate("ChatPage"));

document.addEventListener("click", (e) => {
  const target: HTMLElement = e.target as HTMLElement;
  const page = target.getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper("image", function (options) {
  const attrs = Object.keys(options.hash)
    .map(function (key) {
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
