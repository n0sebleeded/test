import React from "react";
import "./tableItem.css";
import { item } from "../../App.tsx";

const TableItem: React.FC<item> = ({
    name,
    code,
    //description,
    measurement_unit,
}) => {
    return (
        <>
            <div className="table__item">
                <p className="table__item--text">{name}</p>
            </div>
            <div className="table__item">
                <p className="table__item--text">{measurement_unit}</p>
            </div>
            <div className="table__item">
                <p className="table__item--text">{code}</p>
            </div>
            <div className="table__item"></div>
        </>
    );
};

export default TableItem;
