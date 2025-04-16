import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-light'>
    <div className='container py-3'> 
        <div className='d-flex justify-content-between'>
        <Link to='/' className='text-decoration-none'><h3 className='text-secondary'>Email Draft Generator</h3></Link>
        <Link to='/Apps' className='btn btn-primary'>App Links & Mail Ids</Link>
        </div>
    </div>
    </div>
  )
}

export default Navbar