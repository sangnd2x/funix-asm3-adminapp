import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './header.css'

const Header = () => {
  const navigate = useNavigate();
  const [signedIn, setSignIn] = useState(localStorage.getItem('token') || '');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin')
    navigate('/signin');
  }

  return (
    <div className='header-container'>
      <div className='header-logo'>
        <span>BOUTIQUE</span>
      </div>
      {signedIn !== '' ? (
        <div className='header-buttons'>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className='header-buttons'></div>
      )}
    </div>
  )
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0Ijp7Iml0ZW1zIjpbXX0sIl9pZCI6IjYzOGRhYzlhNDVlYmI3MDJjZDhkY2YxZCIsImZ1bGxuYW1lIjoic2FuZyIsImVtYWlsIjoic2FuZzJ4QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkZVdJLm00bjJZaFQ5MDZlMVdRendRTzVPR1o5N3BjZTB5V1gwSFFiczN2T3g1WG5BWnRGTkciLCJwaG9uZSI6IjA5ODk4OTg5ODkiLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTY3MDQ5MDA5OH0.6M0us0T_YwxdGQgr38uXWzl5Nx_Dp0rBLjALcAB0tGY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJ0Ijp7Iml0ZW1zIjpbXX0sIl9pZCI6IjYzOGRhYzlhNDVlYmI3MDJjZDhkY2YxZCIsImZ1bGxuYW1lIjoic2FuZyIsImVtYWlsIjoic2FuZzJ4QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTIkZVdJLm00bjJZaFQ5MDZlMVdRendRTzVPR1o5N3BjZTB5V1gwSFFiczN2T3g1WG5BWnRGTkciLCJwaG9uZSI6IjA5ODk4OTg5ODkiLCJyb2xlIjoiYWRtaW4iLCJfX3YiOjAsImlhdCI6MTY3MDQ5MDA5OH0.6M0us0T_YwxdGQgr38uXWzl5Nx_Dp0rBLjALcAB0tGY

export default Header