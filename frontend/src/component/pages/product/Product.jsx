import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import ProductCard from './ProductCard';

const Product = () => {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const url = "http://localhost:3500/products";
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }

        const res = await fetch(url, options);

        if (res.ok) {
            const data = await res.json();
            setProductData(data);
        }
        else {
            const errorData = await res.json();
            toast.error(errorData.error);
        }
    }

    const handleDeleteItem = async (id) => {
        const url = `http://localhost:3500/product/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }

        const res = await fetch(url, options);

        if (res.ok) {
            const data = await res.json();
            toast.success(data.success);
            await fetchData();
        }
        else {
            const errorData = await res.json();
            console.error("product data", errorData);
            toast.error(errorData.error);
        }
    }


    const handleSearchProduct = async (e) => {
        let key = e.target.value;
        if (key) {
            const url = `http://localhost:3500/search/${key}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            }

            const res = await fetch(url, options);

            if (res.ok) {
                const data = await res.json();
                setProductData(data);
            }
            else {
                const errorData = await res.json();
                toast.error(errorData.error)
                console.log(errorData)
                setProductData([]);
            }
        }
        else {
            await fetchData();
        }


    }

    return (
        <div className='container'>
            <div className='content-box'>
                <h1 style={{ textAlign: 'center' }}>Products List</h1>

                <div className='search-box'>
                    <input type="text" placeholder='Search...' onChange={handleSearchProduct} />
                </div>

                <table>
                    <thead>
                        <tr className='product-row'>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>

                        {productData.length > 0 ? productData.map((item, index) =>
                            <tr className='product-row' key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>₹{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <Link to={`/update/${item._id}`}>Update</Link>
                                    <button onClick={() => handleDeleteItem(item._id)} className='delete-btn'>Delete</button>
                                </td>
                            </tr>
                        )
                            :
                            <tr className='no-record-found product-row'>
                                <td colSpan='6'>No Result Found</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product;