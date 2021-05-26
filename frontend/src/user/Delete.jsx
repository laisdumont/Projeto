import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const initialState ={
  user: { name: '', email: ''},
  list: [] 
};

export default class UserProject extends Component {
  
  state = {...initialState };
  
  componentWillMount(){
     axios(baseUrl).then(response => {
       this.setState({ list: response.data });
     });
  }

  renderButton(){
    return (
      <button type="button" class="btn btn-default"
        style={{width: "50px", marginTop: "10px", marginBottom: "10px"}}
        onClick={(e) => window.location.replace("http://localhost:3000/")}>
        <i className="fa fa-home"></i>
      </button>
    ) 
  }

  renderForm() {
    return (
      <form className="form" method="GET" action="delete" style={{display: "flex",
       flexDirection: "row", justifyContent: "space-between"}}>
        <input type="text" name="search" className="form-control"
          style={{width: "450px"}}
          placeholder="Digite o CPF do usuário..."/>
        <button type="submit" class="btn btn-default"
          style={{width: "50px"}}>
          <i className="fa fa-search"></i>
        </button>
      </form>
    )
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(response => { 
      const list = this.getUpdatedList(user, false);  
      return this.setState({ list });
    });
  } 

  renderTable() {
    let params = window.location.search.substring(1).split('&');

    let paramArray = {};
    
    for(let i=0; i<params.length; i++) {
        let param = params[i].split('=');
        paramArray[param[0]] = param[1]   
    }  

    return this.state.list.filter(user => user.cpf == paramArray['search']).map(user => {
      return (
      <tr key={user.cpf}>
        <div style={{height: "200px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", marginTop: "50px", 
          backgroundColor: "silver"}}>
          <div style={{marginLeft: "10px", marginRight: "10px"}}>id: {user.id}</div>
          <div style={{display: "flex", justifyContent: "space-between",
            marginLeft: "10px", marginRight: "10px"}}>
            <tr>Nome: {user.name}</tr>
            <tr>Idade: {user.age}</tr>
          </div>
          <div style={{marginLeft: "10px", marginRight: "10px"}}>Endereço: {user.address}</div>
          <div style={{marginLeft: "10px", marginRight: "10px"}}>CPF: {user.cpf}</div>
          <div style={{marginLeft: "10px", marginRight: "10px"}}>RG: {user.rg}</div>
        </div>
        <div style={{display: "flex", width: "500px", justifyContent: "space-around",
          marginTop: "50px", backgroundColor: "white"}}>
          <button className="btn btn-danger ml-"
          onClick={() => this.remove(user)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </tr>
    )})
  }

  render() {
    return (
      <React.Fragment>
        <bt style={{display: "flex", width: "500px", height: "150px", 
            justifyContent: "space-between", marginLeft: "450px",
            flexDirection: "column"}}>
            {this.renderButton()}
          <registro style={{height: "100px", flexDirection: "column", 
            justifyContent: "space-between", marginTop: "10px"}}>
          <h1>Excluir Usuários</h1>
          {this.renderForm()}
          {this.renderTable()}
          </registro>
        </bt>
      </React.Fragment>
    )
  }
}