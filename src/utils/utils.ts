import Handlebars from "handlebars";
import { registerComponent } from "../core/registerComponent";
import { Globals, Global } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Indexed<T = any> = {
  [key in string]: T;
};

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

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  Object.entries(rhs).forEach(([p, value]) => {
    try {
      if (value.constructor === Object) {
        value = merge(lhs[p] as Indexed, value as Indexed);
      } else {
        lhs[p] = value;
      }
    } catch (e) {
      lhs[p] = value;
    }
  });

  return lhs;
};

export const set = (
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown => {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value as any
  );

  return merge(object as Indexed, result);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
