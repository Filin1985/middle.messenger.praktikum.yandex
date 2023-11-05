import "./style/index.scss";
import Handlebars from "handlebars";
import { imageUrl } from "./config";
import { BlockType } from "./core/Block";
import { Globals, Global } from "./types";
import { loadGlobals, registerGlobals } from "./utils/utils";
import Router from "./core/Router";
import { getUserInfo } from "./controllers/auth";
import { getChats } from "./controllers/chat";

const Components: Globals = import.meta.glob("./components/**/*.ts", {
  eager: true,
});
const Partials: Globals = import.meta.glob("./partials/**/*.ts", {
  eager: true,
});
const Pages: Globals = import.meta.glob("./pages/**/*.ts", {
  eager: true,
});

const partials: Global = loadGlobals(Partials);
const components: Global = loadGlobals(Components);
const pages: Global = loadGlobals(Pages);

registerGlobals(partials);
registerGlobals(components);
registerGlobals(pages);

// Handlebars.registerHelper("image", (options) => {
//   const attrs = Object.keys(options.hash)
//     .map((key) => {
//       if (key === "src") {
//         const imgUrl = new URL(imageUrl + options.hash[key], import.meta.url)
//           .href;
//         return key + '="' + imgUrl + '"';
//       }
//       return key + '="' + options.hash[key] + '"';
//     })
//     .join(" ");

//   return "<img " + attrs + ">" + "</>";
// });

// Handlebars.registerHelper("ternary", (cond, v1, v2) => {
//   return cond ? v1 : v2;
// });

export enum Routes {
  Index = "/",
  Login = "/login",
  Signup = "/signup",
  Profile = "/profile",
  EditProfile = "/edit-profile",
  EditPassword = "/edit-password",
  ChangeAvatar = "/change-avatar",
  ChatPage = "/messenger",
  NotFound = "/404",
  ServerError = "/500",
}

Router.use(Routes.Index, pages.Login as unknown as BlockType)
  .use(Routes.Signup, pages.Signup as unknown as BlockType)
  .use(Routes.Login, pages.Login as unknown as BlockType)
  .use(Routes.Profile, pages.ProfilePage as unknown as BlockType)
  .use(Routes.EditProfile, pages.EditProfilePage as unknown as BlockType)
  .use(Routes.EditPassword, pages.EditPasswordPage as unknown as BlockType)
  .use(Routes.ChangeAvatar, pages.ChangeAvatarPage as unknown as BlockType)
  .use(Routes.ChatPage, pages.ChatPage as unknown as BlockType)
  .use(Routes.NotFound, pages.NotFound as unknown as BlockType)
  .use(Routes.ServerError, pages.ServerError as unknown as BlockType);

window.addEventListener("DOMContentLoaded", async () => {
  const { pathname } = window.location;
  const pathExists = Object.values(Routes).map((p) => p.toString());

  if (!pathExists.includes(pathname)) Router.go(Routes.NotFound);

  let currentUser = null;
  try {
    currentUser = await getUserInfo();
  } catch (error) {
    Router.go("/");
    return;
  }

  const chats = await getChats();
  console.log(currentUser.avatar);
  window.store.set({
    user: {
      ...currentUser,
      avatar: currentUser.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${currentUser.avatar}`
        : null,
    },
    chats,
  });
  Router.start();
});
