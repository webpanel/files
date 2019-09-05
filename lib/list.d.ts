import 'react-chat-widget/lib/styles.css';
import * as React from 'react';
import { DataSource } from 'webpanel-data';
export interface IFilesListProps {
    referenceID: string | number;
    referenceColumn: string;
    dataSource: DataSource;
    uploadURL: string;
}
export declare class FilesList extends React.Component<IFilesListProps> {
    getItemURL: (item: any) => string;
    render(): JSX.Element;
}
