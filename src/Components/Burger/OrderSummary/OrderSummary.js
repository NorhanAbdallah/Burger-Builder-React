import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'


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
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.continue}>Continue</Button>
            <Button btnType="Danger" clicked={props.close}>Cancel</Button>
        </Aux>
    )
}
export default OrderSummary;