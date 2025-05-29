import { useState } from "react"
import { notes } from "../emailData/onHoldNotes"
const OnholdTicketsNotes = () => {
    const [type, setType] = useState('')
    const [concern, setConcern] = useState('')

    const copyText = () =>{
        navigator.clipboard.writeText(concern)
    }
  return (
    <div className="container mt-3">
        <div className="list-group">
        <div className="list-group-item">
            <h4>On-Hold Notes</h4>
            <hr/>
        <div className="d-flex gap-3 my-3">
            <div>
            <select className="form-select" onChange={(e) => setType(e.target.value)}>
            <option hidden>slecet on-hold Pending or Waiting</option>
            <option value='waiting'>Waiting</option>
            <option value='pending'>Pending</option>
            </select>
        </div>
        <div>
            <select className="form-select" onChange={(e) => setConcern(e.target.value)}>
            <option hidden>slecet on-hold concerns</option>
            {type === "waiting" ? notes.filter((note) => note.type === "waiting").map((waitingNotes,i) => (<option key={i} value={waitingNotes.note}>{waitingNotes.name}</option>)) :
             notes.filter((note) => note.type === "pending").map((pendingNotes,i) => (<option key={i} value={pendingNotes.note}>{pendingNotes.name}</option>))}
            </select>
        </div>
        </div>
        <div className="my-3">
                {concern !== "" && <div><p>{concern}</p> <button onClick={copyText} className="btn btn-secondary">Copy</button></div>}
        </div>
        </div>
        </div>
    </div>
  )
}

export default OnholdTicketsNotes