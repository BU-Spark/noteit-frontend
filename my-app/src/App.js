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

    // var config = {
    //   headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE', 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'},
    //   data: {'user[email]': email, 'user[password]': password, 'user[firstname]': firstname, 'user[lastname]': lastname}
    // };
    // axios.post('https://noteitbackend.herokuapp.com/api/v1/users', config).then(resp => {
    //   console.log(resp)
    //   this.setState({authenticated: true, email})
    // }).catch(err => {
    //   console.log(err)
    //   this.setState({authenticated: false, error: "error"})
    // })
    var request = require("request");
var options = {method: 'POST',
  url: 'https://noteitbackend.herokuapp.com/api/v1/sessions?origin=*&format=json',
  qs:
   { 'user[email]': 'testf1@bu.edu',
     'user[password]': '12345678',
     'user[firstname]': 'Test1',
     'user[lastname]': 'Test1' },
  headers:
   { 'Postman-Token': 'a5806b1d-9985-4920-9692-1fa6fef6cdd1',
     'Cache-Control': 'no-cache' }, };

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
