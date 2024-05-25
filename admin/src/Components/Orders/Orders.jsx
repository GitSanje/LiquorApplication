import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ListProduct/ListProduct.css';
import { RemoveOrderProvider } from "../../Context/RemoveOrderProvider";

const Orders = () => {
   

    const [allcheckouts, setAllcheckouts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCheckouts = localStorage.getItem('allcheckouts');
        if (storedCheckouts !== "undefined" && storedCheckouts !== null) {
            setAllcheckouts(JSON.parse(storedCheckouts));
        }

        const fetchInfo = async () => {
            try {
                const response = await fetch('http://localhost:4000/getcheckouts');
                const data = await response.json();
                localStorage.setItem('allcheckouts', JSON.stringify(data.checkouts));
                setAllcheckouts(data.checkouts);
            } catch (error) {
                console.error("Error fetching checkout data:", error);
            }
        };

        if (allcheckouts.length <= 0) {
            fetchInfo();
        }
    }, []);

    const removeOrder = (orderId) => {
        const updatedCheckouts = allcheckouts.filter(checkout => checkout._id !== orderId);
        setAllcheckouts(updatedCheckouts);
        localStorage.setItem('allcheckouts', JSON.stringify(updatedCheckouts));
        toast.success('Order has been removed from the list');
    };

    const handleViewOrder = (checkout) => {
        navigate('/orderdetails', { state: { checkout } });
    };

    return (

        <RemoveOrderProvider removeOrder={removeOrder}>
        
        <div className="listproduct container">
            <ToastContainer />
            <h1>All Orders List</h1>
            <div className="listproduct-format-main row">
                <div className="col">OrderId</div>
                <div className="col">Email</div>
                <div className="col">View Order</div>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allcheckouts.map((checkout) => (
                    <div key={checkout._id} className="listproduct-format-main row">
                        <div className="col">{checkout._id}</div>
                        <div className="col">{checkout.email}</div>
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => handleViewOrder(checkout)}
                            >
                                View Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </RemoveOrderProvider>
      
    );
};

export default Orders;
