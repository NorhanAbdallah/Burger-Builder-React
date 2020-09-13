import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import React from 'react'
const SideDrawer = (props) => {
    return (
        <div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}
export default SideDrawer;