import React from 'react';

export default () => (
  <React.Fragment>
    <div style={{display: "flex", width: "500px", height: "200px", marginLeft: "450px",
          flexDirection: "column", justifyContent: "space-between", marginTop: "10px"}}>
      <button type="button" class="btn btn-default"
        style={{width: "50px"}}
        onClick={(e) => window.location.replace("http://localhost:3000/")}>
        <i className="fa fa-home"></i>
      </button>
      <aside className="menu-area" >
        <h1>ERRO!</h1>
        Está perdido, meu caro?
        Você chegou no lugar errado ou talvez na hora errada.
        Essa página (ainda) não existe.
        Tente outra.
      </aside>
    </div>
  </React.Fragment>
);