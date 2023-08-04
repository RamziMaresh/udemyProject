import React from 'react'
import styles from "../footer/Footer.module.scss"

const date = new Date()
const year = date.getFullYear()

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {year} All Rights Reserved By eRamzi Company
    </div>
  )
}

export default Footer
