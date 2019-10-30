import React from 'react';

import './Signin.css';

class Signin extends React.Component {

  constructor(props){

    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: '',
      notRegister: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }


  //Connect to Server
  onSubmitSignIn = () => {
    // console.log(this.state);
    fetch('https://fathomless-eyrie-98144.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else{
          this.setState({notRegister: 'You are not registered'});
        }
      })
  }




  render(){

    const { onRouteChange } = this.props;

    return (


    <article className="sign br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">

      <main className="pa4 black-80">
         <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Log In</legend>
            <div className="mt3">
             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
             <input onChange={this.onEmailChange} className="inp pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" placeholder="Enter your email"  id="email-address" onKeyPress={event => {
                 if (event.key === 'Enter' && event.target.value.trim() > 0) {
                   this.onSubmitSignIn()
                 }
               }} />
            </div>
            <div className="mv3">
             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
             <input onChange={this.onPasswordChange} className="inp b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder="Enter your password" onKeyPress={event => {
                   if (event.key === 'Enter' && event.target.value.trim() > 0) {
                   this.onSubmitSignIn()
                 }
               }} />
           </div>

           <div className="btn">
            <input className="in b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Log in" disabled={(this.state.signInEmail === "" || this.state.signInPassword === "") ? true : false } onClick={this.onSubmitSignIn} />
           </div>

           <div className="lh-copy mt3">
            <p onClick={() => onRouteChange('register')} className="reg f6 link dim black db">Register</p>
            {(this.state.signInEmail === "" || this.state.signInPassword === "") ? <div className="emptyFiledMsg"><span>Empty Fields</span></div> : null }
           <div className="emptyFiledMsg2"><span>{this.state.notRegister}</span></div>
           </div>




         </fieldset>

       </div>
    </main>
  </article>

    );
  }


}

export default Signin;
