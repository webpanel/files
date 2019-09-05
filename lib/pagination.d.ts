import { PaginationProps } from 'antd/lib/pagination';
import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';
export interface IPaginationProps extends PaginationProps {
    resourceCollection: ResourceCollection;
}
export declare class Pagination extends React.Component<IPaginationProps> {
    render(): JSX.Element;
}
