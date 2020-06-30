import "react-chat-widget/lib/styles.css";
import * as React from "react";
import { DataSource } from "webpanel-data";
import { DataSourceArgumentMap } from "webpanel-data/lib/DataSource";
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
export declare class FilesList extends React.Component<IFilesListProps> {
    getItemURL: (hostURL: string, item: any, token?: string | undefined) => string;
    openItem: (hostURL: string, item: any, token?: string | undefined) => Promise<void>;
    render(): JSX.Element;
}
