import React from "react";
import styles from "./Trading.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbExchange, TbFilter } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

export const Trading = () => {
  const [page, setPage] = React.useState("Buy");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL + "/api/p2p/offers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.trading}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">P2P Deals</h1>
      <div className={styles.trading_content}>
        <div className={styles.trading_content_main}>
          <div className={styles.trading_content_main_top}>
            <div className={styles.trading_content_main_top_right}>
              <p
                className="p"
                onClick={() => setPage("Buy")}
                style={
                  page == "Buy"
                    ? {
                        color: "#000",
                        borderBottom: "2px solid #215E04",
                      }
                    : {
                        color: "#2A2E2B70",
                      }
                }
              >
                Buy
              </p>{" "}
              <p
                className="p"
                onClick={() => setPage("Sell")}
                style={
                  page == "Sell"
                    ? {
                        color: "#000",
                        borderBottom: "2px solid #215E04",
                      }
                    : {
                        color: "#2A2E2B70",
                      }
                }
              >
                Sell
              </p>
            </div>
            <button className="span2">
              RUB <TbExchange />{" "}
            </button>
          </div>
          <div className={styles.trading_content_main_filter}>
            <div className={styles.trading_content_main_filter_right}>
              <select className="span" name="crypto" id="">
                <option value="usdt" className="span">
                  USDT
                </option>
              </select>
              <select className="span" name="amount" id="">
                <option value="1500" className="span">
                  1500
                </option>
              </select>
              <select className="span" name="payment" id="">
                <option value="local" className="span">
                  Local Card(Red) SBP
                </option>
              </select>
            </div>
            <button className="span">
              <TbFilter /> Filter
            </button>
          </div>
          <div className={styles.trading_content_main_body}>
            {loading ? (
              <div className={styles.trading_content_main_body_loading}>
                <p className="p">Loading...</p>
              </div>
            ) : data.length > 0 ? (
              data.map((item) => {
                return (
                  <div
                    className={styles.trading_content_main_body_item}
                    key={item.id}
                  >
                    <div className={styles.trading_content_main_body_item_top}>
                      <div
                        className={
                          styles.trading_content_main_body_item_top_left
                        }
                      >
                        <FaUser /> {item.user.name}
                      </div>
                      <div
                        className={
                          styles.trading_content_main_body_item_top_right
                        }
                      >
                        {item.price} {item.currency}
                      </div>
                    </div>
                    <div
                      className={styles.trading_content_main_body_item_bottom}
                    >
                      <p className="p">
                        {item.amount} {item.crypto}
                      </p>
                      <button className="green-button">Buy</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.trading_content_main_body_empty}>
                <p className="p">No data found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
