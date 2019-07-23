import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioGenero extends Component {

    constructor() {
        super();
        this.state = {nome:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
      }

    enviaForm(evento){
        evento.preventDefault();
        
        $.ajax({
            url: 'http://localhost:5000/generos',
            contentType: 'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({nome_genero: this.state.nome}),
            success: function(novaListagem){
                PubSub.publish('atualiza-lista-generos', novaListagem);
                this.setState({nome: ''})
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

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                  
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             

              </div>  
        );
    }
}

class TabelaGeneros extends Component {

    render() {
        return(
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.lista.map(function(genero){
                        return (
                          <tr key={genero.id_genero}>
                            <td>{genero.nome_genero}</td>
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

export default class GeneroBox extends Component {

    constructor() {
        super();
        this.state = {lista: []};
      }

    componentDidMount(){
        $.ajax({
            url:"http://localhost:5000/generos",
            dataType: 'json',
            crossDomain: true,
            success:function(res){
              this.setState({lista: res});
            }.bind(this)
          }
        );

        PubSub.subscribe('atualiza-lista-generos', function(topico, novaLista){
            this.setState({lista: novaLista});
        }.bind(this));
      }

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de gêneros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioGenero/>
                    <TabelaGeneros lista={this.state.lista}/>
                </div>            
            </div> 
        );
    }
}