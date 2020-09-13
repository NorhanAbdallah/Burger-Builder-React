import React from 'react'
import Aux from '../../../hoc/Aux'


const OrderSummary = (props) => {
    const orderSummary = Object.keys(props.ingredients)
        .map(igKey => { return <li key={igKey}><span style={{ textTransform: 'capitalize' }}></span>{igKey}: {props.ingredients[igKey]}</li> })

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {orderSummary}
            </ul>
        </Aux>
    )
}
export default OrderSummary;