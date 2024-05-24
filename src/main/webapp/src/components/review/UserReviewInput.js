import React, { useRef, useState } from 'react';
import { PiStarFill, PiStarLight } from "react-icons/pi";

const UserReviewInput = () => {
    const [text,setText] = useState('')
    const textRef = useRef()
    const [rating, setRating] = useState(3);

    const onInput = (e) =>{
        setText(e.target.value)
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        if(!text) return

        // onAddReview(text)
        setText('')
        textRef.current.focus()
    }

    return (
        <div>
            <h2>리뷰 및 평점 달기</h2>
            {[...Array(rating)].map((a, i) => (
                <PiStarFill className="star-lg" key={i} onClick={() => setRating(i + 1)} />
            ))}
            {[...Array(5 - rating)].map((a, i) => (
                <PiStarLight className="star-lg" key={i} onClick={() => setRating(rating + i + 1)} />
            ))}
            <br/><br/>
            <form /*onSubmit={onSubmit}*/>
                <input type='text' value={text} onChange={onInput} ref={textRef} placeholder='리뷰 입력'/>
                <button type='submit'>추가</button>
            </form>
        </div>
    );
};

export default UserReviewInput;