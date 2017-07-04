import React from 'react';
import { Route, Redirect } from 'react-router-dom'

const ConditionalRoute = ({ condition, ...rest }) => {
    const resolvedCondition = condition instanceof Function ? condition() : condition;
    
    return !!resolvedCondition ? <Route {...rest} /> :
        <Redirect to='/' />;
}

export default ConditionalRoute;