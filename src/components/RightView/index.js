import {IoLocation, IoGlobeSharp} from 'react-icons/io5'
import {FaLongArrowAltRight} from 'react-icons/fa'
import {HiOfficeBuilding} from 'react-icons/hi'
import {RiQuestionnaireFill} from 'react-icons/ri'
import {Chrono} from 'react-chrono'
import './index.css'

const RightView = () => (
  <div className="right-cont">
    <h1 className="right-heading">Looking out for...</h1>
    <div className="chrono-container">
      <Chrono mode="VERTICAL">
        <div>
          <h1 className="r-heading">Front End Developer with Angular</h1>
          <p>WalletHub</p>
          <div className="right-locations">
            <IoLocation />
            <p className="r-p"> Washington, DC </p>
            <IoGlobeSharp />
            <p>Remote</p>
          </div>
          <div className="r-tech">
            <p className="r-item-0">Angular</p>
            <p className="r-item-0">React</p>
          </div>
        </div>
        <div>
          <h1 className="r-heading">Senior iOS / iPhone Engineer</h1>
          <p>Perk.com INC.</p>
          <div className="right-locations">
            <IoLocation />
            <p className="r-p"> Bangalore, india</p>
            <HiOfficeBuilding />
            <p>in Office</p>
          </div>
          <div className="r-tech">
            <p className="r-item">iOS</p>
            <p className="r-item-1">iPhone</p>
          </div>
        </div>
        <div>
          <h1 className="r-heading">Software Engineer</h1>
          <p>SparkNET Technology</p>
          <p>$25000-$40000</p>
          <div className="right-locations">
            <IoLocation />
            <p className="r-p">No Location</p>
            <IoGlobeSharp />
            <p>Remote</p>
          </div>
          <div className="r-tech">
            <p className="r-item-2">iOS</p>
            <p className="r-item-2">Ruby on Rely</p>
          </div>
        </div>
      </Chrono>
    </div>
    <div className="right-bottom-container">
      <h1 className="right-bottom-heading">Network Question</h1>
      <div className="r-network-question">
        <RiQuestionnaireFill />
        <p className="r-net-p">An English word describing the pseudo-job</p>
      </div>
      <div className="r-network-question">
        <RiQuestionnaireFill />
        <p className="r-net-p">Does 1 pixel have a standard size</p>
      </div>
    </div>
    <p className="r-net-p-1">
      VIEW ALL JOBS <FaLongArrowAltRight />
    </p>
  </div>
)
export default RightView
