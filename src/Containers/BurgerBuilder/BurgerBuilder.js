import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import axios from '../../axios'
import Spinner from '../../Components/UI/Spinner/Spinner'

const INGREDIANTS_PRICE = {
    salad: .4,
    bacon: .5,
    cheese: .3,
    meat: 1
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        Purchasable: false,
        Purchasing: false,
        loading: false
    }


    updatePurchaseState = (ingredients) => {
        const ing = { ...ingredients };

        const sum = Object.values(ing).reduce((sum, elm) => {
            return sum + elm;
        }, 0)

        this.setState({
            Purchasable: sum > 0
        })
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
        this.updatePurchaseState(newIngrediants);
    }

    removeIngredients = (type) => {
        if (this.state.ingredients[type] !== 0 && this.state.totalPrice > 4) {
            const updatedIngredients = this.state.ingredients[type] - 1;
            const newIngrediants = { ...this.state.ingredients }
            newIngrediants[type] = updatedIngredients;

            const newPrice = this.state.totalPrice - INGREDIANTS_PRICE[type];
            this.setState({
                ingredients: newIngrediants,
                totalPrice: newPrice
            })
            this.updatePurchaseState(newIngrediants);
        }
    }

    purchasingHandler = () => {
        this.setState({
            Purchasing: true
        })
    }

    closeModalHandler = () => {
        this.setState({
            Purchasing: false
        })
    }

    continueModalHandler = () => {
        // this.setState({ loading: true })

        // let postData = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Nour',
        //         address: {
        //             street: "steert1",
        //             zipCode: '23121',
        //             country: 'Egypt'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fast'
        // }
        // axios.post('/orders.json', postData)
        //     .then(response => { this.setState({ loading: false, Purchasing: false }) })
        //     .catch(error => { this.setState({ loading: false, Purchasing: false }) })
        const queryParam = [];
        for (let i in this.state.ingredients) {
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParam.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    componentDidMount = () => {
        axios.get('https://burgerbuilder-496ea.firebaseio.com/ingeridents.json').then(res => {
            this.setState({
                ingredients: res.data
            })

        }).catch(err => { })
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>

                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        addIngrediants={this.addIngrediants}
                        removeIngredients={this.removeIngredients}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        Purchasable={this.state.Purchasable}
                        purchasingHandler={this.purchasingHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                close={this.closeModalHandler}
                continue={this.continueModalHandler}
                price={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.Purchasing}
                    close={this.closeModalHandler}>
                    {orderSummary}

                </Modal>
                {burger}

            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios) 