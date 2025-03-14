import React from 'react';
import Delete from '@mui/icons-material/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3">
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch("https://foodiefly.onrender.com/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.status===200) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Error during checkout:", response.status);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + Number(food.price), 0);

  return (
    <div className="container m-auto mt-5 table-responsive">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>₹{food.price}</td>
              <td>
                <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index })}>
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="fs-2">Total Price: ₹{totalPrice}/-</h1>
      <button className="btn bg-success mt-5" onClick={handleCheckOut}>
        Check Out
      </button>
    </div>
  );
}
