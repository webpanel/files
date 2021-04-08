import "react-chat-widget/lib/styles.css";

import * as React from "react";

import {
  DataSource,
  SortInfoOrder,
  useResourceCollection,
} from "webpanel-data";
import { List, message } from "antd";

import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { DeleteButton } from "./components/delete-button";
import { ListItem } from "./list-item";
import { Pagination } from "./pagination";
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
  } = props;

  let filters: DataSourceArgumentMap = {};
  if (referenceID) {
    filters[referenceColumn || "reference"] = referenceID;
  }
  filters = { ...filters, ...initialFilters };

  const files = useResourceCollection({
    name: "files",
    fields: ["id", "name", "createdAt", "size"],
    initialLimit: 5,
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
    <SpinningCard observedResource={files} title="Soubory">
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={files.data || undefined}
        renderItem={(item: any) => {
          return (
            <List.Item
              actions={[
                <DeleteButton
                  key="delete"
                  onDelete={async () => {
                    await files.delete(item.id);
                    await files.get();
                  }}
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
      <div className={"pagination"}>
        <Pagination resourceCollection={files} />
      </div>
      {!readonly && (
        <Upload
          url={`${uploadURL}?reference=${props.referenceID}&${props.referenceColumn}=${props.referenceID}`}
          accessToken={accessToken}
          onUploadSuccess={() => {
            message.success("Soubor nahrán.");
            files.get();
          }}
          onUploadError={() =>
            message.error("Soubor se bohužel nepodařilo nahrát.")
          }
        />
      )}
    </SpinningCard>
  );
};
