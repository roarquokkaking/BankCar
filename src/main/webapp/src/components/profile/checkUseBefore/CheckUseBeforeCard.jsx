import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Chip } from '@mui/material';
import styles from './CheckUseBefore.module.css';
import {useState} from "react";


export default function CheckUseBeforeCard({ car }) {
    const [info_box, setInfo_box] = useState()
   const imageUrl = `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${car.carId}/${car.imageUrl}`;
    //console.log(imageUrl);


    return (
        <Card sx={{ maxWidth: 345, mt: '10%', mb: '10px', mx: '10%', boxShadow: 5 }}>
            <CardMedia
                sx={{ height: 280 }}
                image={imageUrl}
                title={car.model}
                style={{alignItems : "center"  , borderRadius: "1px solid black"}}

            />
            <CardContent style={{alignItems: "center"}}>
                <Chip label={car.category} color="primary" sx={{mb: 2}}/>

                <div className={styles.info_box}>
                    <Typography className={styles.info_item}>
                        차종 : {car.model}
                    </Typography>
                    <Typography>
                        색상 : {car.color}
                    </Typography>
                </div>
                <div className={styles.info_box}>
                    <Typography>
                        평점 : {car.rating}
                    </Typography>
                </div>
                <div className={styles.info_box}>
                    <Typography>
                        위치 : {car.doro}
                    </Typography>
                </div>

                <div className={styles.info_box}>
                    <Typography variant="h6">
                        제목 : {car.title}
                    </Typography>
                </div>
                <div className={styles.info_box}>
                    <Typography color="text.secondary" className={styles.input}>
                        컨텐트: {car.content}
                    </Typography>
                </div>
                <div className={styles.info_box}>
                    <Typography color="text.secondary" className={styles.input}>
                        결제금액: {car.pay}
                    </Typography>
                </div>
                <div className={styles.info_box}>
                    <Typography variant="h5" component="div">
                        이용기간:{car.startTime} <br/>
                        ~ {car.endTime}
                    </Typography>
                </div>

                <Typography>
                    {/*{car.username}*/}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{justifyContent: 'flex-end'}}>
                <Button size="small">채팅하기 </Button>
            </CardActions>
        </Card>
    );
}
