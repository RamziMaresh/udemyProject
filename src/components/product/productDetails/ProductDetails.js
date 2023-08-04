import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/Config"
import { toast } from 'react-toastify';
import styles from "./ProductDetails.module.scss"
import { AiOutlineRollback } from "react-icons/ai"
import spinnerImg from "../../../assets/spinner.jpg"

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("docs Data", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setProduct(obj)
    } else {
      toast.error("Product Not Found...")
    }
  }

  useEffect(() => {
    getProduct();
  }, []);


  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <hr className={styles.line}></hr>
        <Link className={styles.linkBack} to="/#products" style={{color:"#ad1d3a"}}>
          Back To Products ...
          <AiOutlineRollback color='#ad1d3a' size={20} />
        </Link>

        {product === null ? (
          <img src={spinnerImg} alt='Loading...'
            style={{ width: "50px" }}
            className="--center-all"
          />) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>

              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>

                <p>
                  <b>SKU</b> {product.id}
                </p>

                <p>
                  <b>Brand</b> {product.brand}
                </p>

                <div className={styles.count}>
                  <button className='--btn'>-</button>
                  <p><b>1</b></p>
                  <button className='--btn'>+</button>
                </div>
                <button className='--btn --btn-danger'>ADD TO CART</button>

              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ProductDetails
