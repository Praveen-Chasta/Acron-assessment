import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobData

  return (
    <li className="similar-list-item-container">
      <div className="similar-top-container">
        <div className="similar-img-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-companyLogoUrl"
          />
          <div className="similar-rating-container">
            <h1 className="similar-job-heading">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star" />
              <p className="star-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-description-container">
          <h1 className="similar-job-description">Description</h1>
          <p className="similar-job-description-container">{jobDescription}</p>
        </div>
        <div className="similar-icon-container">
          <MdLocationOn className="similar-location" />
          <p className="similar-details">{location}</p>
          <MdLocationOn className="similar-location" />
          <p className="similar-details">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
