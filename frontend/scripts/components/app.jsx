import React from 'react';
import Splash from './greeting/splash';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import ReportsContainer from "./reports/reportsContainer";

const App = () => (
    <div>
        <header>
        </header>
        <Splash />
        {/* <ReportsContainer/> */}
        <Switch>

        </Switch>
    </div>
);

export default App;
