import React, { useState } from 'react'
import subIssueData from '../emailData/emailData'
import {useDispatch, useSelector} from 'react-redux'
import { generateEmailDraft } from '../slices/emailDraftSlice'
import Loader from './Loader'
const MainPage = () => {
  const [subSection, setSubSection] = useState([])
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedSubSection, setSubSelectedSection] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [appName, setAppName] = useState("")

  const emailDraftData = useSelector((state) => state?.emailDraft?.emailDraft)
  const emailDraftDataStatus = useSelector((state) => state?.emailDraft?.status)
  const dispatch = useDispatch()
  
  const handleDisplaySubSection = (e) => {
    setSubSection([])
    const {value} = e.target
    setSelectedSection(value)
    const findSubIssue = subIssueData.filter((data) => data.hasOwnProperty(value))
    setSubSection(findSubIssue[0][value])
    setSubSelectedSection(findSubIssue[0][value][0])
  }
  const handleGenerateEmail = (e) => {
    e.preventDefault()

    if(!selectedSection || !selectedSubSection || !customerName || !appName){
      return 
    }
    dispatch(generateEmailDraft({emailSectionName: selectedSection, emailSubSectionName: selectedSubSection, customerName, appName}))
  }
  return (
    <main className='container mt-3'>
      <h3>Filter.</h3>
      <div className='d-flex filterStyle'>
      <div className='my-3 me-3'>
        <select onChange={handleDisplaySubSection}>
          <option value="" autoFocus>Select Issue</option>
          <option value="Disbursement issues">Disbursement issues</option>
          <option value="Repayment issue">Repayment issue</option>
          <option value="Loan Cancellation">Loan Cancellation</option>
          <option value="App issue">App issue</option>
          <option value="Bank account change">Bank account change</option>
          <option value="Loan closure">Loan closure</option>
          <option value="Delete account">Delete account</option>
          <option value="Loan related">Loan related</option>
          <option value="Approved time">Approved time</option>
          <option value="Harassment /fraud">Harassment /fraud</option>
        </select>
        </div>
        {subSection.length > 0 && <div className='mx-3 my-3'>
          <select onChange={(e) => setSubSelectedSection(e.target.value)}>
            {subSection.map((sub,i) => <option key={i} value={sub}>{sub}</option>)}
          </select>
          </div>}
          </div>
          <div className='d-flex mt-3 filterStyle'>
              <span><label className='mx-2 my-3'>Input Customer Name: </label><input required type='text' placeholder='Customer Name' value={customerName} onChange={(e) => setCustomerName(e.target.value)}/></span>
              <span><label className='mx-2 my-3'>Input App Name: </label><input required type='text' placeholder='App Name' value={appName} onChange={(e) => setAppName(e.target.value)}/></span>
          </div>
          <button className='btn btn-primary mt-3' onClick={handleGenerateEmail}>{emailDraftDataStatus === "loading" ? <div class="spinner-border text-secondary" role="status" style={{height: "5px"}}>
  <span class="visually-hidden">Loading....</span>
</div> : "Generate Email"}</button>
          <div className='my-5'>
            {}
            {emailDraftDataStatus === "loading" ? <Loader /> : emailDraftData && <div><h4>Generated Email: </h4><p dangerouslySetInnerHTML={{ __html: emailDraftData.emailBody}}></p><h4>Suggested Note:</h4><p>{emailDraftData.suggestedNotes}</p></div>}
          </div>
    </main>
  )
}

export default MainPage