import React, { createContext, useContext, useState } from 'react';

const ChoiceContext = createContext();

export const ChoiceProvider = ({ children }) => {
    const [choicedata, setChoicedata] = useState({
        car: {
            title: "",
            content: "",
            image: {},
            category: "",
            model: "",
            released: "",
            color: "",
            segment: "",
        },
        owner: {
            image: "",
            name: "",
            email: "",
            rating: 0,
        },
        map: {
            address: "",
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        review: {
            review_id: "",
            rating: 0,
            title: "",
            comment: "",
            id: "",
            name: ""
        },
        footer: {
            price: 0,
            startTime: "",
            endTime: "",
            startDate: "",
            endDate: "",
            loading: false,
            error: null
        }
    });

    return (
        <ChoiceContext.Provider value={{ choicedata, setChoicedata }}>
            {children}
        </ChoiceContext.Provider>
    );
};

export const useChoice = () => useContext(ChoiceContext);