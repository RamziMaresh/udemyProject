import React from 'react'
import styles from "./ProductItem.module.scss"
import Card from '../../card/Card'
import { Link } from 'react-router-dom'

const ProductItem = ({ product, grid, id, name, price, category, desc, imageURL }) => {

  const shortText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...")
      return shortenedText;
    }
    return text
  }
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>

      <Link to={`/productDetails/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortText(name, 18)}</h4>
        </div>

        {!grid && <p className={styles.desc}>{shortText(desc, 200)}</p>}

        <button className='--btn --btn-danger'>Add To Cart</button>
      </div>
    </Card>
  )
}

export default ProductItem
