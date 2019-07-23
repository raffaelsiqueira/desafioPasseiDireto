import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router';

class App extends Component {

  render() {
    return (
      
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
        </a>

        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Catálogo</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                    <li className="pure-menu-item"><Link to="/gravadora" className="pure-menu-link">Gravadoras</Link></li>
                    <li className="pure-menu-item"><Link to="/genero" className="pure-menu-link">Generos</Link></li>
                    <li className="pure-menu-item"><Link to="/artista" className="pure-menu-link">Artistas</Link></li>
                    <li className="pure-menu-item"><Link to="/disco" className="pure-menu-link">Discos</Link></li>
                    
                </ul>
            </div>
        </div>

        <div id="main">
            {this.props.children}
        </div> 
    </div>
    );
  }
}

export default App;