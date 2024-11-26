import axios from 'axios';
import  { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [formData,setformData] = useState({email:'',password:'',role:'customer'});
    const navigate = useNavigate();
    const handleChange = ({target:{name,value}}) =>{
        setformData({...formData,[name]:value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formData)
        axios.post('http://localhost:5555/books/login',formData).then(result=>{
            if(result.data.success){
                if(formData.role === "customer"){
                    alert("Login Success");
                    navigate('/customerhome');
                }
                else{
                    alert("Login Success")
                    navigate('/home')
                }
            }
            else{
                alert(result.data.message);
            }
        }).catch(err=>{
            console.log(err)
        })
    }

  return (
    <div className='Register-container'>
        <h1>User Login</h1>
        <Form>
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
            <Button variant="primary" onClick={handleSubmit} type="submit">
                Submit
            </Button>
        </Form>
    </div>
  )
}

export default Login