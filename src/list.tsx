import "react-chat-widget/lib/styles.css";

import * as React from "react";

import { Checkbox, List, message } from "antd";
import {
  DataSource,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { DeleteButton } from "./components/delete-button";
import { ListItem } from "./list-item";
import { SpinningCard } from "./spinning-card";
import { Upload } from "./upload";

export interface IFilesListProps {
  referenceID?: string | number;
  referenceColumn?: string;
  initialFilters?: DataSourceArgumentMap;
  dataSource: DataSource;
  uploadURL: string;
  hostURL: string;
  readonly?: boolean;
  accessToken?: string;
  thumbnails?: boolean;
  extra?: (selectedIDs: { [key: string]: any }) => React.ReactNode;
}

export const FilesList = (props: IFilesListProps) => {
  const {
    dataSource,
    referenceColumn,
    referenceID,
    uploadURL,
    hostURL,
    initialFilters,
    readonly,
    accessToken,
    thumbnails,
    extra,
  } = props;

  let filters: DataSourceArgumentMap = { status: "COMPLETED" };
  if (referenceID) {
    filters[referenceColumn || "reference"] = referenceID;
  }
  filters = { ...filters, ...initialFilters };
  const [selectedFiles, setSelectedFiles] = React.useState<{
    [key: string]: any;
  }>({});
  const selectedKeys = Object.keys(selectedFiles);
  const selectedCount = selectedKeys.length;

  const fields = ["id", "name", "createdAt", "size"];
  if (thumbnails) {
    fields.push("smallThumbnail: thumbnail(width:60) { url }");
    fields.push("largeThumbnail: thumbnail(width:900) { url }");
  }

  const files = useResourceCollection({
    name: "files",
    fields,
    initialLimit: 99,
    initialOffset: 0,
    initialFilters: filters,
    initialSorting: [
      {
        columnKey: "createdAt",
        order: SortInfoOrder.descend,
      },
    ],
    dataSource: dataSource,
  });

  return (
    <SpinningCard
      observedResource={files}
      title="Soubory"
      bodyStyle={{ padding: 16 }}
      extra={[
        extra && extra(selectedFiles),
        <DeleteButton
          onDelete={async () => {
            await Promise.all(
              Object.keys(selectedFiles).map((id: string) => {
                const item = files.getItem({ id });
                return item.update({ status: "DELETED" });
              })
            );
            files.get();
            setSelectedFiles({});
          }}
        />,
        " ",
        <Checkbox
          checked={selectedCount > 0}
          indeterminate={selectedCount > 0 && selectedCount !== files.count}
          onChange={() => {
            if (selectedCount === 0) {
              const values = {};
              for (const f of files.getData() || []) {
                values[f.id] = f;
              }
              setSelectedFiles(values);
            } else {
              setSelectedFiles({});
            }
          }}
        />,
      ]}
    >
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={files.data || undefined}
        pagination={{
          position: "bottom",
          defaultPageSize: 5,
        }}
        renderItem={(item: any) => {
          return (
            <List.Item
              key={item.id}
              style={{ padding: 8 }}
              actions={[
                <Checkbox
                  onChange={() => {
                    const values = {
                      ...selectedFiles,
                    };
                    if (values[item.id]) {
                      delete values[item.id];
                    } else {
                      values[item.id] = item;
                    }
                    setSelectedFiles(values);
                  }}
                  checked={selectedFiles[item.id]}
                />,
              ]}
            >
              <ListItem
                item={item}
                hostURL={hostURL}
                accessToken={accessToken}
              />
            </List.Item>
          );
        }}
      />
      {!readonly && (
        <Upload
          url={`${uploadURL}?reference=${props.referenceID}&${props.referenceColumn}=${props.referenceID}`}
          accessToken={accessToken}
          onUploadSuccess={async (response: { id: string }) => {
            const f = files.getItem({ id: response.id });
            await f.update({ status: "COMPLETED" });
            message.success("Soubor nahrán.");
            files.get();
          }}
          onUploadError={() =>
            message.error("Soubor se bohužel nepodařilo nahrát.")
          }
          style={{ marginTop: 20 }}
        />
      )}
    </SpinningCard>
  );
};
