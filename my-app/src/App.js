import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
        super(props);
        this.state ={};
    }
  createAccount(email, password, firstname, lastname){
    var request = require("request");
var options = {method: 'POST',
  dataType: "json",
  url: 'https://noteitbackend.herokuapp.com/api/v1/users',
  qs:
   { 'user[email]': this.state.email,
     'user[password]': this.state.password,
     'user[firstname]': this.state.firstname,
     'user[lastname]': this.state.lastname },
  };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


  }
  saveNote(note){
    console.log(note)
    this.setState({noteDisplay: <div/>})
  }
  displayNewNote(){
    this.setState({noteDisplay:
      <div>
      <textarea rows="4" cols="50" onChange={(currentNote) => this.setState({currentNote: currentNote.target.value})}/> <br/>
      <button onClick={() => this.saveNote(this.state.currentNote)}>Save Note</button>
      </div>
                })
  }
  render() {
    if (this.state.authenticated === false){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Sample Note Taking App</h1>
          </header>
          <br/>
              <label>
                Email:
                <input onChange={(email) => this.setState({email: email.target.value})}/>
              </label>
              <br/>
              <label>
                Password:
                <input onChange={(password) => this.setState({password: password.target.value})}/>
              </label>
              <br/>
              <label>
                Firstname:
                <input onChange={(firstname) => this.setState({firstname: firstname.target.value})}/>
              </label>
              <br/>
              <label>
                Lastname:
                <input onChange={(lastname) => this.setState({lastname: lastname.target.value})}/>
              </label>
              <br/>
              <input type="submit" value="Submit" onClick={() => console.log("Submit")}/> or <button onClick={() => this.createAccount(this.state.email, this.state.password, this.state.firstname, this.state.lastname)}>Create Account</button>
              {this.state.error}
        </div>
      );
    }
    if (this.state.authenticated === true){
      return (
        <div>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Sample Note Taking App</h1>
            </header>
            <br/>
          </div>

          <div>
            <ul>
              <li>Email</li>
              <ul>
                <li>{this.state.email} </li>
              </ul>
              <a style={{color: 'blue', 'text-decoration': 'underline'}} onClick = {() => this.displayNewNote()}><li>Make a new note</li></a>
            </ul>

          </div>
          {this.state.noteDisplay}
          <ul>
            <li>My Notes</li>
              <ul>
                <li>Note1</li>
              </ul>
          </ul>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sample Note Taking App</h1>
        </header>
        <br/>
            <label>
              Email:
              <input onChange={(email) => this.setState({email: email.target.value})}/>
            </label>
            <br/>
            <label>
              Password:
              <input onChange={(password) => this.setState({password: password.target.value})}/>
            </label>
            <br/>
            <label>
              Firstname:
              <input onChange={(firstname) => this.setState({firstname: firstname.target.value})}/>
            </label>
            <br/>
            <label>
              Lastname:
              <input onChange={(lastname) => this.setState({lastname: lastname.target.value})}/>
            </label>
            <br/>
            <input type="submit" value="Submit" onClick={() => console.log("Submit")}/> or <button onClick={() => this.createAccount(this.state.email, this.state.password, this.state.firstname, this.state.lastname)}>Create Account</button>
      </div>
    );
  }
}

export default App;
