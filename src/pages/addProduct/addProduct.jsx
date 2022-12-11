import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import './addProduct.css'

const AddProduct = () => {
  const navigate = useNavigate();
  const [prodName, setProdName] = useState('')
  const [category, setCategory] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

  const [errors, setErrors] = useState('');
  console.log(errors)
  
  const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(prodName, category, price, shortDesc, longDesc, images, quantity));
    if (errors.length <= 0) {
      const data = new FormData();
      data.append('productName', prodName);
      data.append('category', category);
      data.append('shortDesc', shortDesc);
      data.append('longDesc', longDesc);
      data.append('price', price);
      data.append('quantity', quantity);
      for (let i = 0; i < images.length; i++){
        data.append('images', images[i]);
      }

      const postProduct = async () => {
        try {
          const response = await axios.post('https://funix-asm3-server-production.up.railway.app/admin/new-product', data, {headers});
          if (response.status === 200) {
            // console.log(response.data.msg);
            alert(response.data.msg);
            // navigate('/products');
          }
        } catch (err) {
          console.log(err.response.data);
        }
      }

      postProduct();
    } else {
      return;
    }
    
  }

  const validate = (prodName, category, price, shortDesc, longDesc, images, quantity) => {
    const errors = [];
    if (!prodName) {
      errors.prodName = 'Please enter the name of product';
    }
    if (!category) {
      errors.category = 'Please enter the name of category';
    }
    if (!price) {
      errors.price = 'Please enter the price of product';
    }
    if (!shortDesc) {
      errors.shortDesc = 'Please enter the short description of product';
    }
    if (!longDesc) {
      errors.longDesc = 'Please enter the long description of product';
    }
    if (images.length < 5) {
      errors.images = 'Please select at least 5 images';
    }
    if (!quantity) {
      errors.quantity = 'Please enter product quantity';
    }
    return errors;
  }

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />
        {isAdmin === 'false' ? (
          <div>
            <h1>You must be Admin to see this page</h1>
          </div>
        ) : (
          <div className="addProduct">
            <h1>Add Product</h1>
            <div className="addProduct-form">
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="name">Product Name</label>
                  {errors.prodName && <span style={{ color: 'red'}}>*{errors.prodName}</span>}
                </div>
                <input type="text" name='name' placeholder='Enter Product Name' onChange={(e) => setProdName(e.target.value)} />
              </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="category">Category</label>
                  {errors.category && <span style={{ color: 'red'}}>*{errors.category}</span>}
                </div>
                <input type="text" name='addProduct-container' placeholder='Enter Category' onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="price">Price</label>
                  {errors.price && <span style={{ color: 'red'}}>*{errors.price}</span>}
                </div>
                <input type="text" multiple name='price' onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
              </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="short-description">Short Description</label>
                  {errors.shortDesc && <span style={{ color: 'red'}}>*{errors.shortDesc}</span>}
                </div>
                <textarea type="text" name='short-description' placeholder='Enter Short Description' rows={5} onChange={(e) => setShortDesc(e.target.value)}></textarea>
              </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="long-description">Long Description</label>
                  {errors.longDesc && <span style={{ color: 'red'}}>*{errors.longDesc}</span>}
                </div>
                <textarea type="text" name='long-description' placeholder='Enter Long Description' rows={10} onChange={(e) => setLongDesc(e.target.value)}></textarea>
              </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="iamges">Upload Images (5 images)</label>
                  {errors.images && <span style={{ color: 'red'}}>*{errors.images}</span>}
                </div>
                <input type="file" multiple name='images' onChange={(e) => setImages(e.target.files)} />
                </div>
              <div className="form-control">
                <div className="label-error">
                  <label htmlFor="quantity">Product Quantity</label>
                  {errors.quantity && <span style={{ color: 'red'}}>*{errors.quantity}</span>}
                </div>
                <input type="number" name='quantity' placeholder='Enter Product Quantity' onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="form-control">
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddProduct