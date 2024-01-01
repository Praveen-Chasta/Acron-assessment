import {
  FaQuestion,
  FaLock,
  FaTag,
  FaUser,
  FaDatabase,
  FaInbox,
  FaIdBadge,
} from 'react-icons/fa'
import {IoDocumentText} from 'react-icons/io5'

import {AiFillSound} from 'react-icons/ai'
import './index.css'

const LeftView = () => (
  <div className="left-side-container">
    <img
      src="https://www.logo.wine/a/logo/Stack_Overflow/Stack_Overflow-Logo.wine.svg"
      alt="Stack Overflow"
      className="logo"
    />
    <ul className="ul-list-items">
      <li className="list-items-1">
        <FaQuestion />
        <p className="item">QUESTIONS</p>
      </li>
      <li className="list-items">
        <FaLock />
        <p className="item">JOBS</p>
      </li>
      <li className="list-items">
        <IoDocumentText />
        <p className="item">DOCUMENTATIONS</p>
      </li>
      <li className="list-items">
        <FaTag />
        <p className="item">TAGS</p>
      </li>
      <li className="list-items">
        <FaUser />
        <p className="item">USERS</p>
      </li>
      <li className="list-items">
        <FaIdBadge />
        <p className="item">BADGES</p>
      </li>
      <li className="list-items">
        <AiFillSound />
        <p className="item">ASK Questions</p>
      </li>
      <li className="list-items">
        <FaDatabase />
        <p className="item">STACK EXCHANGE</p>
      </li>
      <li className="list-items">
        <FaInbox />
        <p className="item">INBOX</p>
      </li>
    </ul>
  </div>
)

export default LeftView
