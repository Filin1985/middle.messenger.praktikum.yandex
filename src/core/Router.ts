import Route from "./Route";
import { BlockType } from "./Block";

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: BlockType) {
    const route = new Route(pathname, block, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const window = event.currentTarget as Window;
      if (window) {
        this._onRoute(window.location.pathname);
      }
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router("#app");
