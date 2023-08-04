import { React, useState } from 'react'
import styles from "../auth/Auth.module.scss"
import imgLogin from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import Card from '../../components/card/Card';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Config"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/loader/Loader"
//google signin
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()
    setIsLoading(true)
    //console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        toast.success("Login Successfully...")
        setIsLoading(false)
        navigate("/")



      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });
  }

  // Google Sign in 
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //const user = result.user;
        toast.success("Login Successful")
        navigate("/")


      }).catch((error) => {
        // Handle Errors here.
        toast.error(error.message)
        //setIsLoading(false)
      });

  }


  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        < div className={styles.img}>
          <img src={imgLogin} alt='Login' width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <input
                type='text'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />.
              <button
                className='--btn --btn-primary --btn-block'
                type='submit'
              >
                Login
              </button>

              <div className={styles.links}>
                <Link to="/reset" >
                  Reset Password ?
                </Link>
              </div>

              <p>
                -- or --
              </p>
            </form>

            <button
              className='--btn --btn-danger --btn-block'
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" /> &nbsp; Login With Google
            </button>

            <span className={styles.register}>
              <p>Don't Have an accout?&nbsp;</p>
              <Link to="/register"> Register</Link>
            </span>

          </div>
        </Card>
      </section>
    </>
  )
}

export default Login
