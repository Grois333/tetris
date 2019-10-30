import React, { Component } from 'react';

import './Register.css';


//RegEx to validate Email
const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);



class Register extends Component{

  constructor(props){

    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      notRegister: ''
   }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }


  //Connect to Server
  onSubmitSignIn = () => {
    // console.log(this.state);
    fetch('https://fathomless-eyrie-98144.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    }).then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else{
          this.setState({notRegister: 'Already registered'});
        }
      })
  }




  render(){

  return (

  <article className="sign br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">

    <main className="pa4 black-80">
       <div className="measure">
        <fieldset id="register" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
           <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
           <input onChange={this.onNameChange} className="inp pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" placeholder="Enter name (max 8 characters)" required />
          </div>
          <div className="mt3">
           <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
           <input onChange={this.onEmailChange} className="inp pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder="Enter your email" required />
          </div>
          <div className="mv3">
           <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
           <input onChange={this.onPasswordChange} className="inp b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder="Enter your password" required />
         </div>

         <div className="btn">
          <input className="in b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" disabled={(this.state.name === "" || this.state.name.length > 8 || this.state.email === "" || !validEmailRegex.test(this.state.email) || this.state.password === "") ? true : false } onClick={this.onSubmitSignIn} />

          {(this.state.name === "" || this.state.name.length > 8 || this.state.email === "" || !validEmailRegex.test(this.state.email) || this.state.password === "") ? <div className="emptyInpMsg"><span>Incorrect Credentials</span></div> : null }
         <div className="emptyInpMsg"><span>{this.state.notRegister}</span></div>
         </div>

       </fieldset>

      </div>
  </main>
</article>

  );
 }

}

export default Register;
