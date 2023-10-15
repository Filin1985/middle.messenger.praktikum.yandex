import Handlebars from "handlebars";
import { registerComponent } from "../core/registerComponent";
import { Globals, Global } from "../types";

export const loadGlobals = (globals: Globals): Global => {
  const result: Global = {};
  Object.keys(globals).forEach((route: string) => {
    Object.keys(globals[route]).forEach((name: string) => {
      result[name] = globals[route][name];
    });
  });
  return result;
};

export const registerGlobals = (globals: Global) => {
  Object.keys(globals).forEach((name: string) => {
    const value = globals[name];
    if (typeof value === "string") {
      Handlebars.registerPartial(name, value);
    } else {
      registerComponent(name, value);
    }
  });
};
