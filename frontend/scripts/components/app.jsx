import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';
import ProductIndex from "./products/product-index";

const App = () => (
    <div>
        <header>
            <div>
                <ProductIndex/>
            </div>
        </header>



        <Switch>

        </Switch>
    </div>
);

export default App;