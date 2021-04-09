import "react-chat-widget/lib/styles.css";

import * as React from "react";

import { Alert, Card, Spin } from "antd";
import { Resource, ResourceCollection } from "webpanel-data";

import { CardProps } from "antd/lib/card";

export interface ISpinningCardProps extends CardProps {
  observedResource: ResourceCollection<any> | Resource;
}

export class SpinningCard extends React.Component<ISpinningCardProps> {
  public render() {
    const { observedResource, ...cardProps } = this.props;
    const loading = observedResource.loading;
    const error = observedResource.error;
    const emptyData = !observedResource.getData();
    return (
      <Spin spinning={loading}>
        <Card loading={loading && emptyData} {...cardProps}>
          {error ? (
            <Alert type="error" message={`Error: ${error}`} />
          ) : (
            this.props.children
          )}
        </Card>
      </Spin>
    );
  }
}
