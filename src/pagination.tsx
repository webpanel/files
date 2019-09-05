import { Pagination as AntdPagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ResourceCollection } from 'webpanel-data';

export interface IPaginationProps extends PaginationProps {
  resourceCollection: ResourceCollection;
}

@observer
export class Pagination extends React.Component<IPaginationProps> {
  public render() {
    const {
      resourceCollection: { offset, limit, count }
    } = this.props;

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
          this.props.resourceCollection.updateOffset((page - 1) * limit)
        }
      />
    );
  }
}
