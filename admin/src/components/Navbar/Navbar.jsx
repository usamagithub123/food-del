import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar' >
        <img className='logo' alt="" src={assets.admin2} width={380} height={280} />
        <img className="profile" src={assets.profile_image}  alt="" />
    </div>
  )
}

export default Navbar