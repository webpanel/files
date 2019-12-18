import "react-chat-widget/lib/styles.css";

import * as React from "react";
import * as moment from "moment";
import * as numeral from "numeral";

import {
  DataSource,
  ResourceCollection,
  ResourceCollectionLayer,
  SortInfoOrder
} from "webpanel-data";
import { List, message } from "antd";

import { AuthSession } from "webpanel-auth";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
import { DeleteButton } from "./components/delete-button";
import { Pagination } from "./pagination";
import { SpinningCard } from "./spinning-card";
import { Upload } from "./upload";

export interface IFilesListProps {
  referenceID: string | number;
  referenceColumn: string;
  initialFilters?: DataSourceArgumentMap;
  dataSource: DataSource;
  uploadURL: string;
}

export class FilesList extends React.Component<IFilesListProps> {
  public getItemURL = (item: any): string => {
    const token = AuthSession.current().accessToken;
    return `${item.url}?access_token=${token}`;
  };

  public render() {
    const {
      dataSource,
      referenceColumn,
      referenceID,
      uploadURL,
      initialFilters
    } = this.props;

    let filters: DataSourceArgumentMap = {};
    filters[referenceColumn] = referenceID;
    filters = { ...filters, ...initialFilters };

    return (
      <ResourceCollectionLayer
        name="files"
        key={`files_${this.props.referenceID}`}
        fields={["id", "name", "url", "createdAt", "size"]}
        initialLimit={5}
        initialOffset={0}
        initialFilters={filters}
        initialSorting={[
          {
            columnKey: "createdAt",
            order: SortInfoOrder.descend
          }
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
                      />
                    ]}
                  >
                    <div className={"file-list__item"}>
                      <div>
                        <a href={this.getItemURL(item)} target="_blank">
                          <h4>{item.name || <i>[unnamed_file]</i>}</h4>
                        </a>

                        <span className="file-size">
                          {numeral(item.size).format("0.00b")}
                        </span>
                      </div>
                      <div className="file-list__right-column">
                        <div style={{ margin: "auto 0" }}>{item.text}</div>

                        <div className="creation-date">
                          {moment(item.createdAt).calendar()}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                );
              }}
            />
            <div className={"pagination"}>
              <Pagination resourceCollection={files} />
            </div>
            <Upload
              url={`${uploadURL}?reference=${this.props.referenceID}&${this.props.referenceColumn}=${this.props.referenceID}`}
              onUploadSuccess={() => {
                message.success("Soubor nahrán.");
                files.get();
              }}
              onUploadError={() =>
                message.error("Soubor se bohužel nepodařilo nahrát.")
              }
            />
          </SpinningCard>
        )}
      />
    );
  }
}
