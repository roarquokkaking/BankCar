import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import "../../CSS/SearchCSS.css";

const PriceSelect = ({ searchDTO, setSearchDTO, fixedMinPrice, fixedMaxPrice, priceGap, reset, setReset }) => {
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const [rangeMinPercent, setRangeMinPercent] = useState(0);
    const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

    useEffect(() => {
        setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
        setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
    }, [rangeMinValue, rangeMaxValue, fixedMaxPrice]);

    const priceRangeMinValueHandler = (e) => {
        const value = parseInt(e.target.value);
        if (value + priceGap <= rangeMaxValue) {
            setRangeMinValue(value);
        }
    };

    const priceRangeMaxValueHandler = (e) => {
        const value = parseInt(e.target.value);
        if (value - priceGap >= rangeMinValue) {
            setRangeMaxValue(value);
        }
    };

    useEffect(() => {
        setSearchDTO({
            ...searchDTO,
            minPrice: rangeMinValue,
            maxPrice: rangeMaxValue
        });
    }, [rangeMinValue, rangeMaxValue, setSearchDTO]);

    useEffect(() => {
        if (reset) {
            setRangeMinValue(fixedMinPrice);
            setRangeMaxValue(fixedMaxPrice);
            setReset(false);
        }
    }, [reset, setReset]);

    return (
        <>
            <FilterPriceSlide>
                <FilterPriceSlideInner
                    rangeMinPercent={rangeMinPercent}
                    rangeMaxPercent={rangeMaxPercent}
                />
            </FilterPriceSlide>
            <FilterPriceRangeWrap>
                <FilterPriceRangeMin
                    type="range"
                    min={fixedMinPrice}
                    max={fixedMaxPrice}
                    step="1000"
                    value={rangeMinValue}
                    onChange={priceRangeMinValueHandler}
                />
                <FilterPriceRangeMax
                    type="range"
                    min={fixedMinPrice}
                    max={fixedMaxPrice}
                    step="1000"
                    value={rangeMaxValue}
                    onChange={priceRangeMaxValueHandler}
                />
            </FilterPriceRangeWrap>
            <div className="price-input-container">
                <div className="price-input-group">
                    <label htmlFor="min-price" className="price-input-label">
                        최소 금액
                    </label>
                    <input
                        type="number"
                        id="min-price"
                        step="1000"
                        min={fixedMinPrice}
                        max={fixedMaxPrice - priceGap}
                        value={rangeMinValue}
                        onChange={priceRangeMinValueHandler}
                        className="price-input-field no-focus"
                        tabIndex="-1"
                    />
                    {/*<label htmlFor="min-price" className="price-input-label">*/}
                    {/*    원*/}
                    {/*</label>*/}
                </div>
                <div className="price-input-group">
                    <label htmlFor="max-price" className="price-input-label">
                        최대 금액
                    </label>
                    <input
                        type="number"
                        id="max-price"
                        step="1000"
                        min={fixedMinPrice + priceGap}
                        max={fixedMaxPrice}
                        value={rangeMaxValue}
                        onChange={priceRangeMaxValueHandler}
                        className="price-input-field no-focus"
                        tabIndex="-1"
                    />
                </div>
            </div>
        </>
    );
};

export default PriceSelect;

// 스타일 컴포넌트 정의
const FilterPriceSlide = styled.div`
    position: relative;
    height: 4px;
    width: 650px;
    border-radius: 10px;
    background-color: #dddddd;

    @media (max-width: 1200px) {
        width: 800px;
    }

    @media (max-width: 768px) {
        width: 500px;
    }

    @media (max-width: 480px) {
        width: 350px;
    }
`;

const FilterPriceSlideInner = styled.div`
    position: absolute;
    left: ${props => props.rangeMinPercent}%;
    right: ${props => props.rangeMaxPercent}%;
    height: 4px;
    border-radius: 10px;
    background-color: #b0b0b0;
`;

const FilterPriceRangeWrap = styled.div`
    position: relative;
    width: 650px;

    @media (max-width: 1200px) {
        width: 800px;
    }

    @media (max-width: 768px) {
        width: 500px;
    }

    @media (max-width: 480px) {
        width: 350px;
    }
`;

const FilterPriceRangeMin = styled.input`
    position: absolute;
    top: -9px;
    height: 7px;
    width: 100%;
    -webkit-appearance: none;
    background: none;
    pointer-events: none;

    &::-webkit-slider-thumb {
    pointer-events: auto;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid #b0b0b0;
    background-color: white;
    -webkit-appearance: none;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;