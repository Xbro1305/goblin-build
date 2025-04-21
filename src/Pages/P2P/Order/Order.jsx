import React from "react";
import styles from "./Order.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { TbCopy } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";

export const Order = () => {
  return (
    <div className={styles.order}>
      <img src={bg} className="background" alt="" />
      <h1 className="h1 title">Pending Payment</h1>
      <div className={styles.order_content}>
        <div className={styles.order_content_main}>
          <div className={styles.order_content_top}>
            <p className="p">
              <span style={{ color: "#BE1600" }}>Sell</span> USDT
            </p>

            <button className="button green-button">Contact Buyer</button>
          </div>
          <div className={styles.order_content_item}>
            <section className={styles.order_content_item_section}>
              <span className="span">Amount</span>
              <p className="p" style={{ color: "#BE1600", fontWeight: "600" }}>
                1,500.00 RUB
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Price</span>
              <p className="p">85.12 RUB</p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Quantity</span>
              <p className="p">17.6222 USDT</p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Transaction Fees</span>
              <p className="p">0 USDT</p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Order No.</span>
              <p className="p">
                1909658797187162112
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("1909658797187162112");
                    }}
                  />
                </span>
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Order Time</span>
              <p className="p">2025-04-08 19:25:12</p>
            </section>
          </div>
          {/* <div className={styles.order_content_top}>
            <p className="p">Payment Method</p>
          </div>
          <div className={styles.order_content_item}>
            <section className={styles.order_content_item_section}>
              <span className="span">Name</span>
              <p className="p">
                ФИО пользователя
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("ФИО пользователя");
                    }}
                  />
                </span>
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Bank Account Number</span>
              <p className="p">
                Номер телефона
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("Номер телефона");
                    }}
                  />
                </span>
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Bank Branch</span>
              <p className="p">
                Bank Branch
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("Bank Branch");
                    }}
                  />
                </span>
              </p>
            </section>
            <section className={styles.order_content_item_section}>
              <span className="span">Bank Name</span>
              <p className="p">
                Bank Name
                <span>
                  <TbCopy
                    style={{ color: "#2A2E2B71", cursor: "pointer" }}
                    onClick={() => {
                      enqueueSnackbar("Скопировано", {
                        variant: "success",
                        autoHideDuration: 2000,
                      });
                      navigator.clipboard.writeText("Название банка");
                    }}
                  />
                </span>
              </p>
            </section>
          </div> */}
        </div>
      </div>
      <p className="p" style={{ borderBottom: "1px solid #9D9D9D" }}>
        Transaction Info
      </p>
      <button
        className="green-button"
        style={{
          width: "fit-content",
          padding: "7px 120px",
          fontWeight: "400",
          height: "auto",
          margin: "0 auto",
        }}
      >
        Release Now
      </button>
      <p className="span" style={{ textAlign: "center" }}>
        Encountered an Issue
      </p>
    </div>
  );
};
