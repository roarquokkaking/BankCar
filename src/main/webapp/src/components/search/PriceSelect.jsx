import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PriceSelect = ({ fixedMinPrice, fixedMaxPrice, priceGap }) => {
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
                    max={fixedMaxPrice - priceGap}
                    step="1000"
                    value={rangeMinValue}
                    onChange={priceRangeMinValueHandler}
                />
                <FilterPriceRangeMax
                    type="range"
                    min={fixedMinPrice + priceGap}
                    max={fixedMaxPrice}
                    step="1000"
                    value={rangeMaxValue}
                    onChange={priceRangeMaxValueHandler}
                />
            </FilterPriceRangeWrap>
            <div className="flex items-center space-x-2">
                <label htmlFor="min-price" className="flex-shrink-0 font-bold">
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
                    className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="max-price" className="flex-shrink-0 font-bold">
                    최대 금액
                </label>
                <input
                    type="number"
                    id="max-price"
                    step="1000"
                    min={fixedMinPrice + priceGap}
                    max={fixedMaxPrice}
                    value={rangeMaxValue}
                    onChange={priceRangeMinValueHandler}
                    className="w-full rounded-lg border border-gray-300 px-2 py-1 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
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