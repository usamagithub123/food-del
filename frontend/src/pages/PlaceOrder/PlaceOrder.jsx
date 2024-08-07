import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    try {
      let orderItems = []
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] }
          orderItems.push(itemInfo)
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      }

      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } })
      if (response.data.success) {
        const { session_url } = response.data
        window.location.replace(session_url)
      } else {
        console.error("Backend responded with an error:", response.data)
        alert("Error: " + (response.data.message || "Unknown error"))
      }
    } catch (error) {
      console.error("Request failed:", error)
      alert("Request failed: " + (error.response?.data?.message || error.message || "Unknown error"))
    }
  }
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className='multi-fields'>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
        <div className='multi-fields'>
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
