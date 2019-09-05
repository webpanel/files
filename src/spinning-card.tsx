import 'react-chat-widget/lib/styles.css';

import * as React from 'react';

import { Alert, Card, Spin } from 'antd';
import { Resource, ResourceCollection } from 'webpanel-data';

import { CardProps } from 'antd/lib/card';
import { observer } from 'mobx-react';

export interface ISpinningCardProps extends CardProps {
  observedResource: ResourceCollection | Resource;
}

@observer
export class SpinningCard extends React.Component<ISpinningCardProps> {
  public render() {
    const { observedResource, ...cardProps } = this.props;
    const loading = observedResource.loading;
    const error = observedResource.error;
    const emptyData = !observedResource.getRawData();
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
