import react from "react";
import styles from "./Login.module.scss";
import { Input } from "../../Components/Input/Input";
import { CiLock, CiUser } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const [email, setEmail] = react.useState("");
  const [password, setPassword] = react.useState("");

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { email, password },
    })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Ошибка входа", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginContainer}>
        <h1 className={`header-30 ${styles.loginTitle}`}>Вход</h1>
        <p className="text-16">
          Подзаголовок, который раскрывает подробности и детали заголовка
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.loginForm}>
          <Input
            onChange={(value) => setEmail(value)}
            value={email}
            placeholder={
              <p>
                <CiUser /> Логин
              </p>
            }
          />
          <Input
            onChange={(value) => setPassword(value)}
            value={password}
            type="password"
            placeholder={
              <p>
                <CiLock /> Пароль
              </p>
            }
          />
          <Link to="/reset-pass" className="link">
            Забыли пароль?
          </Link>
          <button type="submit" className="green-button">
            Войти
          </button>
          <Link to="/signin" className="link">
            Нет аккаунта? <u>Зарегистрироваться</u>
          </Link>
        </form>
      </div>
    </div>
  );
};
