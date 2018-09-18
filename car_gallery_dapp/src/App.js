import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewCustomerSubmission from "./Component/NewCustomerSubmission";
import FetchingCustomers from "./Component/FetchingCustomers";

class App extends Component {
  render() {
    return (
        <MuiThemeProvider >
            <div className="App">

        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />


          <h1 className="App-title">Car Gallery <br/> Decentralized application</h1>
        </header>
                <div className="split right">
                    <FetchingCustomers/><br/>

                    </div>
        <div className="App-intro">

            <NewCustomerSubmission/>

        </div>
        </div></MuiThemeProvider>
    );
  }
}

export default App;
