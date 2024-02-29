import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../share/reducers/auth.reducer";
import { IoCreateOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header() {
  const { token, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrap}>
          <Link to="/" className={styles.logo}>Logo</Link>
          <div className={`d-flex gap-4 ` + styles.links}>
            <Link to="/">Home</Link>
            {!token && token === "" && (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}

            {token && token !== "" && (
              <div className={styles.userInfo}>
                <p>
                  <FaUser /> {username}
                </p>
                <Link to="/create-post/false" className={styles.edit}>
                  <IoCreateOutline />
                </Link>
                <p className={styles.logout} onClick={() => dispatch(logout())}>
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
