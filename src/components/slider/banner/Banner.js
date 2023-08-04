import React from 'react'
import styles from "./Banner.module.scss"
import imgTest from "../../../assets/p10.png"
import { Link } from 'react-router-dom'
import { bannerData } from './banner-data'


const Banner = () => {

  return (
    <div className={styles.banner}>
      {bannerData.map((banner, index) => {
        const { image, title, titleDesc, titleDescTwo, descMain, desc } = banner;
        return (
          <div className={styles["hero-banner-container"]}>
            <div>
              <p className={styles["small-text"]}>
                {title}
              </p>
              <h3>{titleDesc}</h3>
              <h4>{titleDescTwo}</h4>
              <div className={styles["hero-banner-image-section"]}>
                <img src={image} alt='' className={styles["hero-banner-image"]} />
              </div>

              <div className={styles[""]}>
                <Link to="/">
                  <button className='--btn --btn-danger'>
                    Shop NOW !
                  </button>
                </Link>

                <div className={styles["hero-banner-desc"]}>
                  <h5>{descMain}</h5>
                  <p>{desc}</p>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </div >
  )
}

export default Banner;
