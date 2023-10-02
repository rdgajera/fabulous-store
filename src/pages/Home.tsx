import React, { Component } from "react";
import Category from "../components/Category";
import { AppProvider } from "../context/context";
import Dashboard from "../components/Dasboard";


const Home = () => {
    return (
        <>
            <AppProvider>
                <div>
                    <div className='grid grid-nogutter'>
                        <div className="col-12 md:col-4 lg:col-4">
                            <Category />
                        </div>
                        <div className="col-12 md:col-8 lg:col-8">
                            <Dashboard />
                        </div>
                    </div>
                </div>
            </AppProvider>
        </>

    );
};

export default Home;
