import React from "react";
import "./header.css";

import plusIcon from "../../assets/plusIcon.svg";

interface HeaderProps {
    setShowModal: (state: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setShowModal }) => {
    return (
        <div className="header">
            <div className="header__block">
                <h2 className="header__heading">Номенклатура</h2>
                <div className="heading__counter">
                    <p className="heading__counter--text">54 единиц</p>
                </div>
            </div>
            <div className="header__block">
                <div className="heading__searchbar">
                    <input
                        className="heading__searchbar--input"
                        type="text"
                        placeholder="Поиск по названию"
                    />
                    <button className="heading__searchbar--button">
                        Поиск
                    </button>
                </div>
                <button
                    className="heading__create-position"
                    onClick={() => setShowModal(true)}
                >
                    <img src={plusIcon} alt="plusIcon" width={20} height={20} />
                    <p className="heading__create-position--text">
                        Новая позиция
                    </p>
                </button>
            </div>
        </div>
    );
};

export default Header;
