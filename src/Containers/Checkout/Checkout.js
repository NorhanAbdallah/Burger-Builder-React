import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null
    }

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        console.log(query.toString())
        for (const [key, value] of query.entries()) {
            ingredients[key] = +value;
            console.log(key, value);
        }
        console.log(ingredients)
        this.setState({ ingredients: ingredients })

    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }
    cancelHandler = () => {
        this.props.history.goBack();
    }
    continuHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = null
        if (this.state.ingredients) {
            summary = <CheckoutSummary
                ingredients={this.state.ingredients}
                cancelHandler={this.cancelHandler}
                continuHandler={this.continuHandler} />
        }
        return (
            <div>
                {summary}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;