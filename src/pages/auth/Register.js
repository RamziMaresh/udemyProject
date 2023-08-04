import { React, useState } from 'react'
import styles from "../auth/Auth.module.scss"
import imgRegister from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/Config"
import Loader from "../../components/loader/Loader"

//Aleart notifi
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  //On submit 
  const registerUser = (e) => {
    e.preventDefault()
    if (password !== cPassword) {
      toast.error("Password not match !")
    }
    setIsLoading(true)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        //console.log(user)
        toast.success("Registration Successfully...")
        setIsLoading(false)
        navigate("/login")
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });

  };

  return (
    <>
      {isLoading && <Loader />}

      <div>
        <section className={`container ${styles.auth}`}>
          <Card>
            <div className={styles.form}>
              <h2>Register</h2>

              <form onSubmit={registerUser}>
                <input type='text'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input type='password'
                  placeholder='Password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type='password'
                  placeholder='Re-enter Password'
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <button
                  className='--btn --btn-primary --btn-block'
                  type='submit'
                >
                  Register
                </button>
              </form>

              <span className={styles.register}>
                <p>Already Have an accout?&nbsp;</p>
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Card>

          < div className={styles.img}>
            <img src={imgRegister} alt='Register' width="400" />
          </div>
        </section>
      </div>
    </>
  )
}
export default Register
