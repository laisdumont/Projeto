import React from 'react';

export default () => (
  <menu style={{display: "flex", width: "500px", height: "650px", marginLeft: "450px",
    flexDirection: "column", marginTop: "100px", textAlign: "center"}}>
    <h1>Seja bem-vindo!</h1>
    <div style={{display: "flex", height: "300px", width: "250px",
      flexDirection: "column", justifyContent: "space-between", margin: "100px"}}>
      <button className="btn btn-dark"
        onClick={(e) => window.location.replace("http://localhost:3000/register")}>
        Cadastrar Usuários
      </button>
      <button className="btn btn-dark"
        onClick={(e) => window.location.replace("http://localhost:3000/users")}>
        Buscar Usuário
      </button>
      <button className="btn btn-dark"
        onClick={(e) => window.location.replace("http://localhost:3000/delete")}>
        Excluir Usuário
      </button>
    </div>
  </menu>
);