import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-items-container">
        <div className="first-job-items-lists-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-url"
            />
            <div className="company-title-container">
              <h1 className="company-title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star" />
                <p className="company-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-description-container">
            <div className="post-container">
              <MdLocationOn className="location" />
              <p className="details">{location}</p>
              <MdLocationOn className="location" />
              <p className="details">{employmentType}</p>
            </div>
            <p className="details">{packagePerAnnum}</p>
          </div>
          <hr className="hr-1-line" />
          <div className="company-description">
            <h1 className="description-heading">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
