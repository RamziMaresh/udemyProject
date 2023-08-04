import { React, useState } from 'react'
import styles from "../auth/Auth.module.scss"
import imgReset from "../../assets/forgot.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card';
//
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/Config"
//
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
//

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const resetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success("CHECK YOUR EMAIL FOR RECOVERY LINK")
        navigate("/login")

      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });

  }

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <section className={`container ${styles.auth}`}>
          < div className={styles.img}>
            <img src={imgReset} alt='Reset Password' width="400" />
          </div>

          <Card>
            <div className={styles.form}>
              <h2>Reset Password</h2>

              <form onSubmit={resetPassword}>
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className='--btn --btn-primary --btn-block'
                  type='submit'
                >
                  Reset Password
                </button>
                <div className={styles.links}>
                  <p>
                    <Link to="/login">Login</Link>
                  </p>
                  <p>
                    <Link to="/Register">Register</Link>
                  </p>
                </div>
              </form>

            </div>
          </Card>
        </section>
      </div>
    </>
  )
}

export default Reset
