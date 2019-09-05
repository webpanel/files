import * as React from 'react';

import { Button, Icon, Popconfirm } from 'antd';

export interface IDeleteButtonProps {
  onDelete: () => void;
}

export class DeleteButton extends React.Component<IDeleteButtonProps> {
  public render() {
    return (
      <Popconfirm
        title="Do you want to delete this item?"
        cancelText="No"
        okText="Yes"
        onConfirm={() => this.props.onDelete()}
      >
        <Button type="danger" size="small">
          <Icon type="delete" />
        </Button>
      </Popconfirm>
    );
  }
}
