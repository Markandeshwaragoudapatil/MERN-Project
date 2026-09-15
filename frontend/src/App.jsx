import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProductCard from "./components/ProductCard"


function App() {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  })

  function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault()
    console.log("Form submitted");
    
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

      <label htmlFor="email">Email: </label>
      <input 
        id='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
      /><br />

      <label htmlFor="password">Password: </label>
      <input
        id='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      /><br/>

      <button type='submit'>
        Register
      </button>

    </form>

    <p>Name : {formData.name}</p>
    <p>Email : {formData.email}</p>
    </>
  )
}

export default App
