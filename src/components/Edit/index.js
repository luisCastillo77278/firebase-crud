import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDoc,
  updateDoc,
  doc
} from 'firebase/firestore'; 

import { db } from '../../firebase/config';

const Edit = () => {

  const [producto, setProducto] = useState('');
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  const { id } = useParams();

  const updateProduct = async(e)=>{
    e.preventDefault();
    const productDoc = doc(db, 'products', id);
    const data = { producto, stock };
    await updateDoc(productDoc, data);
    navigate('/');
  }
  
  const getProductById = async (id)=>{
    const products = doc(db, 'products', id);
    const product =  await getDoc(products);

    if(product.exists()){
      console.log(product.data());
      const { producto, stock } = product.data();
      setProducto(producto);
      setStock(stock);
    }

  }

  useEffect(()=>{
    getProductById(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Edition producto</h1>

          <form onSubmit={updateProduct}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <input 
                type="text"
                value={producto}
                onChange={(e)=>setProducto(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input 
                type="number"
                value={stock}
                onChange={ e=>setStock(e.target.value)}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Edit</button>
          </form>

        </div>
      </div>
    </div>
  )
};

export default Edit;