import * as React from "react";

import { Upload as AntdUpload } from "antd";
import { UploadProps } from "antd/lib/upload";
import { UploadRequest } from "./request";
import { useTranslation } from "react-i18next";

export interface IUploadProps extends UploadProps {
  url: string;
  accessToken?: string;
  onUploadSuccess?: (file: any) => void;
  onUploadError?: (err: Error, file: any) => void;
}

export const Upload = (props: IUploadProps) => {
  const { t } = useTranslation("webpanel-files");
  const onChange = (info: any) => {
    const status = info.file.status;

    if (status === "done" && props.onUploadSuccess) {
      props.onUploadSuccess(info.file.response);
    } else if (status === "error" && props.onUploadError) {
      props.onUploadError(info.file.error, info.file);
    }
  };

  const { url, accessToken, ...rest } = props;

  const headers: { [key: string]: string } = {};
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  return (
    <AntdUpload.Dragger
      {...rest}
      name="file"
      multiple={true}
      action={url}
      onChange={onChange}
      headers={headers}
      customRequest={UploadRequest}
    >
      <p>{t("upload_dagger_text")}</p>
    </AntdUpload.Dragger>
  );
};
