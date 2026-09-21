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
  const[access,setAccess]=useState(false);
  const [products,setProducts]=useState([])
  const[profile,setProfile]=useState([])

  function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  async function handleSubmit(event){
    event.preventDefault();
    setLoading(true)
    setError("")
    try{
      const response=await fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData),
        credentials:"include"
      });
      console.log("Form submitted");
      const data=await response.json()

      if(!response.ok){
        setMessage(data.message)
        setError("Registration failed");
        setAccess(false);
        setProfile([])
        return
      }
      console.log(data.message);
      setMessage(data.message);
      setAccess(true)
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

  async function handleProducts(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();

      console.log("Response:", response);
      console.log("Products:", data);

      if (!response.ok) {
        console.log("Error:", data.message);
        return;
      }

      setProducts(data);
    } catch (error) {
      console.log("Network Error:", error);
    }
  }

  async function getProfile(event) {
    try{
      const response=await fetch("http://localhost:3000/profile",{
        method:"GET",
        credentials:"include"
      })
      const data=await response.json();
      console.log("Profile response:",data);
      
      setProfile(data)
    }catch(error){
      console.log("Network Error: ",error);  
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
        {loading?"Registering..":"Register"}
      </button>

    </form>
    <form onSubmit={handleProducts}>
      <button disabled={!access}>Products</button>
    </form>

    <p>{message}</p>
    {error && <p>{error}</p>}
    {access && <p>Access Granted</p>}
    {products && products.map((product, index) => (
      <ProductCard key={index} name={product.name} price={product.price} />
    ))}

    <button onClick={getProfile}>
      Get Profile
    </button>
    {profile && profile.name}
    </>
  )
}

export default App
