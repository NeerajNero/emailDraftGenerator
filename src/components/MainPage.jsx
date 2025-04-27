import React, { useState } from 'react'
import subIssueData from '../emailData/emailData'
import {useDispatch, useSelector} from 'react-redux'
import { generateEmailDraft } from '../slices/emailDraftSlice'
import Loader from './Loader'


const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .filter(word => word.trim() !== '') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const MainPage = () => {
  const [subSection, setSubSection] = useState([])
  const [selectedSection, setSelectedSection] = useState("")
  const [selectedSubSection, setSubSelectedSection] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [appName, setAppName] = useState("")
  const [copied, setCopied] = useState(false)

  const emailDraftData = useSelector((state) => state?.emailDraft?.emailDraft)
  const emailDraftDataStatus = useSelector((state) => state?.emailDraft?.status)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const raw = e.target.value;
    const titleCased = toTitleCase(raw);
    setCustomerName(titleCased);
  };
  
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

  const handleCopySuggestedNotes = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch((error) => console.log("failed to copy!", error.message))
  }
  return (
    <main className='container mt-3'>
      <h3>Filter</h3>
      <div className='d-flex filterStyle'>
      <div className='my-3 me-3'>
        <select onChange={handleDisplaySubSection} className='form-select'>
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
          <select onChange={(e) => setSubSelectedSection(e.target.value)} defaultValue={subSection[0]} className='form-select'>
            {subSection.map((sub,i) => <option key={i} value={sub}>{sub}</option>)}
          </select>
          </div>}
          </div>
          <div className='d-flex gap-3 mt-3 filterStyle'>
              <span><input className='form-control' required type='text' placeholder='Customer Name' value={customerName} onChange={handleChange}/></span>
              <span><input className='form-control' required type='text' placeholder='App Name' value={appName} onChange={(e) => setAppName(e.target.value)}/></span>
              <button className='btn btn-primary' onClick={handleGenerateEmail}>{emailDraftDataStatus === "loading" ? <div className="spinner-border text-secondary" role="status" style={{height: "5px"}}>
  <span className="visually-hidden">Loading....</span>
</div> : "Generate Email"}</button>
          </div>
          <div className='my-3'>
            {}
            {emailDraftDataStatus === "loading" ? <Loader /> : emailDraftData && <div className='list-group col-md-10'><div className='list-group-item'><h4>Generated Email </h4><hr/><p dangerouslySetInnerHTML={{ __html: emailDraftData.emailBody}}></p></div><div className='list-group'><div className='list-group-item'><h4>Suggested Note</h4><hr/><p>{emailDraftData.suggestedNotes} {"   "}<button onClick={() => handleCopySuggestedNotes(emailDraftData.suggestedNotes)} className='btn btn-secondary'>Copy</button> {copied && "Copied!"}</p></div></div></div>}
          </div>
    </main>
  )
}

export default MainPage