import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProductCard from "./components/ProductCard"


function App() {
  const [formData,setFormData]=useState({
    name:"",
    username:"",
    password:""
  })
  const[message,setMessage]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");

  function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true)
    setError("")
    try{
      const response=await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      });
      console.log("Form submitted");
      const data=await response.json()

      if(!response.ok){
        setError("Registration failed")
        return
      }
      console.log(data.message);
      setMessage(data.message)
      setFormData({
        name:"",
        username:"",
        password:""
      })     
    }catch(error){
      console.log("NetWork Error : ",error);  
    }finally{
      setLoading(false)
    } 
  }

  return(
    <>
    <form onSubmit={handleSubmit}>

      <label htmlFor="name">Name: </label>
      <input 
        id='name'
        name='name'
        value={formData.name}
        onChange={handleChange}
      /><br />

      <label htmlFor="username">UserName: </label>
      <input 
        id='username'
        name='username'
        value={formData.username}
        onChange={handleChange}
      /><br />

      <label htmlFor="password">Password: </label>
      <input
        id='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      /><br/>

      <button type='submit' disabled={loading}>
        {loading?"Registring..":"Register"}
      </button>

    </form>

    <p>{message}</p>
    {error && <p>{error}</p>}
    </>
  )
}

export default App
