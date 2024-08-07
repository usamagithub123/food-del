import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo1} alt="" className='logo' />
            <p className='para' >Lorem ipsum dolor sit amet consecgni, qspernatur quod reiciendis natus voluptatibu. Odit et cum officiis minima, magnam amet totam quo molestias quod hic expedita modi repellat a totam dolore amet, suscipit nulla placeat hic necessitatibus, minus distinctio sapiente blanditiis mollitia vel autem enim doloribus architecto aliquid?</p>
            <div className="footer-social-icon">
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivary</li>
              <li>Privacy policy</li>
            </ul>
            </div>
            <div className="footer-content-right">
             <h2>GET IN TOUCH</h2>
             <ul>
              <li>+214238123313</li>
              <li>contact@tomato.com</li>
             </ul>
        </div>  
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 © Tomato.com-All Right Reserved</p>
    </div>
  )
}

export default Footer