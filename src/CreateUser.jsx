import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateUser = () => {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [age,setAge] = useState()
  const [mobile,setMobile] = useState()
  const [designation,setDesignation] = useState('')
  const [gender,setGender] = useState('')
  const navigate = useNavigate()

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/createUser",{name,email,age,mobile,designation})
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  const handleSelectChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add User</h2>
          <div className='mb-2'>
            <label htmlFor=''>Name</label>
            <input type="text" placeholder='Enter Name' className='form-control'
            onChange={(e)=> setName(e.target.value)} />
          </div>
          
          <div className='mb-2'>
            <label htmlFor=''>Email</label>
            <input type="text" placeholder='Enter Name' className='form-control'
            onChange={(e)=> setEmail(e.target.value)} />
          </div>
          
          <div className='mb-2'>
            <label htmlFor=''>Age</label>
            <input type="text" placeholder='Enter Name' className='form-control' 
            onChange={(e)=> setAge(e.target.value)}/>
          </div>

          <div className='mb-2'>
            <label htmlFor=''>Mobile No</label>
            <input type="text" placeholder='Enter Name' className='form-control' 
            onChange={(e)=> setMobile(e.target.value)}/>
          </div>

          <div className='mb-2'>
          <lable htmlfor="position">choose a desigination</lable>
          <select id='position' value={designation} onChange={handleSelectChange}>
            <option value={"HR"}>HR</option>
            <option value={"Manager"}>Manager</option>
            <option value={"Sales"}>Sales</option>
          </select>
          {designation && <p>You selected: {designation}</p>}
        </div>

        <div className='mb-2' >
      <label>
        <input
          type="radio"
          value="male"
          checked={gender === 'male'}
          onChange={handleGenderChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          value="female"
          checked={gender === 'female'}
          onChange={handleGenderChange}
        />
        Female
      </label>
      {gender && <p>Selected gender: {gender}</p>}
    </div>

          <button className='btn btn-success'>Submit</button>
        </form>

      </div>
    </div>  
  )
}

export default CreateUser