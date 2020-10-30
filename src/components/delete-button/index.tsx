import * as React from "react";

import { Button, Popconfirm } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

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
        <Button danger={true} size="small">
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    );
  }
}
