import "react-chat-widget/lib/styles.css";

import * as React from "react";

import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder,
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

export class FilesList extends React.Component<IFilesListProps> {
  public render() {
    const {
      dataSource,
      referenceColumn,
      referenceID,
      uploadURL,
      hostURL,
      initialFilters,
      readonly,
      accessToken,
    } = this.props;

    let filters: DataSourceArgumentMap = {};
    if (referenceID) {
      filters[referenceColumn || "reference"] = referenceID;
    }
    filters = { ...filters, ...initialFilters };

    return (
      <ResourceCollectionLayer
        name="files"
        key={`files_${this.props.referenceID}`}
        fields={["id", "name", "createdAt", "size"]}
        initialLimit={5}
        initialOffset={0}
        initialFilters={filters}
        initialSorting={[
          {
            columnKey: "createdAt",
            order: SortInfoOrder.descend,
          },
        ]}
        dataSource={dataSource}
        render={(files: ResourceCollection) => (
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
                url={`${uploadURL}?reference=${this.props.referenceID}&${this.props.referenceColumn}=${this.props.referenceID}`}
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
        )}
      />
    );
  }
}
