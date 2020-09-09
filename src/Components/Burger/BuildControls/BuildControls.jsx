import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
import React from 'react'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map(ctrls =>
                <BuildControl
                    key={ctrls.label}
                    label={ctrls.label}
                    addIngrediants={() => props.addIngrediants(ctrls.type)}
                    removeIngredients={() => props.removeIngredients(ctrls.type)}
                    disabled={props.disabled[ctrls.type]} />
            )}
        </div>
    )
}
export default BuildControls;