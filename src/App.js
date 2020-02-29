import React, {Component} from 'react';

import './App.css';
import Navbar from './components/Navbar.js'
import Header from './components/Header.js'
import Process from './components/Process.js'
import Order from './components/Order.js'
import Features from './components/Features.js'
import Footer from './components/Footer.js'

class App extends Component {
  render() {
    return (
        <div className="main">
          <Navbar />
          <Header />
          <Process />
          <Order />
          <Features />
          <Footer />
        </div>
    )
  }
}


export default App;
