import React, {useContext, useState} from 'react';
import styles from "./css/Category.module.css";
import {FaCar, FaMotorcycle, FaTruck} from "react-icons/fa";
import {GiCampingTent} from 'react-icons/gi';
import {MdBusinessCenter, MdFlightTakeoff, MdOutlineDateRange, MdOutlineElectricalServices} from 'react-icons/md';
import RegisterHeader from "./RegisterHeader";
import {RegisterContext} from "./RegisterContext";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const Category = () => {
    // const [selectedCategory, setSelectedCategory] = useState("")
    const {data, onAddData} = useContext(RegisterContext);

    const handleSelect = (e) => {
        onAddData("category", e.target.value);
    }

    return (
        <>
            <RegisterHeader text={"카테고리"}/>
            <div className={styles.category}>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={data.category}
                        name="radio-buttons-group"
                    >
                        <section className={styles.section}>
                            <div className={styles.iconBox}>
                                <GiCampingTent size={24}/>
                                <FormControlLabel
                                    value="캠핑"
                                    control={<Radio/>}
                                    label="캠핑"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                            <div className={styles.iconBox} >
                                <MdBusinessCenter size={24}/>
                                <FormControlLabel
                                    value="비지니스"
                                    control={<Radio/>}
                                    label="비지니스"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                        </section>
                        <section className={styles.section}>
                            <div className={styles.iconBox} >
                                <MdOutlineElectricalServices size={24}/>
                                <FormControlLabel
                                    value="전기차"
                                    control={<Radio/>}
                                    label="전기차"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                            <div className={styles.iconBox} >
                                <MdFlightTakeoff size={24}/>
                                <FormControlLabel
                                    value="여행"
                                    control={<Radio/>}
                                    label="여행"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                        </section>
                        <section className={styles.section}>
                            <div className={styles.iconBox} >
                                <MdOutlineDateRange size={24}/>
                                <FormControlLabel
                                    value="데이트"
                                    control={<Radio/>}
                                    label="데이트"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                            <div className={styles.iconBox}>
                                <FaCar size={24}/>
                                <FormControlLabel
                                    value="스포츠카"
                                    control={<Radio/>}
                                    label="스포츠카"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                        </section>
                        <section className={styles.section}>
                            <div className={styles.iconBox} >
                                <FaMotorcycle size={24}/>
                                <FormControlLabel
                                    value="오토바이"
                                    control={<Radio/>}
                                    label="오토바이"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                            <div className={styles.iconBox}>
                                <FaTruck size={24}/>
                                <FormControlLabel
                                    value="트럭"
                                    control={<Radio/>}
                                    label="트럭"
                                    labelPlacement="top"
                                    onClick={handleSelect}
                                />
                            </div>
                        </section>
                    </RadioGroup>
                </FormControl>
                {data.category}
            </div>
        </>
    );
};

export default Category;