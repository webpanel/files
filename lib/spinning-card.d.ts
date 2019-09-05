import 'react-chat-widget/lib/styles.css';
import * as React from 'react';
import { Resource, ResourceCollection } from 'webpanel-data';
import { CardProps } from 'antd/lib/card';
export interface ISpinningCardProps extends CardProps {
    observedResource: ResourceCollection | Resource;
}
export declare class SpinningCard extends React.Component<ISpinningCardProps> {
    render(): JSX.Element;
}
