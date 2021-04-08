import * as React from "react";

import { Pagination as AntdPagination } from "antd";
import { PaginationProps } from "antd/lib/pagination";
import { ResourceCollection } from "webpanel-data";

export interface IPaginationProps extends PaginationProps {
  resourceCollection: ResourceCollection<any>;
}

export const Pagination = (props: IPaginationProps) => {
  const {
    resourceCollection: { offset, limit, count },
  } = props;

  const showCount = count || 0;

  if (offset === undefined || limit === undefined) {
    throw new Error(
      "One of ResourceCollection's required variables is undefined (offset, limit)"
    );
  }

  return (
    <AntdPagination
      current={Math.floor(offset / limit) + 1}
      total={showCount}
      defaultPageSize={limit}
      size="small"
      onChange={(page: number) =>
        props.resourceCollection.updateOffset((page - 1) * limit)
      }
    />
  );
};
