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
  extra?: (selectedIDs: string[]) => React.ReactNode;
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
    extra,
  } = props;

  let filters: DataSourceArgumentMap = { status: "COMPLETED" };
  if (referenceID) {
    filters[referenceColumn || "reference"] = referenceID;
  }
  filters = { ...filters, ...initialFilters };
  const [selectedIDs, setSelectedIDs] = React.useState<{
    [key: string]: boolean;
  }>({});
  const selectedKeys = Object.keys(selectedIDs);
  const selectedCount = selectedKeys.length;

  const files = useResourceCollection({
    name: "files",
    fields: ["id", "name", "createdAt", "size"],
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
      extra={[
        extra && extra(selectedKeys),
        <DeleteButton
          onDelete={async () => {
            await Promise.all(
              Object.keys(selectedIDs).map((id: string) => {
                const item = files.getItem({ id });
                return item.update({ status: "DELETED" });
              })
            );
            files.get();
            setSelectedIDs({});
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
                values[f.id] = true;
              }
              setSelectedIDs(values);
            } else {
              setSelectedIDs({});
            }
          }}
        />,
      ]}
    >
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={files.data || undefined}
        pagination={{ position: "bottom", defaultPageSize: 5 }}
        renderItem={(item: any) => {
          return (
            <List.Item
              actions={[
                <Checkbox
                  onChange={() => {
                    const values = {
                      ...selectedIDs,
                    };
                    if (values[item.id]) {
                      delete values[item.id];
                    } else {
                      values[item.id] = true;
                    }
                    setSelectedIDs(values);
                  }}
                  checked={selectedIDs[item.id]}
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
