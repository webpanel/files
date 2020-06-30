import * as React from "react";
import { UploadProps } from "antd/lib/upload";
export interface IUploadProps extends UploadProps {
    url: string;
    accessToken?: string;
    onUploadSuccess?: (file: any) => void;
    onUploadError?: (err: Error, file: any) => void;
}
export declare class Upload extends React.Component<IUploadProps> {
    render(): JSX.Element;
    private onChange;
}
