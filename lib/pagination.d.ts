/// <reference types="react" />
import { PaginationProps } from "antd/lib/pagination";
import { ResourceCollection } from "webpanel-data";
export interface IPaginationProps extends PaginationProps {
    resourceCollection: ResourceCollection<any>;
}
export declare const Pagination: (props: IPaginationProps) => JSX.Element;
