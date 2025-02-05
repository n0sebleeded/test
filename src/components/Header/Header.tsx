import React, { FormEvent } from "react";
import "./header.css";

import plusIcon from "@assets/plusIcon.svg";
import { getItems } from "@api/requests.ts";
import { Item } from "@types";

interface HeaderProps {
    handleAddItem: (state: boolean) => void;
    totalSize: number;
    selectedPageSize: number;
    itemName: string;
    selectedPage: number;
    setLimit: (limit: number) => void;
    setItemList: (itemList: Item[]) => void;
    setItemName: (name: string) => void;
    setSelectedPage: (page: number) => void;
}

const Header: React.FC<HeaderProps> = ({
    handleAddItem,
    totalSize,
    selectedPageSize,
    selectedPage,
    itemName,
    setLimit,
    setItemName,
    setItemList,
    setSelectedPage,
}) => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getItems({
            selectedPage,
            selectedPageSize,
            itemName,
        }).then((res) => {
            if (res.data.total > 1150) {
                setLimit(1150);
            } else {
                setLimit(res.data.total);
            }
            setItemList(res.data.result);
            setSelectedPage(1);
        });
    };

    return (
        <div className="header">
            <div className="header__block">
                <h2 className="header__heading">Номенклатура</h2>
                <div className="heading__counter">
                    <p className="heading__counter--text">{totalSize} единиц</p>
                </div>
            </div>
            <div className="header__block">
                <form
                    className="heading__searchbar"
                    onSubmit={(e) => onSubmit(e)}
                >
                    <input
                        className="heading__searchbar--input"
                        type="text"
                        placeholder="Поиск по названию"
                        onChange={(e) => setItemName(e.target.value)}
                    />
                    <button className="heading__searchbar--button">
                        Поиск
                    </button>
                </form>
                <button
                    className="heading__create-position"
                    onClick={() => handleAddItem(true)}
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
