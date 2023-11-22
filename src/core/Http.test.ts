import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { expect } from "chai";
import Http from "./Http";

describe("Http test", () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: Http;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).XMLHttpRequest = xhr;

    xhr.onCreate = (req) => {
      requests.push(req);
    };
    instance = new Http("");
  });

  afterEach(() => {
    requests.length = 0;
    sinon.restore();
  });

  it("Http get method must be called using the GET method", () => {
    instance.get("/");
    const [request] = requests;
    expect(request.method).to.equal("GET");
  });

  it("Http put method must be called using the PUT method", () => {
    instance.put("/path", {});
    const [request] = requests;
    expect(request.method).to.equal("PUT");
  });

  it("Http post method must be called using the POST method", () => {
    instance.post("/path");
    const [request] = requests;
    expect(request.method).to.equal("POST");
  });

  it("Http delete method must be called using the DELETE method", () => {
    instance.delete("/path");
    const [request] = requests;
    expect(request.method).to.equal("DELETE");
  });

  it("Http request method must return a successful status", async () => {
    instance.get("/");
    const [request] = requests;
    const responseStatus = 200;
    request.respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseStatus)
    );
    const response = request.status;
    expect(response).to.deep.equal(responseStatus);
  });

  it("Http request method must return an error response", async () => {
    instance.get("/");
    const [request] = requests;
    const errorResponse = "Not Found";

    try {
      request.respond(404, { "Content-Type": "text/plain" }, errorResponse);
    } catch (error) {
      expect(error).to.equal(errorResponse);
    }
  });
});
