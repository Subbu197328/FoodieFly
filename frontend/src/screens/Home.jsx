import React,{useEffect,useState}from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {

  const[search,setSearch] = useState("");
  const[foodCat,setFoodCat] = useState([]);
  const[foodItem,setFoodItem] = useState([]);

  const loadData = async ()=> {
    let response = await fetch("https://foodiefly.onrender.com/api/foodData", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(()=> {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div> 
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain"}}>

          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              </div>
            </div>

            <div className="carousel-item active">
              <img src="burger.jfif" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="pastry.jfif" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="biriyani.jfif" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat !== [] ? (
            foodCat.map((data, index) => (
              <div key={index} className='row mb-3'>
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr/>
                {foodItem !== [] ? (
                  foodItem.filter((item) => 
                    (item.CategoryName === data.CategoryName) &&
                    (item.name.toLowerCase() !== "mix veg pizza") && 
                    (item.name.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                        foodItem = {filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>  
            ))
          ) : (
            <div>""""""""</div>
          )
        }
      </div>

      <div><Footer /></div>
    </div>
  );
}
