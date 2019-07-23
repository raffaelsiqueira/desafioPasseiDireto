import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import InputTabela from './components/InputTabela';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioDisco extends Component {

    constructor() {
        super();
        this.state = {id_artista:'', nome:'', data_lancamento: '', id_gravadora:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setIdArtista = this.setIdArtista.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setDataLancamento = this.setDataLancamento.bind(this);
        this.setIdGravadora = this.setIdGravadora.bind(this);
      }

    enviaForm(evento){
        evento.preventDefault();
        
        $.ajax({
            url: 'http://localhost:5000/discos',
            contentType: 'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({id_artista: this.state.idArtista, nome_disco: this.state.nome, data_lancamento: this.state.data_lancamento, id_gravadora: this.state.idGravadora}),
            success: function(novaListagem){
                PubSub.publish('atualiza-lista-discos', novaListagem);
                this.setState({idArtista:'', nome:'', data_lancamento: '', idGravadora:''})
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

    setIdArtista(evento){
        this.setState({idArtista: evento.target.value});
    }
    
    setNome(evento){
        this.setState({nome: evento.target.value});
    }

    setDataLancamento(evento){
        this.setState({data_lancamento: evento.target.value});
    }

    setIdGravadora(evento){
        this.setState({idGravadora: evento.target.value});
    }

    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <div className="pure-control-group">
                <label htmlFor="idArtista">Artista</label> 
                    <select value={this.state.idArtista} name="idArtista" id="idArtista" onChange={this.setIdArtista}>
                        <option value="">Selecione o artista</option>
                        {
                            this.props.artistas.map(function(artista){
                                return <option value={artista.id_artista}>{artista.nome_artista}</option>
                            })
                        }
                    </select>
                </div>
                  <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
                  <InputCustomizado id="dataLancamento" type="date" name="dataLancamento" value={this.state.data_lancamento} onChange={this.setDataLancamento} label="Data de Lançamento"/>
                  <div className="pure-control-group">
                    <label htmlFor="idGravadora">Gravadora</label> 
                        <select value={this.state.idGravadora} name="idGravadora" id="idGravadora" onChange={this.setIdGravadora}>
                            <option value="">Selecione a gravadora</option>
                            {
                                this.props.gravadoras.map(function(gravadora){
                                    return <option value={gravadora.id_gravadora}>{gravadora.nome_gravadora}</option>
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

class FormularioBusca extends Component {

  constructor() {
    super();
    this.state = {nome: ''};
    this.buscaDiscos = this.buscaDiscos.bind(this);
  }

  buscaDiscos(evento){
    $.ajax({
      url:"http://localhost:5000/discos/" + evento.target.value,
      dataType: 'json',
      type: 'get',
      crossDomain: true,
      success:function(novaListagem){
        PubSub.publish('atualiza-lista-discos', novaListagem);
      }.bind(this)
    });
    this.setState({nome: evento.target.value})
  }

  render(){
    return(
      <div className="pure-form pure-form-aligned">
      <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
      <div className="pure-control-group">
      <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.buscaDiscos} label="Busca por nome"/>          
        </div>
      </form>             

    </div>  
    );
  }
}

class TabelaDiscos extends Component {

  constructor() {
    super();
    this.state = {editando: [], id_artista:'', nome:'', data_lancamento: '', id_gravadora:''};
    this.editaDisco = this.editaDisco.bind(this);
    this.setIdArtista = this.setIdArtista.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setDataLancamento = this.setDataLancamento.bind(this);
    this.setIdGravadora = this.setIdGravadora.bind(this);
  }

  estaEditando(id){
    return this.state.editando.includes(id);
  }

  editaDisco(id){
    $.ajax({
      url: 'http://localhost:5000/discos/' + id,
      contentType: 'application/json',
      dataType:'json',
      type: 'patch',
      data: JSON.stringify({id_artista: this.state.id_artista, nome_disco: this.state.nome, data_lancamento: this.state.data_lancamento, id_gravadora: this.state.id_gravadora}),
      success: function(novaListagem){
        var aux = this.state.editando;
        aux.splice(aux.indexOf(id), 1);
        this.setState({editando: aux, id_artista: '', nome_disco: '', data_lancamento: '', id_gravadora: ''});
        PubSub.publish('atualiza-lista-discos', novaListagem);
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

  deletaDisco(id){
      $.ajax({
        url:"http://localhost:5000/discos/" + id,
        dataType: 'json',
        type: 'delete',
        crossDomain: true,
        success:function(novaListagem){
          PubSub.publish('atualiza-lista-discos', novaListagem);
        }.bind(this)
      }
    );
  }

  

  setIdArtista(evento){
    this.setState({id_artista: evento.target.value});
  }

  setNome(evento){
      this.setState({nome: evento.target.value});
  }

  setDataLancamento(evento){
      this.setState({data_lancamento: evento.target.value});
  }

  setIdGravadora(evento){
      this.setState({id_gravadora: evento.target.value});
  }

    render() {
        return(
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Artista</th>
                      <th>Nome</th>
                      <th>Data de lançamento</th>
                      <th>Gravadora</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.lista.map(function(disco){
                        var data = new Date(disco.data_lancamento);
                        var dataFormatada = data.toLocaleDateString();  
                        return (
                          <tr key={disco.id_disco}>
                            <td>{!this.estaEditando(disco.id_disco) ? disco.nome_artista :<div className="pure-form pure-form-aligned">
                            <div className="pure-control-group">
                                <select value={this.state.id_artista} onChange={this.setIdArtista}>
                                <option value="">Selecione o artista</option>
                                {
                                    this.props.artistas.map(function(artista){
                                        return <option value={artista.id_artista}>{artista.nome_artista}</option>
                                    }.bind(this))
                                }
                            </select>
                            </div>
                            </div>}</td>
                            <td>{!this.estaEditando(disco.id_disco) ? disco.nome_disco : <InputTabela value={this.state.nome} onChange={this.setNome} />}</td>
                            <td>{!this.estaEditando(disco.id_disco) ? dataFormatada : <InputTabela value={this.state.data_lancamento} onChange={this.setDataLancamento} type="date"/>}</td>
                            <td>{!this.estaEditando(disco.id_disco) ? disco.nome_gravadora : 
                            <div className="pure-form pure-form-aligned">
                              <div className="pure-control-group">
                                <select value={this.state.id_gravadora} onChange={this.setIdGravadora}>
                                <option value="">Selecione a gravadora</option>
                                {
                                    this.props.gravadoras.map(function(gravadora){
                                        return <option value={gravadora.id_gravadora}>{gravadora.nome_gravadora}</option>
                                    })
                                }
                                </select>
                            </div>
                          </div>
                          }</td>
                            <td><i class={this.estaEditando(disco.id_disco) ? "fas fa-check" : "fas fa-edit"} onClick={() => {
                              if (!this.estaEditando(disco.id_disco)){
                                this.setState({id_artista: disco.id_artista, nome: disco.nome_disco, data_lancamento: new Date(disco.data_lancamento).toJSON().substring(0,10), id_gravadora: disco.id_gravadora, editando: this.state.editando.concat([disco.id_disco])});
                              }
                              else{
                                this.editaDisco(disco.id_disco);
                              }
                            }}></i></td>
                            <td><i class={this.estaEditando(disco.id_disco) ? "fas fa-undo-alt" : "fas fa-trash-alt"} onClick={() => {
                              if (!this.estaEditando(disco.id_disco)){
                                this.deletaDisco(disco.id_disco);
                              }
                              else{
                                var aux = this.state.editando;
                                aux.splice(aux.indexOf(disco.id_disco), 1);
                                this.setState({editando: aux});
                              }
                            }}></i></td>
                          </tr>
                        );
                      }.bind(this))
                    }
                  </tbody>
                </table> 
              </div>  
        );
    }
}

export default class DiscoBox extends Component {

    constructor() {
        super();
        this.state = {lista: [], gravadoras: [], artistas: []};
      }
    
      componentDidMount(){
        $.ajax({
            url:"http://localhost:5000/discos",
            dataType: 'json',
            crossDomain: true,
            success:function(res){  
              this.setState({lista: res});
            }.bind(this)
          }
        );

        $.ajax({
            url:"http://localhost:5000/gravadoras",
            dataType: 'json',
            crossDomain: true,
            success:function(res){
              this.setState({gravadoras: res});
            }.bind(this)
          }
        );

        $.ajax({
            url:"http://localhost:5000/artistas",
            dataType: 'json',
            crossDomain: true,
            success:function(res){
              this.setState({artistas: res});
            }.bind(this)
          }
        );

        PubSub.subscribe('atualiza-lista-discos', function(topico, novaLista){
            this.setState({lista: novaLista});
        }.bind(this));
      }

    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de discos</h1>
                </div>
                <div className="content" id="content">
                    <FormularioDisco gravadoras={this.state.gravadoras} artistas={this.state.artistas}/>
                    <FormularioBusca />
                    <TabelaDiscos lista={this.state.lista} gravadoras={this.state.gravadoras} artistas={this.state.artistas}/>
                </div>
                
            </div>
        );
    }
}