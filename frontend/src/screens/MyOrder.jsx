import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) return;

        try {
            const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const response = await res.json();
            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData?.order_data?.length ? (
                        orderData.order_data.slice(0).reverse().map((orderGroup, index) => (
                            <div key={index}>
                                <h4 className="mt-5">{orderGroup[1]}</h4>
                                <hr />
                                <div className="row">
                                    {orderGroup[0].map((item, idx) => (
                                        <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h4 className="text-center mt-5">No Orders Found</h4>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
