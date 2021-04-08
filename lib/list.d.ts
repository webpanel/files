/// <reference types="react" />
import "react-chat-widget/lib/styles.css";
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
export declare const FilesList: (props: IFilesListProps) => JSX.Element;
