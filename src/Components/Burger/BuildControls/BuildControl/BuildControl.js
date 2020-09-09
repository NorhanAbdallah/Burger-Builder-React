import classes from './BuildControl.css'
import React from 'react'



const BuildControl = (props) => {
    return (

        <div className={classes.BuildControl}>
            <div className={classes.label}>{props.label}</div>

            <button
                className={classes.Less}
                onClick={props.removeIngredients}
                disabled={props.disabled} >Less</button>

            <button
                className={classes.More}
                onClick={props.addIngrediants}>More</button>
        </div>
    )
}
export default BuildControl; 