import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link, useLocation } from 'react-router-dom'
import decode from 'jwt-decode';

import LOCAL_STORAGE_KEYS from '../../constants/localStorageKeys';

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE)));
  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      const isTokenExpired = decodedToken.exp * 1000 < new Date().getTime()
      if (isTokenExpired) logout()
    }
    setUser(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE)));
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null)
  }
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {!user ? (
            <>
              <li className="nav-item">
                <a href="auth" className="nav-link">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a href="login" className="nav-link">
                  Login
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Header;
