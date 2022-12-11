import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/header'
import Sidebar from '../../components/sidebar/sidebar'
import axios from 'axios'
import './products.css'

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [searchProducts, setSearchProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searched, setSearched] = useState(false);
  const [load, setLoad] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));

  const headers = {
    'authorization': 'Bearer ' + localStorage.getItem('token')
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://funix-asm3-server-production.up.railway.app/admin/products', {headers})
      // console.log(response.data)
      setProducts(response.data)
    }

    fetchProducts();
  }, [searched, load])

  const search = (e) => {
    setSearchQuery(e.target.value)
    if (searchQuery) {
      setSearched(true)
    } else {
      setSearched(false)
    }

    const data = {
      query: searchQuery
    }

    const postSearch = async () => {
      const response = await axios.post('https://funix-asm3-server-production.up.railway.app/admin/search', data, {headers});
      console.log(response.data);
      setSearchProducts(response.data);
      setSearched(!searched)
    }

    postSearch();
  }

  const handleUpdate = (id) => {
    const prodId = id
    if (isAdmin === 'true') {
      navigate(`/edit-product/${prodId}`, { state: { prodId } });
    } else {
      return alert('You must be admin to use this functionality');
    }
  }

  const handleDelete = (id) => {
    const postDeleteProduct = async () => {
      const response = await axios.delete(`https://funix-asm3-server-production.up.railway.app/admin/delete-product/${id}`, {headers});
      console.log(response);
      setLoad(!load);
    }

    if (isAdmin === 'true') {
      if (window.confirm('Bạn có chắc là muốn xoá sản phẩm này?')) {
        postDeleteProduct();
      } else {
        return;
      }
    } else {
      return alert('You must be admin to use this functionality');
    }
  }

  return (
    <div>
      <Header />
      <div className="products-container">
        <Sidebar />
        <div className='products-container__main'>
          <div className="search">
            <h1>Products</h1>
            <input type="text" placeholder='Enter Product Name' onChange={(e) => search(e)}/>
          </div>
          <div className="products-container__main-table">
            {/* <div className="center-table"> */}
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {products && !searched ? products.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(product.price)}</td>
                      <td><img src={product.img1} width='60'/></td>
                      <td>{product.category}</td>
                      <td>
                        <button className='update-btn' onClick={() => handleUpdate(product._id)}>Update</button>
                        <button className='edit-btn' onClick={() => handleDelete(product._id)}>Delete</button>
                      </td>
                    </tr>
                  )) : searchProducts.map(product => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('vn-Vn', {style: 'currency', currency: 'VND'}).format(product.price)}</td>
                      <td><img src={product.img1} width='60'/></td>
                      <td>{product.category}</td>
                      <td>
                        <button className='update-btn' onClick={() => handleUpdate(product._id)}>Update</button>
                        <button className='edit-btn' onClick={() => handleDelete(product._id)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products