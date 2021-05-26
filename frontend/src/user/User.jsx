import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/users';

const initialState ={
  user: { name: '', age: '', address:'', cpf:'', rg:''},
  list: [] 
};

export default class User extends Component {
  
  state = {...initialState };

  componentWillMount(){
     axios(baseUrl).then(response => {
       this.setState({ list: response.data });
     });
  }

  renderButton(){
    return (
      <button type="button" class="btn btn-default" style={{width: "50px", marginTop: "10px"}}
        onClick={(e) => window.location.replace("http://localhost:3000/")}>
        <i className="fa fa-home"></i>
      </button>
    )
  }

  renderForm() {
    return (
      <form className="form" method="GET" action="users"
        style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <input type="text" name="search" 
            placeholder="Entre com a informação aqui..." style={{width: "700px"}}/>
          <button type="submit" class="btn btn-default">
            <i className="fa fa-search"></i>
          </button>
          <select name="item" class="btn btn-default mr-3" style={{width: "150px"}}>
            <option value="id">ID</option>
            <option value="name">Nome</option>
            <option value="age">Idade</option>
            <option value="address">Endereço</option>
            <option value="cpf">CPF</option>
            <option value="rg">RG</option>
          </select> 
      </form>
    )

  }

  renderTable(par = 0) {
    if(window.location.href == "http://localhost:3000/users" && par != 0){
      return (<h1>NONE</h1>)
    } else {
      return (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Endereço</th>
              <th>CPF</th>
              <th>RG</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      )
    }
  }
  
  renderRows() {
    function dataBase(user){
      return (
      <tr key={user.id}>   
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.age}</td>
        <td>{user.address}</td>
        <td>{user.cpf}</td>
        <td>{user.rg}</td>
      </tr>
    )}
    let params = window.location.search.substring(1).split('&');

    let paramArray = {};
    
    for(let i=0; i<params.length; i++) {
        let param = params[i].split('=');
        paramArray[param[0]] = param[1]
    }

    if (paramArray['item'] === 'id'){
      return this.state.list.filter(user => user.id == paramArray['search']).map(user => dataBase(user))
    } else if (paramArray['item'] === 'name'){
      return this.state.list.filter(user => user.name.includes((paramArray['search']).toUpperCase())).map(user => dataBase(user))
    } else if (paramArray['item'] === 'age'){
      return this.state.list.filter(user => user.age == paramArray['search']).map(user => dataBase(user))
    } else if (paramArray['item'] === 'address'){
      return this.state.list.filter(user => user.address.includes((paramArray['search']).toUpperCase())).map(user => dataBase(user))
    } else if (paramArray['item'] === 'cpf'){
      return this.state.list.filter(user => user.cpf == paramArray['search']).map(user => dataBase(user))
    } else if (paramArray['item'] === 'rg'){
      return this.state.list.filter(user => user.rg == paramArray['search']).map(user => dataBase(user))
    } else {
      return this.renderTable(1);
    }
  }

  render() {
    return (
      <React.Fragment>
        <registro style={{display: "flex", height: "300px", marginLeft: "200px",
          marginRight: "200px", flexDirection: "column", justifyContent: "space-between"}}>
        {this.renderButton()}
        <h1>Buscar Usuário</h1>
        {this.renderForm()}
        {this.renderTable()}
        </registro>
      </React.Fragment>
    )
  }
}