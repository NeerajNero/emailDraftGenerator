import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-light'>
    <div className='container py-3'> 
        <div className='d-flex justify-content-between'>
        <Link to='/' className='text-decoration-none'><h3 className='text-secondary'>Email Draft Generator</h3></Link>
        <div className='d-flex gap-3'>
        <Link to='/Apps' className='btn btn-primary'>App Links & Mail Ids</Link>
        <Link to='/onhold-notes' className='btn btn-primary'>On-Hold Tickets Notes</Link>
        <Link to='/Gform' className='btn btn-primary'>Gform</Link> 
        </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar