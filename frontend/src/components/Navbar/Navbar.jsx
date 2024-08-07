import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { motion } from 'framer-motion';

const NavMenu = [
  { id: 1, title: "home", path: "/", delay: 0.1 },
  { id: 2, title: "menu", path: "#explore-menu", delay: 0.2 },
  { id: 3, title: "mobile-app", path: "#app-download", delay: 0.3 },
  { id: 4, title: "contact us", path: "#footer", delay: 0.4 }
];

const SlideDown = (delay) => ({
  initial: { y: "-100%", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, delay: delay } }
});

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount ,token, setToken } = useContext(StoreContext);
  const navigate= useNavigate();
  const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")

  }

  return (
    <div className='navbar'>
      <motion.div {...SlideDown(0)}>
        <Link to='/'><img src={assets.logo1} alt="Logo" className='logo' /></Link>
      </motion.div>
      <ul className="navbar-menu">
        {NavMenu.map((item) => (
          <motion.div key={item.id} {...SlideDown(item.delay)}>
            {item.path.startsWith('#') ? (
              <a href={item.path} onClick={() => setMenu(item.title)} className={menu === item.title ? "active" : ""}>{item.title}</a>
            ) : (
              <Link to={item.path} onClick={() => setMenu(item.title)} className={menu === item.title ? "active" : ""}>{item.title}</Link>
            )}
          </motion.div>
        ))}
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket1} alt="Basket" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token?
         <button onClick={() => setShowLogin(true)}>sign in</button> :
         <div className='navbar-profile' >
         <img src={assets.profile_icon} alt="" />
         <ul className="nav-profile-dropdown">
          <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          
         </ul>
         </div> 
      }
 
      </div>
    </div>
  );
}

export default Navbar;
