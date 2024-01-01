import {HiOutlineViewList} from 'react-icons/hi'
import {FaSearch} from 'react-icons/fa'
import {IoIosHelpBuoy} from 'react-icons/io'
import {BiRectangle} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {MdKeyboardArrowDown} from 'react-icons/md'
import './index.css'

const Header = ({onSearchInputChange}) => {
  const onChangeInput = event => {
    const searchInput = event.target.value

    onSearchInputChange(searchInput)
  }
  return (
    <>
      <ul className="header">
        <li className="list-1">
          <HiOutlineViewList className="icon" />
          <div className="search-container">
            <FaSearch />
            <input
              type="search"
              placeholder="Search"
              className="search"
              onChange={onChangeInput}
            />
          </div>
        </li>
        <li className="list-2">
          <div className="list-3">
            <IoIosHelpBuoy className="icon-1" />
            <p>Help</p>
          </div>
          <div className="list-3">
            <BiRectangle className="icon-1" />
            <p>Tour</p>
          </div>
          <div className="list-3">
            <CgProfile className="icon-1" />
            <MdKeyboardArrowDown />
          </div>
        </li>
      </ul>
      <hr />
    </>
  )
}

export default Header
