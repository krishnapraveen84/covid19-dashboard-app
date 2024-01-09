import './index.css'
import Header from '../Header'
import Footer from '../Footer'

import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

const apiStates = {
  inProgress: 'Loading',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
const About = () => {
  const [aboutResponse, setAboutData] = useState({
    data: [],
    status: apiStates.inProgress,
  })
  useEffect(async () => {
    const response = await fetch('https://apis.ccbp.in/covid19-faqs')
    const resData = await response.json()
    const newData = resData.faq
    console.log(newData)
    if (response.ok) {
      setAboutData({data: newData, status: apiStates.success})
    } else {
      setAboutData({data: [], status: apiStates.fail})
    }
  }, [])

  const renderLoader = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderSuccessView = () => {
    const {data} = aboutResponse
    return (
      <div className="faqs-container">
        <h1 className="heading">About</h1>
        <h1 className="sub-heading">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul testid="faqsUnorderedList" className="faqs-list-container">
          {data.map(each => (
            <li key={each.qno} className="list-item">
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </li>
          ))}
        </ul>
        <div className="about-footer-container">
          <Footer />
        </div>
      </div>
    )
  }
  const renderDiffrentViews = () => {
    const {status} = aboutResponse
    switch (status) {
      case apiStates.inProgress:
        return renderLoader()
      case apiStates.success:
        return renderSuccessView()
    }
  }
  return (
    <div className="about-container">
      <Header />
      <div className="faq-content">{renderDiffrentViews()}</div>
    </div>
  )
}

export default About
