import React, { Component } from "react";
import { useAppContext } from "../context/context";

const Details = () => {
    const { selectedProduct } = useAppContext();
    if (!selectedProduct) {
        return null;
    }

    const { title, category, sku, price, description, image } = selectedProduct;

    return (
        <div>
            <h1 className='title-text'>{title}</h1>
            <div className="grid grid-nogutter">
                <div className="col-12 md:col-4 lg:col-4 mt-4">
                    <p className='m-0 sub-title-text'>{category}</p>
                    <p className='m-0 sub-title-text'>SKU: {sku}</p>
                    <p className='body-text'>$ {price}</p>
                </div>
                <div className="col-12 md:col-8 lg:col-8">
                    <div>
                        <img height='120px' width='150px' src={image} alt={title} />
                    </div>
                </div>
            </div>
            <p className='body-sub-text pr-5'>{description}</p>
        </div>
    );
};

export default Details;
