import React, { useEffect, useState } from 'react'
import styles from "./ProductFilter.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice'
import { FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE } from '../../../redux/slice/filterSlice'


const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);

  // Price Filter 
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)

  //
  const dispatch = useDispatch();
  //
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];
  //
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand))
  ];

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand: brand }))
  }, [dispatch, products, brand]);
  //
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }))
  }, [dispatch, products, price]);


  //
  const filterProducts = (cat) => {
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }))
  }

  //
  const clearFilter = () => {
    setCategory("All")
    setBrand("All")
    setPrice(maxPrice)
  }

  //Start
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      {/*Categories*/}
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button key={index}
              className={`$(category)` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
              type='button'>
              {cat}
            </button>
          )
        })}
      </div>

      {/*Brands*/}
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} className=''>{brand}</option>
            )
          })}
        </select>
      </div>

      {/*Price*/}
      <h4>Price</h4>
      <p>{`$${price}`}</p>
      <div className={styles.price}>
        <input type='range' value={price} onChange={(e) => setPrice(e.target.value)} min={minPrice} max={maxPrice}></input>
      </div>
      <br />

      <button className='--btn --btn-danger' onClick={clearFilter}>Clear filter</button>
    </div>
  )
}

export default ProductFilter
