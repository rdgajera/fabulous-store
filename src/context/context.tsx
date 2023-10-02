import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import Snackbar from '@mui/material/Snackbar';

// Define the types for your context
interface AppContextType {
    categories: string[];
    products: any[]; // Adjust the type as per your data structure
    selectedCategory: string | null;
    selectedProduct: any | null; // Adjust the type as per your data structure
    setSelectedCategory: (category: string | null) => void;
    setSelectedProduct: (product: any | null) => void; // Adjust the type as per your data structure
    clearFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom hook for using the context
const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<any[]>([]); // Adjust the type as per your data structure
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Adjust the type as per your data structure


    // Fetch categories from Fake Store API
    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                alert("Something went wrong!")
            });
    }, []);

    // Fetch products based on selectedCategory
    useEffect(() => {
        if (selectedCategory) {
            fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setProducts(data);
                })
                .catch((error) => {
                    alert("Something went wrong!")
                });
        }
    }, [selectedCategory]);



    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedProduct(null);
    };


    return (
        <AppContext.Provider
            value={{
                categories,
                products,
                selectedCategory,
                selectedProduct,
                setSelectedCategory,
                setSelectedProduct,
                clearFilters,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, useAppContext };
