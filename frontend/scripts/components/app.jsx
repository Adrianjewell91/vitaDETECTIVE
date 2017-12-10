import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import ProductIndexContainer from "./products/product-index-container";

import ReportsContainer from "./reports/reportsContainer";

const App = () => (
    <div>
        <header>
        </header>

        <ReportsContainer/>
        <Switch>

        </Switch>
    </div>
);

export default App;
