import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import * as serviceWorker from './serviceWorker';
import GravadoraBox from './Gravadora';
import GeneroBox from './Genero';
import ArtistaBox from './Artista';
import DiscoBox from './Disco';
import Home from './Home';

ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/gravadora" component={GravadoraBox}/>
            <Route path="/genero" component={GeneroBox}/>
            <Route path="/artista" component={ArtistaBox}/>
            <Route path="/disco" component={DiscoBox}/>
        </Route>
    </Router>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();