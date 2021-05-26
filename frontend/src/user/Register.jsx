import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:3001/users';

const initialState ={
  user: { name: '', age: '', address:'', cpf:'', rg:''},
  list: [] 
};

export default class Register extends Component {
  
  state = {...initialState };
  
  componentWillMount(){
     axios(baseUrl).then(response => {
       this.setState({ list: response.data });
     });
  }

  save() {
    const user = this.state.user;
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    this.state.user.name = this.state.user.name.toUpperCase();
    this.state.user.address = this.state.user.address.toUpperCase();
    axios.post(url, user)
      .then(response => {
      const list = this.getUpdatedList(response.data);
      this.setState({ user: initialState.user, list });
    });
    
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id);
    if(add) list.unshift(user)
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderButtonBack(){
    return (
      <div className="button">
        <button type="button" class="btn btn-default" style={{width: "50px", 
          marginBottom: "20px"}}
          onClick={(e) => window.location.replace("http://localhost:3000/")}>
          <i className="fa fa-home"></i>
        </button>
      </div>
    )
  }

  renderForm() {
    let res = [' ', ' ']
    if (this.state.list.filter(user => user.cpf == this.state.user.cpf).length > 0) {
      res[0] = "CPF já cadastrado."
    } 
    if (this.state.list.filter(user => user.rg == this.state.user.rg).length > 0) {
      res[1] = "RG já cadastrado."
    }
    return (
      <div className="form">
        <div classname="row" style={{height: "500px", display: "flex", 
          flexDirection: "column", justifyContent: "space-around"}}>
          <h1>Cadastro de Usuários</h1>
          <div>
            <label>Nome</label>
            <input type="text" className="form-control"
              name="name"
              value={this.state.user.name}
              onChange={e => this.updateField(e)}
              placeholder="Digite o nome..."/>
          </div>
          <div>
            <label>Idade</label>
            <input type="text" className="form-control"
              name="age"
              value={this.state.user.age}
              onChange={e => this.updateField(e)}
              placeholder="Digite a idade..."/>
          </div>
          <div>
            <label>Endereço</label>
            <input type="text" className="form-control"
              name="address"
              value={this.state.user.address}
              onChange={e => this.updateField(e)}
              placeholder="Digite o endereço..."/>
          </div>
          <div>
            <label>CPF</label>
            <input type="text" className="form-control"
              name="cpf"
              value={this.state.user.cpf}
              onChange={e => this.updateField(e)}
              placeholder="Digite o cpf..."/>
              {res[0]}
          </div>
          <div>
            <label>RG</label>
            <input type="text" className="form-control"
              name="rg"
              value={this.state.user.rg}
              onChange={e => this.updateField(e)}
              placeholder="Digite o rg..."/>
              {res[1]}
          </div>
        </div>
        <hr />
      </div>
    )

  }

  load(user) {
    this.setState({ user });
  }

  validate() {
    if(isNaN(this.state.user.cpf) || this.state.user.cpf.indexOf(".") !== -1 
      || isNaN(this.state.user.rg) || this.state.user.rg.indexOf(".") !== -1){
      return this.renderButton();
    } else {
      if((this.state.user.name).length > 0 && (this.state.user.cpf).length === 11 
        && (this.state.user.age).length > 0 && (this.state.user.address).length > 0 
        && (this.state.user.rg).length > 4){
          if (this.state.list.filter(user => user.cpf == this.state.user.cpf).length > 0 
            || this.state.list.filter(user => user.rg == this.state.user.rg).length > 0) {
            return this.renderButton();
          } else{
            return this.renderButtonOk()
          }
      }else{
        return this.renderButton();
      }
    }
  }


  renderButtonOk() {
    return (
      <div className="form" >
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Link to="/">
              <button className="btn btn-primary ml-2"
                onClick={(e) => this.save(e)}>
                Salvar
              </button>
            </Link>
              <button className="btn btn-primary ml-2"
                onClick={(e) => window.location.replace("http://localhost:3000/")}>
                Cancelar
              </button>
          </div>
        </div>
      </div>
    )
  }

  renderButton() {
    return (
      <div className="form" >
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-secondary ml-2">
              Salvar
            </button>
            <button className="btn btn-primary ml-2"
              onClick={(e) => window.location.replace("http://localhost:3000/")}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <registro style={{display: "flex", width: "500px", height: "650px", marginLeft: "450px",
          flexDirection: "column", justifyContent: "space-between", marginTop: "10px"}}>
          {this.renderButtonBack()}
          {this.renderForm()}
          {this.validate()}
        </registro>
      </React.Fragment>
    )
  }
}