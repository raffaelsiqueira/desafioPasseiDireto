import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.state = {lista: [], nome:'', email:'', senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
  }

  componentDidMount(){
    $.ajax({
        url:"http://localhost:5000/gravadoras",
        dataType: 'json',
        crossDomain: true,
        success:function(res){
          this.setState({lista: res});
        }.bind(this)
      }
    );
  }

  enviaForm(evento){
    evento.preventDefault();
    
    $.ajax({
      url: 'http://localhost:5000/gravadoras',
      contentType: 'application/json',
      dataType:'json',
      type: 'post',
      data: JSON.stringify({nome_gravadora: this.state.nome}),
      success: function(res){
        this.setState({lista: res});
      }.bind(this)
    });
  }

  setNome(evento){
    this.setState({nome: evento.target.value});
  }

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
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Gravadoras</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Generos</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Artistas</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Discos</a></li>
                    
                </ul>
            </div>
        </div>

        <div id="main">
            <div className="header">
              <h1>Cadastro de Gravadoras</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <div className="pure-control-group">
                    <label htmlFor="nome">Nome</label> 
                    <input id="nome" type="text" name="nome" value={this.state.nome}  onChange={this.setNome}/>                  
                  </div>
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.lista.map(function(gravadora){
                        return (
                          <tr key={gravadora.id_gravadora}>
                            <td>{gravadora.nome_gravadora}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
              </div>             
            </div>
          </div> 
    </div>
    );
  }
}

export default App;