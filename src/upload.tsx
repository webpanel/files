import * as React from 'react';

import { Upload as AntdUpload } from 'antd';
import { AuthSession } from 'webpanel-auth';
import { UploadProps } from 'antd/lib/upload';

export interface IUploadProps extends UploadProps {
  url: string;
  onUploadSuccess?: (file: any) => void;
  onUploadError?: (err: Error, file: any) => void;
}

export class Upload extends React.Component<IUploadProps> {
  public render() {
    const { url, ...props } = this.props;

    const accessToken = AuthSession.current().accessToken;
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
      >
        <p>Click or drag file to this area to upload file</p>
      </AntdUpload.Dragger>
    );
  }

  private onChange = (info: any) => {
    const status = info.file.status;

    if (status === 'done' && this.props.onUploadSuccess) {
      this.props.onUploadSuccess(info.file);
    } else if (status === 'error' && this.props.onUploadError) {
      this.props.onUploadError(info.file.error, info.file);
    }
  };
}
