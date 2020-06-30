class UploadError extends Error {
  public status: number;
  public method: string;
  public url: string;
}

function getError(options: UploadOptions, xhr: XMLHttpRequest) {
  const msg = `cannot ${options.method} ${options.action} ${xhr.status}'`;
  const err = new UploadError(msg);
  err.status = xhr.status;
  err.method = options.method;
  err.url = options.action;
  return err;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

interface UploadOptions {
  onProgress: (event: { percent: number }) => void;
  onError: (event: UploadError, body?: Object) => void;
  onSuccess: (body: Object, xhr: XMLHttpRequest) => void;
  method: string;
  data: Object;
  filename: string;
  file: File;
  withCredentials: boolean;
  action: string;
  headers: Headers;
}

const getPresignedUrl = async (options: UploadOptions): Promise<string> => {
  return fetch(options.action, {
    method: "POST",
    body: JSON.stringify({
      filename: options.file.name,
      size: options.file.size,
      contentType: options.file.type,
    }),
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => json.uploadURL);
};

export function UploadRequest(options: UploadOptions) {
  const xhr = new XMLHttpRequest();

  if (options.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      const event: { percent: number } = { ...e, percent: 0 };
      if (e.total > 0) {
        event.percent = (e.loaded / e.total) * 100;
      }
      options.onProgress(event);
    };
  }

  xhr.onerror = function error(e) {
    options.onError(getError(options, xhr), getBody(xhr));
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.onError(getError(options, xhr), getBody(xhr));
    }

    options.onSuccess(getBody(xhr), xhr);
  };

  getPresignedUrl(options).then((uploadURL) => {
    xhr.open("PUT", uploadURL, true);

    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
    if (options.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }

    xhr.send(options.file);
  });
  return {
    abort() {
      xhr.abort();
    },
  };
}
