import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { loginSchema } from "./schema";
import UserContext from "../../providers/UserContext";
import ReusableInput from "../../components/reusableInput";
import "../../styles/loginStyles.css";
import logo from "../../assets/logo.png";

const Login = () => {
  const { userLogin, loadingLogin } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const submit = async (data) => {
    const success = await userLogin(data);
    if (success) reset();
  };

  return (
    <div className="body">
      <div className="login-container">
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <form onSubmit={handleSubmit(submit)}>
          <ReusableInput
            label="E-mail"
            className="input-field"
            type="email"
            {...register("email")}
          />
          <p className="error-message">{errors.email?.message}</p>
          <ReusableInput
            label="Senha"
            className="input-field"
            type="password"
            {...register("password")}
          />
          <p className="error-message">{errors.password?.message}</p>
          <button type="submit" className="button-container" disabled={loadingLogin}>
            {loadingLogin ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div>
          <RouterLink to="/register" className="button-container">
            REGISTRAR
          </RouterLink>
        </div>
        <RouterLink to="/forgot-password" className="button-forgot">
          Esqueceu sua senha?
        </RouterLink>
      </div>
    </div>
  );
};

export default Login;
