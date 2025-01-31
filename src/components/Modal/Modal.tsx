import React from "react";
import "./modal.css";

import home from "../../assets/home.svg";
import cross from "../../assets/cross.svg";

interface ModalProps {
    setShowModal: (state: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal }) => {
    //тут не успел подвязать стейт к инпутам, чтоб потом отправить их для создания новой номенклатуры
    return (
        <div className="modal__layout">
            <div className="modal">
                <div className="modal--wrapper">
                    <div className="modal--img-block__wrapper">
                        <div className="modal--img-block">
                            <img src={home} alt="home" />
                        </div>
                        <img
                            style={{ cursor: "pointer" }}
                            src={cross}
                            alt="cross"
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <div>
                        <p className="modal__text--main">Новая позиция</p>
                        <p className="modal__text--main-secondary">
                            Заполните все поля для создания новой номенклатуры
                        </p>
                    </div>
                    <div className="modal__input-group">
                        <p className="modal__input--heading">Название</p>
                        <input type="text" className="modal__input" />
                    </div>
                    <div className="modal__input-group">
                        <p className="modal__input--heading">
                            Единицы измерения
                        </p>
                        <input type="text" className="modal__input" />
                    </div>
                    <div className="modal__input-group">
                        <p className="modal__input--heading">Артикул/код</p>
                        <input type="text" className="modal__input" />
                    </div>
                    <div className="modal__input-group">
                        <p className="modal__input--heading">Описание</p>
                        <textarea className="modal__input-textarea" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
