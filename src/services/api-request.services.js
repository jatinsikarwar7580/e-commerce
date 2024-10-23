/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import qs from "qs";
import axios, { AxiosResponse } from "axios";
const CONTENT_TYPE_URL_ENCODED = "application/x-www-form-urlencoded;charset=UTF-8";
const defaultConfig = {
  // timeout: 30000, //100000,
  headers: {
    "content-type": CONTENT_TYPE_URL_ENCODED,
  },
  validateStatus: function (status) {
    return status < 600;
  },
};

const instance = axios.create(defaultConfig);

async function get(url: string, { signal }) {
  const source = axios.CancelToken.source();
  const timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  const response = await instance.get(url, {
    cancelToken: source.token,
    signal: signal,
  });
  clearTimeout(timer);
  return response;
}

async function post(url, params, contentType = undefined, auth = null) {
  const source = axios.CancelToken.source();
  const timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);

  const headers = {
    "content-type": contentType ? contentType : CONTENT_TYPE_URL_ENCODED,
  };
  if (auth) {
    headers.Authorization = auth;
  }

  const postOtherData= {
    cancelToken: source.token,
    headers,
  };
  // if (auth) {
  //   postOtherData.auth = auth;
  // }
  const response = await instance.post(url, params, postOtherData);
  clearTimeout(timer);
  return response;
}

async function patch(url, params) {
  const source = axios.CancelToken.source();
  const timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  const response = await instance.patch(url, params, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}

async function put(url, params) {
  const source = axios.CancelToken.source();
  const timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  const response = await instance.put(url, params, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}

async function Delete(url: any) {
  const source = axios.CancelToken.source();
  const timer = setTimeout(() => {
    source.cancel();
  }, 60 * 1000);
  const response = await instance.delete(url, {
    cancelToken: source.token,
  });
  clearTimeout(timer);
  return response;
}

export function errorInterceptor(): string | void {
  instance.interceptors.response.use(undefined, (error) => {
    const { response } = error;

    if (!response) {
      // network error
      console.error(error);
      return;
    }

    if ([401, 403].includes(response.status)) {
      // auto logout if 401 or 403 response returned from api
      // accountService.logout();
    }

    // const errorMessage = response.data;
    // console.log('errorMessage', errorMessage)
    return response;
  });
}


export function send(params): Promise<any> {
  return new Promise((resolve, reject) => {
    let Url;
    let Params;
    let contentType;

    if (!params || typeof params !== "object") {
      throw new Error("params is undefined or not an object");
    }
    switch (params.method) {
      case "GET":
        Url = params.baseurl + params.url;
        get(Url, { signal: params.signal })
          .then((result: AxiosResponse) => {
            resolve(result);
          })
          .catch((err) => {
            const error = errorInterceptor();
            reject(error);
          });
        break;

      case "POST":
        Url = params.baseurl + params.url;

        contentType = params.contentType;
        if (params.isRawData) {
          Params = params.obj;
        } 
       

         else {
          Params = qs.stringify(params.obj);
        }
        post(Url, Params, contentType, params.auth)
          .then((result: AxiosResponse) => {
            resolve(result);
          })
          .catch((err: Error) => {
            const error = errorInterceptor();
            reject(error);
          });
        break;

      case "PATCH":
        Url = params.baseurl + params.url;
        Params = params.obj;
        patch(Url, Params)
          .then((result: AxiosResponse) => {
            resolve(result);
          })
          .catch((err: Error) => {
            const error = errorInterceptor();
            reject(error);
          });
        break;

      case "PUT":
        Url = params.baseurl + params.url;
        Params = qs.stringify(params.obj);
        console.log("Url: ", Url);
        console.log("Params: ", Params);

        put(Url, Params)
          .then((result: AxiosResponse) => {
            resolve(result);
          })
          .catch((err: Error) => {
            console.log(err);
            const error = errorInterceptor();
            reject(error);
          });
        break;

      case "DELETE":
        Url = params.baseurl + params.url;
        Delete(Url)
          .then((result: AxiosResponse) => {
            resolve(result);
          })
          .catch((err: Error) => {
            console.log(err);
            const error = errorInterceptor();
            reject(error);
          });
        break;

      default:
        break;
    }
  });
}
