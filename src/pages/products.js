import React, { useEffect, useState } from "react";

export function Products() {
    const [content, setContent] = useState(<ProductList showForm={showForm} />);

    function showList() {
        setContent(<ProductList showForm={showForm} />);
    }

    function showForm() {
        setContent(<ProductForm showList={showList} />);
    }

    return (
        <div className="container my-5">
            {content}
        </div>
    );
}

function ProductList(props) {
    const [products, setProducts] = useState([]);

    function fetchProducts() {
        fetch("http:://localhost:3000/products")
        .then((response) => {
            if(!response.ok){
                throw new Error("Unexpected Server Response"); 
            }

            return response.json()
        })
        .then((data) => {
            //console.log(data);
            setProducts(data);
        })
        .catch ((error) => console.log("Error" , error)); 
    }

    //fetchProducts(); 
    useEffect(() => fetchProducts(),[]);

    return (
        <>
            <h2 className="text-center mb-3">List Of Products</h2>
            <button onClick={props.showForm} type="button" className="btn btn-primary me-2">
                Create
            </button>
        </>
    );
}

function ProductForm(props) {
    return (
        <>
            <h2 className="text-center mb-3">Create New Product</h2>
            <button onClick={props.showList} type="button" className="btn btn-secondary me-2">
                Cancel
            </button>
        </>
    );
}
