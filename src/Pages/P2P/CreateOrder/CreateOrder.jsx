import React, { useState } from "react";
import styles from "./CreateOrder.module.scss";
import bg from "../../../assets/images/Group 756.png";
import { NumericFormat } from "react-number-format";
import { IoCard } from "react-icons/io5";
import axios from "axios";

export const CreateOrder = () => {
  const [page, setPage] = useState("BUY");
  const [currency, setCurrency] = useState("RUB");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios(process.env.REACT_APP_BASE_URL + "/api/p2p/offers/create", {
      method: "POST",
      data: {
        type: page,
        amount: Number(e.target.amount.value),
        currency,
        price: Number(e.target.price.value),
        paymentMethodIds: [],
      },

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.createOrder}>
      <img src={bg} className="background" alt="" />
      <div className={styles.createOrder_top}>
        <button
          className="p"
          onClick={() => setPage("BUY")}
          style={
            page === "BUY"
              ? { color: "#000", borderBottom: "2px solid #215E04" }
              : { color: "#2A2E2B70" }
          }
        >
          Хочу купить
        </button>
        <button
          className="p"
          onClick={() => setPage("SELL")}
          style={
            page === "SELL"
              ? { color: "#000", borderBottom: "2px solid #215E04" }
              : { color: "#2A2E2B70" }
          }
        >
          Хочу продать
        </button>
      </div>

      <form className={styles.createOrder_body} onSubmit={handleSubmit}>
        <div className={styles.createOrder_left}>
          <label>
            <p className="p">Криптовалюта</p>
            <select className={styles.createOrder_select} name="crypto" id="">
              <option value="usdt">USDT</option>
            </select>
          </label>
          <label>
            <p className="p">Сумма</p>
            <NumericFormat
              className="span"
              name="amount"
              thousandSeparator={true}
              fixedDecimalScale={true}
              placeholder="5-10000"
              min={5}
              max={10000}
              allowNegative={false}
              allowLeadingZeros={false}
              allowEmptyFormatting={false}
            ></NumericFormat>
          </label>
          <label>
            <p className="p">Срок оплаты</p>
            <select className={styles.createOrder_select} name="time" id="">
              <option value="15">15 мин.</option>
            </select>
          </label>
          <label>
            <p className="p">Способ оплаты </p>
            <div className={styles.createOrder_payment}>
              <IoCard />
              <section>
                <span className="span">Local Card</span>
                <span className="span">**** ФИО</span>
              </section>
            </div>
          </label>
        </div>
        <div className={styles.createOrder_left}>
          <label>
            <p className="p">Фиат</p>
            <select
              className={styles.createOrder_select}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              name="currency"
              id=""
            >
              <option value="usdt">RUB</option>
            </select>
          </label>
          <label>
            <p className="p">Торговая цена</p>
            <NumericFormat
              className="span"
              thousandSeparator={true}
              name="price"
              fixedDecimalScale={true}
              placeholder="5-10000"
              min={5}
              max={10000}
              allowNegative={false}
              allowLeadingZeros={false}
              allowEmptyFormatting={false}
            ></NumericFormat>
          </label>
          <label>
            <p className="p">Лимит заказов</p>
            <NumericFormat
              className="span"
              thousandSeparator={true}
              fixedDecimalScale={true}
              min={5}
              name="limit"
              max={100}
              allowNegative={false}
              allowLeadingZeros={false}
              allowEmptyFormatting={false}
            ></NumericFormat>
          </label>
          <button
            className="green-button"
            style={{ height: "45px", boxShadow: "none" }}
          >
            Объявить
          </button>
        </div>
      </form>
    </div>
  );
};
