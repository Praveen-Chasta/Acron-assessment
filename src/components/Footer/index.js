import {FaTwitter} from 'react-icons/fa'
import {TiSocialFacebook} from 'react-icons/ti'
import {GiBasketballBall} from 'react-icons/gi'
import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <hr />
      <ul className="ul-footer-list">
        <li className="footer-element">
          <p className="f-p">about us</p>
          <p className="f-p">tour</p>
          <p className="f-p">help</p>
          <p className="f-p">blog</p>
          <p className="f-p">chat</p>
          <p className="f-p">data</p>
          <p className="f-p">legal</p>
          <p className="f-p">private policy</p>
          <p className="f-p">advertising info</p>
          <p className="f-p">mobile</p>
          <p className="f-p">contact us</p>
          <p className="f-p">feedback</p>
        </li>
        <li className="footer-element-1">
          <FaTwitter />
          <TiSocialFacebook />
          <GiBasketballBall />
        </li>
      </ul>
      <hr />
      <div>
        <ul className="ul-footer-list-1">
          <li className="li-1">
            <h3>Technology</h3>
            <p>Stack Overflow</p>
            <p>Server Fault</p>
            <p>Super User</p>
            <p>Web Applications</p>
            <p>Ask Ubantu</p>
            <p>Web Master</p>
            <p>Game Development</p>
            <p>Tex La-Tex</p>
          </li>
          <li>
            <h3>Programmer</h3>
            <p>Unix & Linex</p>
            <p>Ask Different (Apple)</p>
            <p>Wordpress Development</p>
            <p>Geographic Information System</p>
            <p>Ask Ubantu</p>
            <p>Electric Engineering</p>
            <p>Android Enthusiats</p>
            <p>50+ more</p>
          </li>
        </ul>
      </div>
    </div>
  </>
)

export default Footer
