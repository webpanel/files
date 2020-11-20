import "react-chat-widget/lib/styles.css";

import * as React from "react";
import * as moment from "moment";
import * as numeral from "numeral";

import { Spin, message } from "antd";

interface ListItemProps {
  item: any;
  hostURL: string;
  accessToken?: string;
}

export const ListItem = (props: ListItemProps) => {
  const [loading, setLoading] = React.useState(false);
  const { item, hostURL, accessToken } = props;

  const openItem = async (hostURL: string, item: any, token?: string) => {
    try {
      setLoading(true);
      const url = await fetch(`${hostURL}/${item.id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((json) => json.url);
      window.open(url, "_blank");
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"file-list__item"}>
      <div>
        <a onClick={() => openItem(hostURL, item, accessToken)} href="#">
          <h4>{item.name || <i>[unnamed_file]</i>}</h4>
          {loading && <Spin size="small" />}
        </a>

        <span className="file-size">{numeral(item.size).format("0.00b")}</span>
      </div>
      <div className="file-list__right-column">
        <div style={{ margin: "auto 0" }}>{item.text}</div>

        <div className="creation-date">{moment(item.createdAt).calendar()}</div>
      </div>
    </div>
  );
};
