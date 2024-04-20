import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from "react-router-dom"

const UpdateUser = () => {
  const {id} = useParams()
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [age,setAge] = useState()
  const [mobile,setMobile] = useState()
  const [designation,setDesignation] = useState()
  const [gender,setGender] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:3001/getUser/"+id)
    .then(result => {console.log(result)
      setName(result.data.name)
      setEmail(result.data.email)
      setAge(result.data.age)
      setMobile(result.data.mobile)
      setDesignation(result.data.designation)
      setGender(result.data.gender)
    })
    .catch(err => console.log(err))
  },[])

  const Update = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/UpdateUser/"+id,{name,email,age,mobile,designation})
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
      <form onSubmit={Update}>
        <h2>Update User</h2>
        <div className='mb-2'>
          <label htmlFor=''>Name</label>
          <input type="text" placeholder='Enter Name' className='form-control' 
          value={name} onChange={(e)=> setName(e.target.value)} />
        </div>
        
        <div className='mb-2'>
          <label htmlFor=''>Email</label>
          <input type="text" placeholder='Enter Name' className='form-control' 
          value={email} onChange={(e)=> setEmail(e.target.value)} />
        </div>
        
        <div className='mb-2'>
          <label htmlFor=''>Age</label>
          <input type="text" placeholder='Enter Name' className='form-control'
          value={age} onChange={(e)=> setAge(e.target.value)} />
        </div>

        <div className='mb-2'>
          <label htmlFor=''>Mobile No</label>
          <input type="text" placeholder='Enter Name' className='form-control'
          value={mobile} onChange={(e)=> setMobile(e.target.value)} />
        </div>
        
        <div className='mb-2'>
          <lable htmlfor="designation">choose a desigination</lable>
          <select id='position' value={designation} onChange={handleSelectChange}>
            <option value={"HR"}>HR</option>
            <option value={"Manager"}>Manager</option>
            <option value={"Sales"}>Sales</option>
          </select>
          {designation && <p>You selected: {designation}</p>} designation
        </div>

        <div className='mb-2'>
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



        <button className='btn btn-success'>Update</button>
      </form>

    </div>
  </div>  
  )
}

export default UpdateUser