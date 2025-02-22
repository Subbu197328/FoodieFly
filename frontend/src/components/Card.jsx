import React from 'react'

export default function Cards(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);
    const handleAddToCart = (option) => {

    }
    return (
        <div>

            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={props.imgSrc} className="card-img-top" alt="..." style ={{ height: "200px",objectFit:"fill" }}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>

                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100 bg-success rounded'>
                                {priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Total Price
                            </div>
                            <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart} style={{objectFit:"contain "}}      >Add To Cart</button>
                        </div>
                          </div>
                </div>
            </div>
        </div>
    )
}
