import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader } from 'reactstrap'; // Import
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function List() {
    const [data, setData] = useState([]); //useState hook to initialize the state with an empty array
    useEffect(() => {
        axios.get('http://localhost:8080/testApi')
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            });
    }, []); // Empty dependency array to ensure the effect runs once on mount

    return (
        <div>
            <h1 className="mt-4 mb-4 text-center">Test Api</h1>
            <div className="container text-center">

                {data.length === 0 ? (
                    // Display skeleton while data is being fetched
                    <SkeletonTheme color="#f0f0f0" highlightColor="#d9d9d9">
                    {[...Array(5)].map((_, index) => (
                            <Card key={index} className="mb-3">
                                <CardHeader>
                                    <Skeleton height={30} />
                                </CardHeader>
                                <CardBody>
                                    <Skeleton height={300} />
                                </CardBody>
                            </Card>
                        ))}
                        {/* Add more skeleton cards as needed */}
                    </SkeletonTheme>
                ) : (
                    // Render cards with data once it is available
                    data.map(item => (
                        <Card key={item.name} className="mb-3">
                            <CardHeader>{item.name}</CardHeader>
                            <CardBody>
                                <img src={`data:image/png;base64,${item.base64}`} alt={item.name} className="img-fluid" />
                            </CardBody>
                        </Card>
                    ))
                )}

            </div>
        </div>
    );
}

export default List;