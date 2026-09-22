import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import ProductCard from "./components/ProductCard"


function App() {
  const [formData,setFormData]=useState({
    username:"",
    password:""
  })
  const[message,setMessage]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[access,setAccess]=useState(false);
  const[profile,setProfile]=useState(null)
  const [products,setProducts]=useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");

  useEffect(()=>{
    async function fetchProfie() {
      const response= await fetch("http://localhost:3000/profile",{
        method:"GET",
        credentials:"include"
      })
      if(response.ok)setAccess(true)
    }
    fetchProfie()
  },[])

  useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: "GET",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("Error:", data.message);
                return;
            }

            setProducts(data);

        } catch (error) {
            console.log("Network Error:", error);
        }
    }
    fetchProducts();
    console.log("Fetching products...");
  }, []);  

  function handleChange(event){
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  async function handleLogin(event){
    event.preventDefault();
    setLoading(true)
    setError("")
    try{
      const response=await fetch("http://localhost:3000/login",{
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
        setError("Login failed");
        setAccess(false);
        setProfile([])
        return
      }
      console.log(data.message);
      setMessage(data.message);
      setAccess(true)
      setFormData({
        username:"",
        password:""
      })  
    }catch(error){
      console.log("NetWork Error : ",error);  
    }finally{
      setLoading(false)
    } 
  }

  async function handleProducts() {
    setProductsLoading(true);
    setProductsError("")

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        setProductsError(data.message || "failed to load products")
        console.log("Error:", data.message);
        return;
      }

      setProducts(data);
    } catch (error) {
      setProductsError("Unable to connect server")
      console.log("Network Error:", error);
    } finally{
      setProductsLoading(false)
    }
  }

  async function handleProfile(event) {
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



  async function handleLogout(event){
    try{
      const response=await fetch("http://localhost:3000/logout",{
        method:"DELETE",
        credentials:"include"
      });
      const data=await response.json();
      console.log("Delete response: ",data);
      setAccess(false);
      setProducts([])
      setProfile(null)
      setMessage("")
      
    }catch(error){
      console.log("Network error:",error);
    }

  }


  return (
    <div className="app">

      {!access ? (
        <div className="auth-card">

          <div className="auth-header">
            <div className="logo">M</div>

            <h1>Welcome Back 👋</h1>
            <p>Login to continue to your account</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">

            <div className="input-group">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

        </div>
      ) : (

        <div className="dashboard">

          <header className="dashboard-header">
            <div>
              <p className="small-text">MERN Dashboard</p>
              <h1>Welcome back 👋</h1>
            </div>

            <div className="status">
              <span className="status-dot"></span>
              Logged in
            </div>
          </header>


          <div className="dashboard-grid">

            <button
              className="dashboard-card"
              onClick={handleProfile}
            >
              <div className="card-icon">👤</div>

              <div>
                <h2>My Profile</h2>
                <p>View your account information</p>
              </div>
            </button>


            <button
              className="dashboard-card"
              onClick={handleProducts}
              disabled={productsLoading}
            >
              <div className="card-icon">🛒</div>

              <div>
                <h2>{productsLoading?"Loading...":"Products"}</h2>
                <p>Browse available products</p>
              </div>
            </button>
            {productsError && <p className='error-message'>{productsError}</p>}

          </div>


          {profile && (
            <div className="profile-panel">

              <h2>Profile</h2>

              <div className="profile-info">
                <span>Name</span>
                <strong>{profile.name}</strong>
              </div>

            </div>
          )}


          {products.length > 0 ? (
            <div className="products-section">

              <h2>Products</h2>

              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          ):(!productsLoading && <p>No Products available</p>)
          }


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
          {selectedProduct && (
            <div>
              <h2>Name : {selectedProduct.name}</h2>
              <p>Price : ₹{selectedProduct.price}</p>
            </div>
          )}

        </div>
      )}

    </div>
  )
}

export default App
