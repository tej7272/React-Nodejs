import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const fetchData = async (productData) => {
        const url = "http://localhost:3500/add-product";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify(productData)
        };

        const res = await fetch(url, options);

        if (res.ok) {
            const data = await res.json();
            toast.success(data.success);
            navigate("/");
        }
        else {
            const errorData = await res.json();
            toast.error(errorData.error);
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault();

        if(!name || !price || !category || !brand){
            setError(true);
            return false;
        }


        const auth = JSON.parse(localStorage.getItem('user'));
        const productData = {
            name,
            category,
            price,
            userId: auth._id,
            brand
        }

        fetchData(productData);
        setName("");
        setCategory("");
        setPrice("");
        setBrand("");
    }

    return (
        <div>
            <div className='content-box'>
                <h1>Add Product Page</h1>

                <form className='form-box' autoComplete="off">

                    <label htmlFor="name">Name</label>
                    <input className='inputBox' id="name" type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name &&<span className='invalid-input'>Enter vaild a product name</span>}

                    <label htmlFor="brand">Brand</label>
                    <input className='inputBox' id="brand" type='text' placeholder='Enter product brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    {error && !brand && <span className='invalid-input'>Enter vaild a product brand</span>}

                    <label htmlFor="price">Price</label>
                    <input className='inputBox' id="price" type='text' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    {error && !price && <span className='invalid-input'>Enter vaild a product price</span>}

                    <label htmlFor="category">Category</label>
                    <input className='inputBox' id="category" type='text' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    {error && !category && <span className='invalid-input'>Enter vaild a product category</span>}



                    <button className='register-btn' onClick={handleAddProduct}>Add product</button>
                </form>

            </div>
        </div>
    )
}

export default AddProduct;