/// <reference types="react" />
import "react-chat-widget/lib/styles.css";
interface FileItemThumbnail {
    url: string;
}
interface FileItem {
    id: string;
    name: string;
    size: number;
    createdAt: string;
    text?: string;
    smallThumbnail?: FileItemThumbnail;
    largeThumbnail?: FileItemThumbnail;
}
interface ListItemProps {
    item: FileItem;
    hostURL: string;
    accessToken?: string;
}
export declare const ListItem: (props: ListItemProps) => JSX.Element;
export {};
