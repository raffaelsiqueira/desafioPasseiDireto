import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioGravadora extends Component {

    constructor() {
        super();
        this.state = {nome:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
      }

    enviaForm(evento){
        evento.preventDefault();
        
        $.ajax({
            url: 'http://localhost:5000/gravadoras',
            contentType: 'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({nome_gravadora: this.state.nome}),
            success: function(novaListagem){
                PubSub.publish('atualiza-lista-gravadoras', novaListagem);
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

class TabelaGravadoras extends Component {

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
                      this.props.lista.map(function(gravadora){
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
        );
    }
}

export default class GravadoraBox extends Component {

    constructor() {
        super();
        this.state = {lista: []};
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

        PubSub.subscribe('atualiza-lista-gravadoras', function(topico, novaLista){
            this.setState({lista: novaLista});
        }.bind(this));
      }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de gravadoras</h1>
                </div>
                <div className="content" id="content">
                    <FormularioGravadora />
                    <TabelaGravadoras lista={this.state.lista}/>
                </div>
                
            </div>
        );
    }
}