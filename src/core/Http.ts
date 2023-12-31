import { Options, OptionsOmitMethod, METHODS } from "./types";

type HTTPMethod = <ServerResponse>(
  url: string,
  options?: OptionsOmitMethod
) => Promise<ServerResponse>;

class HTTP {
  protected apiUrl: string = "";

  constructor(apiPath: string = "") {
    this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
  }

  get: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(`${this.apiUrl}${url}`, {
      ...options,
      method: METHODS.DELETE,
    });

  request = async <ServerResponse>(
    url: string,
    options: Options
  ): Promise<ServerResponse> => {
    const { method, headers = {}, data, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && data) {
        url += queryStringify(data as Record<string, unknown>);
      }

      xhr.open(method || METHODS.GET, url);

      if (data instanceof FormData) {
        xhr.setRequestHeader("Accept", "application/json");
      } else {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: Record<string, any>): string | never {
  let result = "?";

  for (const [key, value] of Object.entries(data)) {
    result += `${key}=${value.toString()}&`;
  }

  return result.slice(0, result.length - 1);
}

function fetchWithRetry(url: string, options: Options): unknown {
  const { retries = 2 } = options;

  if (retries === 0) {
    throw new Error("The number of attempts has been exhausted");
  }

  return new HTTP()
    .get(url, options)
    .catch(() => fetchWithRetry(url, { ...options, retries: retries - 1 }));
}

export default HTTP;

export { fetchWithRetry };
