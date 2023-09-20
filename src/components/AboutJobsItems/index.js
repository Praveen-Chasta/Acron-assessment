import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiJobsDetailsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobsItems extends Component {
  state = {
    jobDetails: [],
    similarJobsDetails: [],
    apiJobsDetailsStatus: apiJobsDetailsConstants.initial,
  }

  componentDidMount() {
    this.getJobItemsDetails()
  }

  getJobItemsDetails = async () => {
    this.setState({
      apiJobsDetailsStatus: apiJobsDetailsConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jobDetailsOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobDetailsResponse = await fetch(jobDetailsUrl, jobDetailsOptions)
    if (jobDetailsResponse.ok === true) {
      const jobDetailsData = await jobDetailsResponse.json()
      const updatedJobDetailsData = [jobDetailsData.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: each.title,
      }))
      const similarJobsDetailsUpdatedData = jobDetailsData.similar_jobs.map(
        eachSimilarData => ({
          companyLogoUrl: eachSimilarData.company_logo_url,
          employmentType: eachSimilarData.employment_type,
          id: eachSimilarData.id,
          jobDescription: eachSimilarData.job_description,
          location: eachSimilarData.location,
          rating: eachSimilarData.rating,
          title: eachSimilarData.title,
        }),
      )
      this.setState({
        jobDetails: updatedJobDetailsData,
        similarJobsDetails: similarJobsDetailsUpdatedData,
        apiJobsDetailsStatus: apiJobsDetailsConstants.success,
      })
    } else {
      this.setState({
        apiJobsDetailsStatus: apiJobsDetailsConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, similarJobsDetails} = this.state
    if (jobDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,

        title,
      } = jobDetails[0]
      return (
        <>
          <div className="jobs-items-container">
            <div className="first-job-items-lists-container">
              <div className="company-logo-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
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
                <p className="jobsDetails">{packagePerAnnum}</p>
              </div>
              <hr className="hr-1-line" />
              <div className="company-description">
                <div className="anchor-element-container">
                  <h1 className="description-heading-1">Description</h1>
                  <a className="visit-anchor" href={companyWebsiteUrl}>
                    Visit <BiLinkExternal />
                  </a>
                </div>
                <p className="description-1">{jobDescription}</p>
              </div>
            </div>
            <h1 className="skills">Skills</h1>
            <ul className="ul-skill-container">
              {skills.map(each => (
                <li className="skill-list-item" key={each.name}>
                  <img
                    src={each.imageUrl}
                    className="skill-image"
                    alt={each.name}
                  />
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company-container">
              <div className="life-at-company-heading-container">
                <h1 className="life-at-company-heading">Life at Company</h1>
                <p className="life-at-company-paragraph">
                  {lifeAtCompany.description}
                </p>
              </div>
              <div className="lifeAtCompany-image">
                <img
                  src={lifeAtCompany.imageUrl}
                  className="Life-at-company"
                  alt="Life at Company"
                />
              </div>
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="ul-similar-jobs">
            {similarJobsDetails.map(each => (
              <SimilarJobs
                key={each.id}
                similarJobData={each}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobsDetails = () => {
    this.getJobItemsDetails()
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        className="jobs-failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-1-button"
        onClick={this.onRetryJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  onGetDetails = () => {
    const {apiJobsDetailsStatus} = this.state

    switch (apiJobsDetailsStatus) {
      case apiJobsDetailsConstants.inProgress:
        return this.renderLoadingView()
      case apiJobsDetailsConstants.success:
        return this.renderSuccessView()
      case apiJobsDetailsConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-details-container">{this.onGetDetails()}</div>
      </>
    )
  }
}

export default AboutJobsItems
