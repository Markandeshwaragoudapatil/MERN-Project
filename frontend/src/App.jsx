import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProductCard from "./components/ProductCard"


function App() {
  const products=[
    {id:1,name:"Mobile",price:1200},
    {id:2,name:"Laptop",price:1800},
    {id:3,name:"iPhone",price:100}
  ]
  const [Name, setName] = useState("Patil")
  function handleClick(e){
    const value=e.target.value
    setName(value)
    console.log(e.target.value);
    
  }

  return(
    <>
    <input type="text" onChange={handleClick} value={Name} />
    <button>Name is {Name}</button>
    {products.map((product)=>{
      return(
        <ProductCard name={product.name} price={product.price} key={product.id} />
      )
    })}
    </>
  )
}

export default App
