import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../share/reducers/auth.reducer";
import styles from "./Main.module.css";
function Main({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.child}>{children}</div>
      <Footer />
    </div>
  );
}

export const withLayout = (Component) =>
  function wLC(props) {
    return (
      <Main>
        <Component {...props} />
      </Main>
    );
  };
