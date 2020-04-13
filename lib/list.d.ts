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
}
export declare class FilesList extends React.Component<IFilesListProps> {
    getItemURL: (hostURL: string, item: any) => string;
    openItem: (hostURL: string, item: any) => Promise<void>;
    render(): JSX.Element;
}
