import React,{ useState,useEffect } from 'react'

const Form = () =>{

    const[action,setaction]=useState("Sign Up");
    const[user,setuser]=useState({name:"",email:"",password:""})
    const[users,setusers]=useState([])

    const onSubmit=()=>{
        console.log("Hello Form")
    }

    const userdetails = (event) =>{
        let name=event.target.name
        let value=event.target.value
        setuser({...user,[name]:value})
    }

    const handlesubmit = async (e) =>{
        const response=await fetch('http://localhost:5000/demo',{
            method:'POST',
            body:JSON.stringify(user),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        console.log(data);
    }

    const getUser = async(e) =>{
        const response=await fetch('http://localhost:5000/demo',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data=await response.json();
        console.log(data);
        setusers(data)
    }

    useEffect(()=>{
        getUser();
    },[])
        return (
            <div className="container">
                <div className='header'>
                    <div className='text'>
                        {action==="Sign Up"?"Sign Up":"Login"}
                    </div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <form onSubmit={()=>onSubmit()}>
                        {action==="Login"?<div></div>:<div className='input'>
                            <h2>Name</h2>
                            <input type="text" value={user["name"]} name="name" onChange={userdetails} placeholder='Enter your Name'/>
                        </div>}
                        <div className='input'>
                            <h2>Email</h2>
                            <input type="email" value={user["email"]}  name="email" onChange={userdetails} placeholder='Enter your Email'/>
                        </div>
                        <div className='input'>
                            <h2>Password</h2>
                            <input type="password" value={user["password"]} name="password" onChange={userdetails} placeholder='Enter your Password'/>
                        </div>
                    </form>
                </div>
                {action==="Login"?<div className="forgot-password">Forget Password ?<span>Click Here</span></div>:<div><br></br><br></br></div>}
                <div className="submit-container">
                    <div className="submit" onClick={handlesubmit}>Submit</div>
                    <div className="submit" onClick={()=>setaction(action==="Sign Up"?"Login":"Sign Up")}>{action==="Sign Up"?"Login":"Sign Up"}</div>
                </div>
                <div>
                    <ul>
                        {users.map((user,i)=>{
                            return(
                            <li key={i}>{user.name},{user.email},{user.password}</li>
                        )})}
                    </ul>
                </div>
            </div>
    )
    }


export default Form