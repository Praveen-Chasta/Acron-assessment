import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <div className="home-container">
      <Header />
      <div className="mid-container-1">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="description">
          Millions of people are searching for jobs,salary <br />
          information,company reviews, find the job that fit your <br />
          ability and potential.
        </p>
        <Link to="/jobs" className="link-items">
          <button type="button" className="button-2">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
