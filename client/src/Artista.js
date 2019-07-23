import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioArtista extends Component {

    constructor() {
        super();
        this.state = {nome:'', origem:'', id_genero: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setOrigem = this.setOrigem.bind(this);
        this.setIdGenero = this.setIdGenero.bind(this);
      }

    enviaForm(evento){
        evento.preventDefault();
        
        $.ajax({
            url: 'http://localhost:5000/artistas',
            contentType: 'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({nome_artista: this.state.nome, origem: this.state.origem, id_genero: this.state.idGenero}),
            success: function(novaListagem){
                PubSub.publish('atualiza-lista-artistas', novaListagem);
                this.setState({nome:'', origem:'', idGenero: ''})
            }.bind(this),
            error: function(res){
                if(res.status === 400){
                    new TratadorErros().publicaErros(res.responseJSON);
                }
            },
            beforeSend: function(){
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    setNome(evento){
        this.setState({nome: evento.target.value});
    }

    setOrigem(evento){
        this.setState({origem: evento.target.value});
    }

    setIdGenero(evento){
        this.setState({idGenero: evento.target.value});
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                  <InputCustomizado id="origem" type="text" name="origem" value={this.state.origem} onChange={this.setOrigem} label="Origem"/>
                  <div className="pure-control-group">
                    <label htmlFor="idGenero">Gênero</label> 
                        <select value={this.state.idGenero} name="idGenero" id="idGenero" onChange={this.setIdGenero}>
                            <option value="">Selecione o gênero</option>
                            {
                                this.props.generos.map(function(genero){
                                    return <option value={genero.id_genero}>{genero.nome_genero}</option>
                                })
                            }
                        </select>
                  </div>
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             

              </div>  
        );
    }
}

class TabelaArtistas extends Component {

    render() {
        return(
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Origem</th>
                      <th>Genero</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.lista.map(function(artista){
                        return (
                          <tr key={artista.id_artista}>
                            <td>{artista.nome_artista}</td>
                            <td>{artista.origem}</td>
                            <td>{artista.nome_genero}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
              </div>  
        );
    }
}

export default class ArtistaBox extends Component {

    constructor() {
        super();
        this.state = {lista: [], generos: []};
      }
    
      componentDidMount(){
        $.ajax({
            url:"http://localhost:5000/artistas",
            dataType: 'json',
            crossDomain: true,
            success:function(res){
              this.setState({lista: res});
            }.bind(this)
          }
        );

        $.ajax({
            url:"http://localhost:5000/generos",
            dataType: 'json',
            crossDomain: true,
            success:function(res){
              this.setState({generos: res});
            }.bind(this)
          }
        );

        PubSub.subscribe('atualiza-lista-artistas', function(topico, novaLista){
            this.setState({lista: novaLista});
        }.bind(this));
      }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de artistas</h1>
                </div>
                <div className="content" id="content">
                    <FormularioArtista generos={this.state.generos}/>
                    <TabelaArtistas lista={this.state.lista}/>
                </div>
                
            </div>
        );
    }
}