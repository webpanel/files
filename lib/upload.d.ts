/// <reference types="react" />
import { UploadProps } from "antd/lib/upload";
export interface IUploadProps extends UploadProps {
    url: string;
    accessToken?: string;
    onUploadSuccess?: (file: any) => void;
    onUploadError?: (err: Error, file: any) => void;
}
export declare const Upload: (props: IUploadProps) => JSX.Element;
