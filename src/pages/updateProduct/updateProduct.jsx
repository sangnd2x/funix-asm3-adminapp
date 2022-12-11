import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prodId, setProdId] = useState(location.state.prodId);
  const [product, setProduct] = useState({});
  const [prodName, setProdName] = useState('')
  const [category, setCategory] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
  }

  const [touched, setTouched] = useState({
    name: false,
    category: false,
    price: false,
    shortDesc: false,
    longDesc: false,
    quantity: quantity
  });
  console.log(touched)

  // Featch product details
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`https://funix-asm3-server-production.up.railway.app/admin/edit-product/${prodId}`, {headers});
      console.log(response);
      setProduct(response.data);
    }

    fetchProduct();
  },[])

  const handleEdit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', prodName);
    data.append('category', category);
    data.append('price', price);
    data.append('shortDesc', shortDesc);
    data.append('longDesc', longDesc);
    data.append('quantity', quantity);

    const postEditProduct = async () => {
      const response = await axios.post(`https://funix-asm3-server-production.up.railway.app/admin/edit-product/${prodId}`, data, {headers});
      console.log(response);
      if (response.status === 200) {
        alert(response.data.msg);
        navigate('/products');
      }
    }

    postEditProduct();
  }

  return (
    <div>
      <Header />
      <div className="addProduct-container">
        <Sidebar />
        <div className="addProduct">
          <h1>Update Product</h1>
          <div className="addProduct-form">
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="name">Product Name</label>
                {/* {errors.prodName && <span style={{ color: 'red'}}>*{errors.prodName}</span>} */}
              </div>
              <input type="text" name='name' placeholder='Enter Product Name'
                defaultValue={product.name}
                onChange={(e) => setProdName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="category">Category</label>
                {/* {errors.category && <span style={{ color: 'red'}}>*{errors.category}</span>} */}
              </div>
              <input type="text" name='addProduct-container' placeholder='Enter Category'
                defaultValue={product.category}
                onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="price">Price</label>
                {/* {errors.price && <span style={{ color: 'red'}}>*{errors.price}</span>} */}
              </div>
              <input type="text" multiple name='price' placeholder='Enter price'
                defaultValue={product.price}
                onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="short-description">Short Description</label>
                {/* {errors.shortDesc && <span style={{ color: 'red'}}>*{errors.shortDesc}</span>} */}
              </div>
              <textarea type="text" name='short-description' placeholder='Enter Short Description' rows={5}
                defaultValue={product.short_desc}
                onChange={(e) => setShortDesc(e.target.value)}></textarea>
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="long-description">Long Description</label>
                {/* {errors.longDesc && <span style={{ color: 'red'}}>*{errors.longDesc}</span>} */}
              </div>
              <textarea type="text" name='long-description' placeholder='Enter Long Description' rows={10}
                defaultValue={product.long_desc}
                onChange={(e) => setLongDesc(e.target.value)}></textarea>
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="iamges">Upload Images (5 images)</label>
                {/* {errors.images && <span style={{ color: 'red'}}>*{errors.images}</span>} */}
              </div>
              <input type="file" multiple name='images'/>
            </div>
            <div className="form-control">
              <div className="label-error">
                <label htmlFor="quantity">Product Quantity</label>
                {/* {errors.prodName && <span style={{ color: 'red'}}>*{errors.prodName}</span>} */}
              </div>
              <input type="number" name='quantity' placeholder='Enter Product Quantity' step={1}
                defaultValue={product.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="form-control">
              <button onClick={handleEdit}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct;