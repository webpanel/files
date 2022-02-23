import "react-chat-widget/lib/styles.css";

import * as React from "react";
import * as moment from "moment";

import { Spin, message, Image, Popover } from "antd";

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

export const ListItem = (props: ListItemProps) => {
  const [loading, setLoading] = React.useState(false);
  const { item, hostURL, accessToken } = props;

  const openItem = async (hostURL: string, item: FileItem, token?: string) => {
    try {
      setLoading(true);
      const windowRef = window.open();
      const url = await fetch(`${hostURL}/${item.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => json.url);
      if (windowRef) {
        windowRef.location = url;
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tooltipContent = item.largeThumbnail && (
    <div>
      <Image width={250} src={item.largeThumbnail.url} placeholder={true} />
    </div>
  );
  const d = moment(item.createdAt);
  return (
    <div className={"file-list__item"}>
      {item.smallThumbnail && (
        <div className="file-list__thumbnail">
          <Popover content={tooltipContent}>
            <Image
              src={item.smallThumbnail.url}
              width={50}
              preview={false}
              placeholder={true}
            />
          </Popover>
        </div>
      )}
      <div>
        <a onClick={() => openItem(hostURL, item, accessToken)} href="#">
          <h4>{item.name || <i>[unnamed_file]</i>}</h4>
          {loading && <Spin size="small" />}
        </a>
        <span className="creation-date">
          {d.format("l")} {d.format("LT")}
        </span>
      </div>
      <div className="file-list__right-column">
        <div style={{ margin: "auto 0" }}>{item.text}</div>
      </div>
    </div>
  );
};
