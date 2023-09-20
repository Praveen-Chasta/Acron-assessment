import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    checkboxValue: [],
    searchInput: '',
    radioValue: '',
    apiStatus: apiProfileConstants.initial,
    apiJobsStatus: apiJobsConstants.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  onSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  onSubmitSearchInput = () => {
    this.getJobDetails()
  }

  onGetRadioOption = event => {
    this.setState(
      {
        radioValue: event.target.id,
      },
      this.getJobDetails,
    )
  }

  onSelectCheckboxOption = event => {
    const {checkboxValue} = this.state
    const inputNotInList = checkboxValue.filter(
      each => each.id === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxValue: [...prevState.checkboxValue, event.target.id],
        }),
        this.getJobDetails,
      )
    } else {
      const filteredData = checkboxValue.filter(
        each => each.id !== event.target.id,
      )
      this.setState(
        {
          checkboxValue: filteredData,
        },
        this.getJobDetails,
      )
    }
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      apiJobsStatus: apiJobsConstants.inProgress,
    })
    const {checkboxValue, searchInput, radioValue} = this.state
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxValue}&minimum_package=${radioValue}&search=${searchInput}`
    const jobsOptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsUrl, jobsOptions)
    if (jobsResponse.ok === true) {
      const data = await jobsResponse.json()
      console.log(data)
      const updatedJobsData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))
      this.setState({
        jobsData: updatedJobsData,
        apiJobsStatus: apiJobsConstants.success,
      })
    } else {
      this.setState({
        apiJobsStatus: apiJobsConstants.failure,
      })
    }
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiProfileConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(profileUrl, optionsProfile)
    if (profileResponse.ok === true) {
      const profileData = [await profileResponse.json()]

      const updatedProfileData = profileData.map(eachData => ({
        name: eachData.profile_details.name,
        profileImageUrl: eachData.profile_details.profile_image_url,
        shortBio: eachData.profile_details.short_bio,
      }))

      this.setState({
        profileData: updatedProfileData,
        responseSuccess: true,
        apiStatus: apiProfileConstants.success,
      })
    } else {
      this.setState({apiStatus: apiProfileConstants.failure})
    }
  }

  renderSalaryValues = () => (
    <ul className="ul-checkbox-list">
      {salaryRangesList.map(eachItem => (
        <li className="list-container" key={eachItem.salaryRangeId}>
          <input
            type="radio"
            id={eachItem.salaryRangeId}
            className="checkbox-input"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label htmlFor={eachItem.salaryRangeId} className="checkbox-icon">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderCheckBoxValues = () => (
    <ul className="ul-checkbox-list">
      {employmentTypesList.map(eachItem => (
        <li className="list-container" key={eachItem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachItem.employmentTypeId}
            className="checkbox-input"
            onChange={this.onSelectCheckboxOption}
          />
          <label htmlFor={eachItem.employmentTypeId} className="checkbox-icon">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-container">
          <img src={profileImageUrl} alt={name} className="profile-logo" />
          <h1 className="name">{name}</h1>
          <p className="shortBio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiProfileConstants.inProgress:
        return this.renderLoadingView()
      case apiProfileConstants.success:
        return this.renderSuccessView()
      case apiProfileConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.getJobDetails()
  }

  renderJobsFailureView = () => (
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
        onClick={this.onRetryJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="job-items-list">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderJobsProfileDetails = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiJobsConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiJobsConstants.success:
        return this.renderJobsSuccessView()
      case apiJobsConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="side-bar-container">
            {this.renderProfileDetails()}
            <hr className="hr-line" />
            <h1 className="sidebar-heading">Type of Employment</h1>
            {this.renderCheckBoxValues()}
            <hr className="hr-line" />
            <h1 className="sidebar-heading">Salary Range</h1>
            {this.renderSalaryValues()}
          </div>
          <div className="job-details-container">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                placeholder="search"
                onChange={this.onSearchInput}
                onKeyDown={this.enterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsProfileDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
