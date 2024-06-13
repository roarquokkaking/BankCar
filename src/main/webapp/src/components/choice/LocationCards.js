import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarouselCard from '../CarouselCard';
import axios from 'axios';

const LocationCards = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/home');
                setCards(response.data);
            } catch (error) {
                console.error('오류', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!cards.length) {
        return <div>No locations found.</div>;
    }

    return (
        <Box sx={{ mx: 2 }}>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {cards.map((location) => (
                    <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
                        <CarouselCard location={location} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LocationCards;
