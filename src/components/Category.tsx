import React, { Component } from "react";
import { useAppContext } from "../context/context";
import CloseIcon from '@mui/icons-material/Close';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Category = () => {
    const {
        categories,
        products,
        selectedCategory,
        selectedProduct,
        setSelectedCategory,
        setSelectedProduct,
        clearFilters,
    } = useAppContext();

    console.log("products", products);
    const handleChange = (e) => {
        console.log("ee", e)
    }

    return (
        <>
            <div className="h-full mt-5">
                <div className="card flex justify-content-center mb-4 mt-5">
                    <FormControl>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            className="w-full md:w-14rem"
                            labelId="category"
                            label="Category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {
                                categories.map((category: string) => {
                                    return (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button variant="contained" className="ml-2" onClick={clearFilters} startIcon={<CloseIcon />}></Button>
                </div>

                <div className="card flex justify-content-center mb-4 mt-5">
                    <FormControl>
                        <InputLabel id="products">Products</InputLabel>
                        <Select
                            className="w-full md:w-14rem"
                            labelId="products"
                            label="Products"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            {
                                products.map((product: any) => {
                                    return (
                                        <MenuItem key={product} value={product}>{product.title}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button variant="contained" className="ml-2" onClick={clearFilters} startIcon={<CloseIcon />}></Button>
                </div>
            </div>
        </>
    );
};

export default Category;
