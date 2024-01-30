import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
 

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const navigate = useNavigate();
    const params = useParams();

  useEffect(()=>{
    getProductDetails();
    // eslint-disable-next-line
  }, [])
  

  const getProductDetails = async ()=>{
    const url = `http://localhost:3500/product/${params.id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            
        };

        const res = await fetch(url, options);

        if (res.ok) {
            const data = await res.json();
            setName(data.name);
            setBrand(data.brand);
            setPrice(data.price);
            setCategory(data.category);
        }
        else {
            const errorData =  await res.json();
            toast.error(errorData.error);
        }
  }




    const fetchData = async (updateData) => {
        const url = `http://localhost:3500/update-product/${params.id}`;
        const options = {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            body: JSON.stringify(updateData)
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

    const handleUpdateProduct = (e) => {
        e.preventDefault();

        const updateData = {
            name,
            category,
            price,
            brand
        }

        fetchData(updateData);
        
    }

    return (
        <div>
            <div className='content-box'>
                <h1>Update Product</h1>

                <form className='form-box' autoComplete="off">

                    <label htmlFor="name">Name</label>
                    <input className='inputBox' id="name" type='text' placeholder='Enter product name' value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="brand">Brand</label>
                    <input className='inputBox' id="brand" type='text' placeholder='Enter product brand' value={brand} onChange={(e) => setBrand(e.target.value)} />

                    <label htmlFor="price">Price</label>
                    <input className='inputBox' id="price" type='text' placeholder='Enter product price' value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label htmlFor="category">Category</label>
                    <input className='inputBox' id="category" type='text' placeholder='Enter product category' value={category} onChange={(e) => setCategory(e.target.value)} />

                    <button className='register-btn' onClick={handleUpdateProduct}>Update product</button>
                </form>

            </div>
        </div>
  )
}

export default UpdateProduct