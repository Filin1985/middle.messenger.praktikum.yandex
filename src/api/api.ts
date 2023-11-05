import HTTP from "../core/Http";

export abstract class API {
  protected http: HTTP;

  constructor(path: string) {
    this.http = new HTTP(path);
  }
}
