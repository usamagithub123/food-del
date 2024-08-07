import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';


const FoodItem = ({id,name,price,description,image,url}) => {
    //add to cart

    const {cartItems,addToCart,removeFromCart}=useContext(StoreContext)

    const imageUrl = `${url || 'http://localhost:4000'}/images/${image}`;
    console.log('Constructed Image URL:', imageUrl);
  return (
    <div className='food-item'>
    <div className="food-item-img-container">
    <img className='food-item-image' src={imageUrl} alt={name} onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'path/to/placeholder/image.png'; // Fallback image if needed
        }} />
        {!cartItems[id] ? (
            <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
        ) : (
            <div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div> // This div seems unnecessary. You might want to remove it.
        )}
    </div>
    <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
            {description}
        </p>
        <p className="food-item-price">${price}</p>
    </div>
</div>

  )
}

export default FoodItem