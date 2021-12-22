import * as React from "react";

import { Upload as AntdUpload } from "antd";
import { UploadProps } from "antd/lib/upload";
import { UploadRequest } from "./request";

export interface IUploadProps extends UploadProps {
  url: string;
  accessToken?: string;
  onUploadSuccess?: (file: any) => void;
  onUploadError?: (err: Error, file: any) => void;
}

export class Upload extends React.Component<IUploadProps> {
  public render() {
    const { url, accessToken, ...props } = this.props;

    const headers: { [key: string]: string } = {};
    if (accessToken) {
      headers.authorization = `Bearer ${accessToken}`;
    }

    return (
      <AntdUpload.Dragger
        {...props}
        name="file"
        multiple={true}
        action={url}
        onChange={this.onChange}
        headers={headers}
        customRequest={UploadRequest}
      >
        <p>Click or drag file to this area to upload file</p>
      </AntdUpload.Dragger>
    );
  }

  private onChange = (info: any) => {
    const status = info.file.status;

    if (status === "done" && this.props.onUploadSuccess) {
      this.props.onUploadSuccess(info.file.response);
    } else if (status === "error" && this.props.onUploadError) {
      this.props.onUploadError(info.file.error, info.file);
    }
  };
}
