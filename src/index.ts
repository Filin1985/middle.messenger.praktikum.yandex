import "./style/index.scss";
import { BlockType } from "./core/Block";
import { Globals, Global } from "./types";
import { loadGlobals, registerGlobals } from "./utils/utils";
import Router from "./core/Router";
import { getUserInfo } from "./controllers/auth";
import { getChats } from "./controllers/chat";
import { RESOURCES_URL } from "./config";

const Components: Globals = import.meta.glob("./components/**/*.ts", {
  eager: true,
});

const Partials: Globals = import.meta.glob("./partials/**/*.ts", {
  eager: true,
});

export const Pages: Globals = import.meta.glob("./pages/**/*.ts", {
  eager: true,
});

const partials: Global = loadGlobals(Partials);
const components: Global = loadGlobals(Components);
const pages: Global = loadGlobals(Pages);

registerGlobals(partials);
registerGlobals(components);
registerGlobals(pages);

export enum Routes {
  Index = "/",
  Login = "/login",
  Signup = "/signup",
  Profile = "/settings",
  EditProfile = "/edit-profile",
  EditPassword = "/edit-password",
  AddUser = "/add-user",
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
  .use(Routes.AddUser, pages.AddUserPage as unknown as BlockType)
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
  if (currentUser) {
    window.store.set({
      user: {
        ...currentUser,
        avatar: currentUser.avatar
          ? `${RESOURCES_URL}${currentUser.avatar}`
          : null,
      },
      chats,
    });
    Router.start();
  }
});
