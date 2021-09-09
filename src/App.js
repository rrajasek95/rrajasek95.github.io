import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages

import './App.css';

// TODO: Setup base page
const Index = lazy(() => import('./pages/Index'));

function App() {
  return (<BrowserRouter>
    <Suspense fallback={<Main />}>
    <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </Suspense>
  </BrowserRouter>)
}

export default App;
