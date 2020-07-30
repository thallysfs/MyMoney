import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'


export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={Dashboard} />
        <Route path='/billingCycles' component={BillingCycle} />
        {/* Se alguma rota digitada não estiver presente nessa lista, redireciona parta raiz */}
        <Redirect from='*' to='/' />
    </Router>
)
