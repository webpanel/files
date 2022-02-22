import "react-chat-widget/lib/styles.css";

import * as React from "react";
import * as moment from "moment";
import * as numeral from "numeral";

import { Spin, message } from "antd";

interface FileItemThumbnail {
  url: string;
}

interface FileItem {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  text?: string;
  thumbnail?: FileItemThumbnail;
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

  const d = moment(item.createdAt);
  return (
    <div className={"file-list__item"}>
      {item.thumbnail && (
        <div className="file-list__thumbnail">
          <a onClick={() => openItem(hostURL, item, accessToken)} href="#">
            <img src={item.thumbnail.url} width={50} />
          </a>
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
