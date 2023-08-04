import React, { useEffect, useState } from 'react'
import styles from "./product.module.scss"
import ProductFilter from './ProductFilter/ProductFilter'
import ProductList from './productList/ProductList'
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice';
import spinnerImg from "../../assets/spinner.jpg"
import { AiOutlineFilter } from "react-icons/ai"

const Product = () => {
  const { data, isLoading } = useFetchCollection("products")
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()

  // Filter side
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
    //
    dispatch(GET_PRICE_RANGE({
      products: data
    }))
  }, [dispatch, data])

  //
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
          {isLoading ? null : <ProductFilter />}
        </aside>

        <div className={styles.content}>
          {isLoading ?
            (<img
              src={spinnerImg} alt='Loading...'
              style={{ width: "50px" }}
              className="--center-all" />) : (
              <ProductList products={products}
              />
            )}
          <div className={styles.icon} onClick={toggleFilter}>
            < AiOutlineFilter size={20} color='#ad1d3a' />
            <p><b>{showFilter ? "Hide Filter" : "Show Filter"}</b></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
