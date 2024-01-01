import {Component} from 'react'
import {FaEye} from 'react-icons/fa'
import {BiLike} from 'react-icons/bi'
import {FiMessageSquare} from 'react-icons/fi'
import Header from '../Header'
import RightView from '../RightView'

import './index.css'

class MiddleView extends Component {
  state = {
    questionList: [],
    filteredData: [],
  }

  componentDidMount() {
    this.getStackFlowQuestions()
  }

  getStackFlowQuestions = async () => {
    const {searchInput} = this.props
    const url = `https://api.stackexchange.com/2.3/search?order=desc&sort=activity&intitle=${searchInput}&site=stackoverflow`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const uData = data.items.slice(1, 7)
    const updatedData = uData.map(eachItem => ({
      answered: eachItem.is_answered,
      answerCount: eachItem.answer_count,
      viewCount: eachItem.view_count,
      title: eachItem.title,
      score: eachItem.score,
      owner: {
        name: eachItem.owner.display_name,
      },
      tags: eachItem.tags,
    }))
    this.setState({
      questionList: updatedData,
      filteredData: updatedData,
    })
  }

  onSearchInputChange = props => {
    const {questionList} = this.state
    const inputValue = props

    const filterData = questionList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(inputValue.toLowerCase()),
    )
    this.setState({filteredData: filterData})
  }

  render() {
    const {filteredData} = this.state
    console.log(filteredData)

    return (
      <>
        <div className="middle-container">
          <Header onSearchInputChange={this.onSearchInputChange} />
          <div className="main-middle-container">
            <div className="middle-left-container">
              <h1 className="main-heading">Questions</h1>
              <ul className="mid-ul-list">
                <li className="mid-list-item-1">interesting</li>
                <li className="mid-list-item">featured</li>
                <li className="mid-list-item">hot</li>
                <li className="mid-list-item">week</li>
                <li className="mid-list-item">month</li>
              </ul>
              <hr className="hr-line" />
              <ul className="mid-ul-list-1">
                {filteredData.length > 0 ? (
                  filteredData.map(question => (
                    <li key={question.question_id} className="mid-list-item-2">
                      <div>
                        <h1 className="question-title">{question.title}</h1>
                      </div>
                      <div className="tags-container">
                        {question.tags.map(tag => (
                          <div className="tag">{tag}</div>
                        ))}
                      </div>
                      <div className="ans-container">
                        <div className="name-list">
                          <div className="boolean">
                            {question.answered ? 'answered' : 'modified'}
                          </div>
                          <div> {question.owner.name}</div>
                        </div>
                        <div className="review-cont">
                          <div className="vote-count">
                            <p className="q">{question.score}</p>
                            <p>votes</p>
                            <BiLike />
                          </div>
                          <div className="ans-count">
                            <p className="q"> {question.answerCount}</p>
                            <p>answered</p>
                            <FiMessageSquare />
                          </div>
                          <div className="view-count">
                            <p className="q">{question.viewCount}</p>
                            <p>view</p>
                            <FaEye />
                          </div>
                        </div>
                      </div>

                      <hr className="hr-line-1" />
                    </li>
                  ))
                ) : (
                  <li className="no-results-message">
                    No matching results found.
                  </li>
                )}
              </ul>
              <div className="img-container">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/2048px-Stack_Overflow_icon.svg.png"
                  alt="StackflowLogo"
                  className="logo-1"
                />
              </div>

              <div className="query-container">
                <div className="colorful-dashed-line" />
                <h1 className="query-heading">Looking for more ?</h1>
                <p className="query-para">
                  Browse the{' '}
                  <span className="span-element">
                    complete list of questions
                  </span>{' '}
                  or <span className="span-element">popular tags</span>.Help us
                  answer, unanswered question.
                </p>
              </div>
            </div>
            <div className="middle-right-container">
              <RightView />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default MiddleView
