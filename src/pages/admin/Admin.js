import React from 'react'
import styles from "./Admin.module.scss"
import { Route, Routes } from 'react-router-dom'
import Home from "../../components/admin/home/Home"
import Navbar from "../../components/admin/navbar/Navbar"
import ViewProducts from "../../components/admin/viewProducts/ViewProducts"
import Orders from "../../components/admin/orders/Orders"
import AddProducts from "../../components/admin/addProducts/addProducts"
import AddProductsOffers from "../../components/admin/offers/addProductOffers"
import HeroBannel from '../../components/admin/heroBannel/HeroBannel'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />

      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='viewProducts' element={<ViewProducts />} />
          <Route path='orders' element={<Orders />} />
          <Route path='addProducts/:id' element={<AddProducts />} />
          <Route path='offers/:id' element={<AddProductsOffers />} />
          <Route path='heroBannel' element={<HeroBannel />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin

