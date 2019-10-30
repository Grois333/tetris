// import React from 'react';

import React, { Component } from 'react';

import Particles from 'react-particles-js';

import Tetris from './components/Tetris';

import './App.css';

import Navigation from './components/Navigation/Navigation';

// import Info from './components/Info/Info';

import Signin from './components/Signin/Signin';

import Register from './components/Register/Register';



//Generating our stars (particles)
// const particlesOptions = {
//
//   particles: {
//     line_linked: {
//       shadow: {
//         enable: true,
//         color: "blue",
//         blur: 5
//       }
//     }
//   }
// }


const particlesOptions = {

  "particles": {
    "number": {
      "value": 500,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.48927153781200905,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 0.2,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 2,
        "size_min": 0,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 0.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 83.91608391608392,
        "size": 1,
        "duration": 3,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}



class App extends Component {

  constructor(){

    super();

    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
    }
  }


  //Create User Profile
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  //Connect to Server
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log);
  // }


  //when log in, change the sign in route
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }




  render() {

    //Setting the audio
    // const audio = new Audio("./tetris.mp3");

    //Distructuring
  const {isSignedIn, route} = this.state;

    // const {route} = this.state;

    return (


      <div className='App'>


        <Particles className='particles' params={particlesOptions}/>

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        { route === 'home' ?

        <div>

         <Tetris user = {this.state.user} />

        </div>

         : (
            route === 'register' ?

            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

            :
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

           )


        }

      </div>
    );
  }


}






export default App;
