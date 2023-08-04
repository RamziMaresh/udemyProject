import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from "./addProducts.module.scss"
import { useState } from 'react';
import Card from "../../card/Card"
import Loader from "../../../components/loader/Loader"
//
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, db } from "../../../firebase/Config";
import { toast } from 'react-toastify';
import { collection, addDoc, Timestamp, doc, setDoc, } from "firebase/firestore";
//
import { selectProducts } from '../../../redux/slice/productSlice';


const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Electronic" },
  { id: 4, name: "Fashion" }
]

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  discount: 0,
  afterDisPrice: 0,
  category: "",
  brand: "",
  desc: "",
}


//  Start 
const AddProducts = () => {
  const { id } = useParams()

  const products = useSelector(selectProducts)
  const productEdit = products.find((item) => item.id ===
    id)
  console.log(productEdit);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id,
      { ...initialState },
      productEdit
    )
    return newState
  });
  // 1
  const [uploadProgress, setUploadProgress] = useState(0);
  // 2
  const [isLoading, setIsLoading] = useState(false);
  //3 
  const navigate = useNavigate()

  //
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);

    const storageRef = ref(storage, `eRamzi/ ${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress)
      },
      (error) => {
        //
        toast.error("Unuccessful error, Please Try again...")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL })
          toast.success("Image Uploaded Successfully. ")
        });
      }
    );
  }

  const addProduct = (e) => {
    e.preventDefault()
    //console.log(product)
    setIsLoading(true)


    try {
      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        discount: Number(product.discount),
        afterDisPrice: Number(product.afterDisPrice),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAT: Timestamp.now().toDate()
      });
      setIsLoading(false)
      setUploadProgress(0)
      setProduct({ ...initialState })

      toast.success("Products Uploaded Successfully.")
      navigate("/admin/viewProducts")

    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef)
    }
    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        discount: Number(product.discount),
        afterDisPrice: Number(product.afterDisPrice),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAT: productEdit.createdAT,
        editedAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      toast.success("Producr editted Successfully.")
      navigate("/admin/viewProducts")
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }



  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>

        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name :</label>
            <input type="text"
              placeholder='Product Name'
              value={product.name}
              name="name"
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product images :</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>

                  <div className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}


              <input type="file" placeholder='Product Image'
                accept='image/*' name='image' onChange={(e) => handleImageChange(e)} />

              {product.imageURL === "" ? null : (
                <input type='text'
                  // required
                  placeholder='Image URL'
                  name='imageURL'
                  value={product.imageURL}
                  disabled />
              )}

            </Card>

            <label>Product price:</label>
            <input type="number"
              placeholder='Product Price'
              value={product.price}
              name="price"
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product discount %</label>
            <input type="number"
              placeholder='Product Discount'
              value={product.discount}
              name="discount"
              required
              onChange={(e) => handleInputChange(e)}
            />


            <label>Product category:</label>
            <select required name='category'
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>-- Choose Product category --</option>

              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                )
              })}
            </select>

            <label>Product brand:</label>
            <input type="text"
              placeholder='Product Brand'
              value={product.brand}
              name="brand"
              required
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product description:</label>
            <textarea
              value={product.desc}
              type="text"
              placeholder='Product description'
              name='desc'
              required
              cols="30"
              rows="10"
              onChange={(e) => handleInputChange(e)}

            />

            <button className='--btn --btn-primary '>{detectForm(id, "Save Product", "Edit Product")}</button>

          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProducts
