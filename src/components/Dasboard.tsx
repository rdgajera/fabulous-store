import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { Chart } from "primereact/chart";
import Details from "./Details";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from "@mui/material/Paper";

const Dashboard = () => {
    const { selectedCategory, selectedProduct, products } = useAppContext();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const titleX = products.map((data: any, index: any) => data.title.slice(0, 20));
    const priceY = products.map((data: any, index: any) => data.price);

    useEffect(() => {
        if (selectedCategory) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue("--text-color");
            const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
            const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
            const data = {
                labels: titleX,
                datasets: [
                    {
                        label: "Price Comparison",
                        backgroundColor: documentStyle.getPropertyValue("--blue-500"),
                        borderColor: documentStyle.getPropertyValue("--blue-500"),
                        data: priceY,
                    },
                ]
            };
            const options = {
                maintainAspectRatio: false,
                aspectRatio: 0.8,
                plugins: {
                    legend: {
                        labels: {
                            fontColor: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                            font: {
                                weight: 500
                            },
                        },
                        grid: {
                            display: false,
                            drawBorder: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        }
    }, [selectedCategory, products]);

    return (
        <>
            {selectedCategory && !selectedProduct ? (
                <>
                    <div className="card">
                        <Chart type="bar" data={chartData} options={chartOptions} />
                    </div>
                    <div className="card">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: "50rem" }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Title</TableCell>
                                        <TableCell >Price</TableCell>
                                        <TableCell >Description</TableCell>
                                        <TableCell >Rating</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell >{row.title}</TableCell>
                                            <TableCell >{row.price}</TableCell>
                                            <TableCell >{row.description}</TableCell>
                                            <TableCell >{row.rating.rate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            ) : selectedCategory && selectedProduct ? (
                <Details />
            ) : (
                <h1 className='text-center'>Please select a category</h1>
            )}
        </>
    );
};

export default Dashboard;
