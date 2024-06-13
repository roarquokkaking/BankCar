import React from 'react';

const OwnerDescription = ({ owner }) => {
    return (
        <div className="owner-description">
            <section className="user-info" style={{
                display: "flex",
                alignItems: "left",
                paddingLeft: "20px",
                margin: "0px",
                justifyContent: "space-between"
            }}>
                <div className="user-img-name">
                    <img
                        src={owner.image}
                        alt="유저 이미지"
                        className="user-image"
                    />
                    <div className="text-info">
                        <h4>{owner.name}</h4>
                        <p>{owner.email}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OwnerDescription;