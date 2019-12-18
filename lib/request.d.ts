declare class UploadError extends Error {
    status: number;
    method: string;
    url: string;
}
interface UploadOptions {
    onProgress: (event: {
        percent: number;
    }) => void;
    onError: (event: UploadError, body?: Object) => void;
    onSuccess: (body: Object, xhr: XMLHttpRequest) => void;
    method: string;
    data: Object;
    filename: string;
    file: File;
    withCredentials: boolean;
    action: string;
    headers: Object;
}
export declare function UploadRequest(options: UploadOptions): {
    abort(): void;
};
export {};
