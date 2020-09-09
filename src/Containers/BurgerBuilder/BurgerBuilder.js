import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIANTS_PRICE = {
    salad: .4,
    bacon: .5,
    cheese: .3,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngrediants = (type) => {

        const updatedCount = this.state.ingredients[type] + 1;
        const newIngrediants = { ...this.state.ingredients }
        newIngrediants[type] = updatedCount

        const newPrice = INGREDIANTS_PRICE[type] + this.state.totalPrice

        this.setState({
            ingredients: newIngrediants,
            totalPrice: newPrice
        })
    }

    removeIngredients = (type) => {
        if (this.state.ingredients[type] != 0 && this.state.totalPrice > 4) {
            const updatedIngredients = this.state.ingredients[type] - 1;
            const newIngrediants = { ...this.state.ingredients }
            newIngrediants[type] = updatedIngredients;

            const newPrice = this.state.totalPrice - INGREDIANTS_PRICE[type];
            this.setState({
                ingredients: newIngrediants,
                totalPrice: newPrice
            })
        }
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngrediants={this.addIngrediants}
                    removeIngredients={this.removeIngredients}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder