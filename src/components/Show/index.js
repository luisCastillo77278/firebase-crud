import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { 
  collection, 
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import { db } from "../../firebase/config";

const Show = () =>{

  const MySwal = withReactContent( Swal );
  const [ products, setProducts ] = useState([]);

  const productsCollections = collection(db, 'products');

  const getProducts = async() =>{
    const data = await getDocs(productsCollections);

    setProducts(
      data.docs.map( doc =>(
        {
          ...doc.data(),
          id: doc.id
        }
      ))
    )
  }  

  const deleteProducts = async(id) =>{
    const data = await doc(db, 'products', id);
    await deleteDoc(data);
    getProducts();
  }

  const confirmDelete = async( id ) =>{
    const resp = await MySwal.fire({
      title: 'Eliminar el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if(resp.isConfirmed){
      deleteProducts(id);
      MySwal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  }

  useEffect(()=>{
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-secondary mt-2 mb-2">Create product</Link>
            </div>

            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>productos</th>
                  <th>stock</th>
                  <th>tools</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map( product =>(
                    <tr key={product.id}>
                      <td>{product.producto}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Link to={`/edit/${product.id}`} className="btn btn-info">
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button 
                          onClick={()=>{ confirmDelete(product.id) }}
                          className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
