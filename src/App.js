import {Component} from 'react'
import LeftView from './components/LeftView'
import MiddleView from './components/MiddleView'
import Footer from './components/Footer'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <div className="bg-container">
          <LeftView />
          <MiddleView />
        </div>
        <Footer />
      </>
    )
  }
}

export default App
