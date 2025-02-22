import React,{useEffect,useState}from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {

  const[search,setSearch] = useState("");
  const[foodCat,setFoodCat] = useState([]);
  const[foodItem,setFoodItem] = useState([]);

  const loadData = async ()=> {
    let response = await fetch("http://localhost:5000/api/foodData", {
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
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

          <div class="carousel-inner" id='carousel'>
            <div class="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center">
                <input class="div-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
              </div>
            </div>

            <div class="carousel-item active">
              <img src="burger.jfif" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div class="carousel-item">
              <img src="pastry.jfif" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div class="carousel-item">
              <img src="biriyani.jfif" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>

          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat !== [] ? (
            foodCat.map((data) => (
              <div className='row mb-3'>
                <div className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr/>
                {foodItem !== [] ? (
                  foodItem.filter((item) => 
                    (item.CategoryName === data.CategoryName) &&
                    (item.name.toLowerCase() !== "mix veg pizza") && // Exclude Mix Veg Pizza
                    (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card 
                        foodName={filterItems.name}
                        options={filterItems.options[0]}
                        imgSrc={filterItems.img}
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
