import React from 'react';
import logo from '../../Assets/Images/logo.png'
import classes from './Logo.css'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logo} alt="logo" />
        </div>
    )
}
export default Logo;