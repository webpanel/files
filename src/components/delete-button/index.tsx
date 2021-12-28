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
        title="Přejete si smazat vybrané položky?"
        cancelText="Ne"
        okText="Ano"
        onConfirm={() => this.props.onDelete()}
      >
        <Button danger={true} size="small">
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    );
  }
}
