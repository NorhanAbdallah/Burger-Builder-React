import React from 'react'
import classes from './Layout.css'

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const layout = (props) => (
    <Aux>
        <SideDrawer />
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout