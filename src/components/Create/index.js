import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  collection,
  addDoc
} from 'firebase/firestore';

import { db } from '../../firebase/config';

const Create = () => {

  const [ producto, setProducto ] = useState('');
  const [ stock, setStok ] = useState( 0 );

  const navigate = useNavigate();

  const productsCollections = collection(db, 'products');

  const createProduct = async (e) =>{
    e.preventDefault();
    await addDoc(productsCollections, {
      producto,
      stock
    });
    navigate('/');
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Create product</h1>
          
          <form onSubmit={createProduct}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <input 
                type="text"
                value={producto}
                onChange={ e => setProducto(e.target.value) }
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stok</label>
              <input 
                type="number"
                value={stock}
                onChange={ (e)=>setStok( e.target.value )}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">Create</button>

          </form>
        </div>
      </div>
    </div>
  )
};

export default Create;