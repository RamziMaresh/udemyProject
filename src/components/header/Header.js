import React from 'react'
import styles from "../header/Header.module.scss"
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaHistory, FaUserCircle } from "react-icons/fa";
import { BiHomeAlt2, BiPhoneCall } from "react-icons/bi";
import { FiLogIn } from "react-icons/fi";

//import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useState } from 'react';
//
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Config"
import { toast } from 'react-toastify';
//
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
//set Active user
import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice';

//hidden links part
import ShowOnLogin from "../../components/hiddenLinks/hiddenLinks"
import { ShowOnLogout } from '../../components/hiddenLinks/hiddenLinks';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Ramzi</span>
      </h2>
    </Link>
  </div>
)

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      <FaShoppingCart size={20} color='#ad1d3a' />
      <p>0</p>
    </Link>
  </span>
)

const activeLink = ({ isActive }) =>
  (isActive ? `${styles.active}` : "")

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  //
  const dispatch = useDispatch()

  //Display user name when login
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user)
        //const uid = user.uid;
        //console.log(user.displayName)

        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
          setDisplayName(uName)
        } else {
          setDisplayName(user.displayName)
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid
          })
        )
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };

  const hideMenu = () => {
    setShowMenu(false)
  }

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully...")
      navigate("/")
    }).catch((error) => {
      toast.error(error.message)
    });
  }

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav className={showMenu ? `${styles["show-nav"]}`
          : `${styles["hide-nav"]}`}
        >

          <div className={showMenu ? `${styles["nav-wrapper"]} 
          ${styles["show-nav-wrapper"]}`
            : `${styles["nav-wrapper"]}`
          }
            onClick={hideMenu}
          >
          </div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes
                size={22}
                color='#ad1d3a'
                onClick={hideMenu}
              />
            </li>

            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>

            <li>
              <NavLink to="/" className={activeLink}
              >
                <BiHomeAlt2 color='#ad1d3a' size={15} />&nbsp;
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={activeLink}>
                <BiPhoneCall color='#ad1d3a' size={15} />&nbsp;
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div
            className={styles["header-right"]}
            onClick={hideMenu}>
            <span className={styles.links}>

              <ShowOnLogout>
                <NavLink
                  to="/login"
                  className={activeLink}
                >
                  <FiLogIn color='#ad1d3a' size={15} />&nbsp;Login/Register
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href='#home' style={{
                  fontWeight: "bold"
                }}>
                  <FaUserCircle size={16} style={{
                    color: "#ad1d3a"
                  }} />
                  &nbsp;Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogin>

                <NavLink
                  to="/order-history"
                  className={activeLink}
                >
                  <FaHistory color='#ad1d3a' size={15} />&nbsp;My Orders
                </NavLink>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/"
                  onClick={logoutUser}
                  className={activeLink}
                >
                  <FaHistory color='#ad1d3a' size={15} />&nbsp;Logout
                </NavLink>
              </ShowOnLogin>

            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          < BsThreeDotsVertical size={28} onClick={toggleMenu} />

        </div>
      </div >
    </header >
  )
}

export default Header
