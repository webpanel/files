/// <reference types="react" />
import "react-chat-widget/lib/styles.css";
interface ListItemProps {
    item: any;
    hostURL: string;
    accessToken?: string;
}
export declare const ListItem: (props: ListItemProps) => JSX.Element;
export {};
