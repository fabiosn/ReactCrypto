import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    }
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ loading: true });
    axios.get("/api")
      .then(response => {
        console.log(response.data);
        this.setState({ data: response.data, loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <div className="container section">
      <div className="card" style={{ fontFamily: "Segoe UI" }}>
        <div className="card-content">
          <div className="row">
            <div style={{ fontSize: "18px" }} className="left">Cripto Moedas</div>
            <a onClick={() => { this.loadData() }} className="btn right">Carregar</a>
          </div>
          {this.state.loading ? "Carregando..." :
            <div>
              <div className="row grey lighten-2" style={{ marginBottom: "5px" }}>
                <div className="col s4"><b>Moeda</b></div>
                <div className="col s4"><b>Valor</b></div>
              </div>
              {this.state.data.map((item, index) => {
                return <div className="row grey lighten-3" key={index} style={{ marginBottom: "5px" }}>
                  <div className="col s12">
                    <div className="col s4">{item.name}</div>
                    <div className="col s4">${item.price_usd}</div>
                  </div>
                </div>
              })}
            </div>}
        </div>
      </div>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
