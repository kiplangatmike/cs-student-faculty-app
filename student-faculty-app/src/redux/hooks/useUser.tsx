import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../authSlice"

const useUser = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const loginFn = (user: any) => {
    dispatch(login(user));
  };

  const logoutFn = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn,
    user,
    login: loginFn,
    logout: logoutFn,
  };
};

export default useUser;