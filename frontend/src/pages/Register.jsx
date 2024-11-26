import  { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import axios from 'axios';

const Register = () => {
  const [formData,setformData] = useState({name:'',email:'',password:'',role:'customer'});
  const handleChange = ({target:{name,value}}) =>{
    setformData({...formData,[name]:value});
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:5555/books/register',formData).then(result=>{
      if(result.data.success){
        alert(result.data.message)
      }
      else{
        alert(result.data.message)
      }
    }).catch(err=>{
      alert(err.message)
      console.log(err);
    });
  }


  return (
    <div className='Register-container'>
        <h1>User Register</h1>
        <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' onChange={handleChange} type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' onChange={handleChange} type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' onChange={handleChange} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3">
                <Form.Label>Select role</Form.Label>
                <Form.Select required value={formData.role} onChange={handleChange} name='role' >
                <option value="customer"> customer</option>
                <option value="seller"> seller</option>
                </Form.Select>
            </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default Register;