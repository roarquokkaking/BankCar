import React, {useState, useRef, useEffect} from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';


const ImageAndTextInput = ({ messageInput, onImageUpload, onTextChange, onSendMessage }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
            setShowModal(true);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setSelectedImage(file);
            setShowModal(true);
        }
    };

    const handleImageUpload = () => {
        if (selectedImage) {
            onImageUpload(selectedImage); // props로 받은 onImageUpload 함수를 호출
            setShowModal(false); // 모달을 닫음
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    useEffect(() => {
        if(showModal === false) {
            setSelectedImage(null);
        }
    }, [showModal]);

    return (
        <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            style={{ width: '100%', border: '1px solid #ccc', padding: '10px', backgroundColor: "white" }}
        >
            <FormControl
                as="textarea" // FormControl을 textarea로 사용합니다.
                style={{ flexGrow: 1, marginBottom: '10px' }}
                value={messageInput}
                placeholder="메시지를 입력하세요"
                onChange={(e) => onTextChange(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSendMessage();
                    }
                }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img
                    src="/image/message/clip.png"
                    alt="Attach file"
                    style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                    onClick={() => fileInputRef.current?.click()}
                />
                <Button
                    variant="primary"
                    onClick={onSendMessage}
                    style={{ marginRight: '10px' }}
                >
                    전송
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{backgroundColor:"#F56084"}}>
                    <Modal.Title style={{fontWeight:"bold"}}>이미지 업로드 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Preview"
                            style={{ maxWidth: '100%' }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleImageUpload}>
                        업로드
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ImageAndTextInput;