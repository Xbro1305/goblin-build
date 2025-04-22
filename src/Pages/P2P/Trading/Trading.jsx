import React, { useEffect } from "react";
import styles from "./Trading.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbExchange, TbFilter } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const Trading = () => {
  const [page, setPage] = React.useState("Buy");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    axios(process.env.REACT_APP_BASE_URL + "/api/p2p/offers/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
          autoHideDuration: 2000,
        });
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      });
  }, []);

  useEffect(() => {
    setItems(
      data.filter((item) => {
        if (page === "Buy") {
          return item.type === "BUY";
        } else if (page === "Sell") {
          return item.type === "SELL";
        }
      })
    );
  }, [page, data]);

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
            ) : items.length > 0 ? (
              items.map((item) => {
                return (
                  <div className={styles.trading_content_item}>
                    <div className={styles.trading_content_item_top}>
                      <div className={styles.trading_content_item_top_left}>
                        <section>
                          <FaUser />
                        </section>
                        <div
                          className={styles.trading_content_item_top_left_user}
                        >
                          <p className="span">{item?.ukoser?.name || "User"}</p>
                          <span className="span2">когда-то</span>
                        </div>
                      </div>
                      <div className={styles.trading_content_item_top_right}>
                        <p className="span">778 Orders</p>
                        <span></span>
                        <p className="span">98%</p>
                      </div>
                    </div>
                    <p className="p" style={{ fontWeight: "600" }}>
                      ₽ {item.price}
                    </p>
                    <p>
                      Amount{" "}
                      <b style={{ fontWeight: 500 }}>{item.amount} USDT</b>
                    </p>
                    <p>
                      Limits{" "}
                      <b style={{ fontWeight: 500 }}>1,000.00-5,00.00 RUB</b>
                    </p>
                    <section>
                      <p>
                        <span></span> SPB
                      </p>
                      <button
                        className="p"
                        style={{
                          background:
                            page == "Sell"
                              ? "var(--red-gradient)"
                              : "var(--green-gradient)",
                        }}
                      >
                        {page}
                      </button>
                    </section>
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
