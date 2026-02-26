import React from 'react'
const CartItem = (props) => {
    const { title, price, qty, img, id } = props.product
    const {
        product,
        onIncreaseQuantity,
        onDecreaseQuantity,
        onDeleteQuantity
    } = props
    return(
        <div className='Cart-item'>
            <div className='left-block '>
                <img style={styles.image} src={product.img}/>
            </div>
            <div className='right-block '>
                <div style={ {fontSize:17}}>{title}</div>
                <div style={ {color:'black'}}>$ {price}</div>
                <div style={ {fontSize:20,color:'black'}}>Quantity : {qty}</div>
            <div className='cart-item-actions'>
                {/*Buttons*/}
                <img  
                alt="decrease" 
                className='action-icons' 
                src='https://cdn-icons-png.flaticon.com/128/1828/1828899.png'
                onClick={()=>onDecreaseQuantity(product)}
                />
                <img 
                 alt='incresae'
                 className='action-icons' 
                 src='https://cdn-icons-png.flaticon.com/128/1828/1828919.png' 
                 onClick={()=> onIncreaseQuantity(product)}
                 />
                <img 
                alt='delete'
                className='action-icons'
                src='https://cdn-icons-png.flaticon.com/128/7709/7709786.png'
                onClick={()=>onDeleteQuantity(product.id)}
                />
            </div>
            </div>
        </div>
    );
}
const styles ={
    image :{
        height: 150,
        width : 150,
        borderRadius:4,
    }
}
export default CartItem;
