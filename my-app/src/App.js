import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
var request = require("request");

class App extends Component {
  constructor(props) {
        super(props);
        this.state ={};
    }

   
  login(email, password){
    if (!(email || password)){
      alert("Bloody Hell! Fill out a damn input box ")
      return
    }
    var options = {method: 'POST',
      dataType: "jsonp",
      url: 'https://noteitbackend.herokuapp.com/api/v1/sessions',
      qs:
       { 'user[email]': email,
         'user[password]': password,
       },
    };
    request(options, (err, response, body) => {
      if (response.statusCode !== 201){
        this.setState({authenticated: false, error: body})
      } else {
        this.setState({authenticated: true, email, token: JSON.parse(body).token})
      }
    })
  }

  createAccount(email, password, firstname, lastname){
    
    if (!(email || password || firstname || lastname)){
      alert("Bloody Hell! Fill out a damn input box ")
      return
    }
    var options = {method: 'POST',
      dataType: "jsonp",
      url: 'https://noteitbackend.herokuapp.com/api/v1/users',
      qs:{ 'user[email]': email,
         'user[password]': password,
         'user[firstname]': firstname,
         'user[lastname]': lastname },
      };

    request(options, (err, response, body) => {
      if (response.statusCode !== 201){
        this.setState({authenticated: false, error: body})
      } else {
        this.login(email, password)
      }
    })

  }

  saveNote(title, content){

    var options = {method: 'POST',
      dataType: "jsonp",
      url: 'https://noteitbackend.herokuapp.com/api/v1/notes',
      headers: {Authorization: this.state.token, 'Content-Type': 'application/json'},
      body:{title, content},
      json: true
    };
      request(options, (err, response, body) => {
        console.log(body)
        this.setState({noteDisplay: <div/>})
      })

  }
  displayNewNote(){
    this.setState({noteDisplay:
      <div>
      <p> Title </p>
      <input onChange={(title) => this.setState({currentTitle: title.target.value})}/>
      <p> Body </p>
      <textarea rows="4" cols="50" onChange={(currentNote) => this.setState({currentNote: currentNote.target.value})}/>
      <br/>
      <button onClick={() => this.saveNote(this.state.currentTitle, this.state.currentNote)}>Save Note</button>
      </div>
                })
  }
  displayAllNotes(){
    /**
    const data = [
        {
            "id": 3,
            "title": "TEST",
            "content": "CONTENT TEST",
            "user_id": 20,
            "created_at": "2018-09-24T22:34:49.002Z",
            "updated_at": "2018-09-24T22:34:49.002Z"
        },
        {
            "id": 4,
            "title": "TEST",
            "content": "CONTENT TEST",
            "user_id": 20,
            "created_at": "2018-09-24T22:34:49.002Z",
            "updated_at": "2018-09-24T22:34:49.002Z"
        },
    ]
    data.map((anObjectMapped, index) => {
      const allNotes = data.map(anObjectMapped => {
            return (
              <p key={anObjectMapped.id}>
                  {anObjectMapped.title} - {anObjectMapped.content}
              </p>
            );
        });
        this.setState({allNotes});
    })
    **/

    var options = { method: 'GET',
      dataType: 'jsonp',
      url: 'https://noteitbackend.herokuapp.com/api/v1/notes',
      headers: { Authorization: this.state.token, 'Content-Type': 'application/json' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
    

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
              <input type="submit" value="Submit" onClick={() => this.login(this.state.email, this.state.password)}/> or <button onClick={() => this.createAccount(this.state.email, this.state.password, this.state.firstname, this.state.lastname)}>Create Account</button>
              <br/>
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
            <a style={{color: 'blue', 'text-decoration': 'underline'}} onClick = {() => this.displayAllNotes()}><li>View All Notes</li></a>
            {this.state.allNotes}
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
            <input type="submit" value="Submit" onClick={() => this.login(this.state.email, this.state.password)}/>  or <button onClick={() => this.createAccount(this.state.email, this.state.password, this.state.firstname, this.state.lastname)}>Create Account</button>
      </div>
    );
  }
}

export default App;
