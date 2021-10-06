import React from 'react';
import { NavLink } from 'react-router-dom';


const NavLinks=props=>{
   return <li className="nav-item">
       <NavLink to="/login" exact href="#" className="nav-link">Login</NavLink>
       
    </li>

};

export default NavLinks;
