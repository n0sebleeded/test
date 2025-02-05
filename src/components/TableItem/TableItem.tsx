import React from "react";
import "./tableItem.css";

import editIcon from "@assets/editIcon.svg";
import { Item } from "@types";

const TableItem: React.FC<Item & { onEditItem: (item: Item) => void }> = ({
    id,
    name,
    code,
    description,
    measurement_units,
    onEditItem,
}) => {
    return (
        <>
            <div className="table__item">
                <p className="table__item--text">{name}</p>
            </div>
            <div className="table__item">
                <p className="table__item--text">{measurement_units}</p>
            </div>
            <div className="table__item">
                <p className="table__item--text">{code}</p>
            </div>
            <div className="table__item">
                <div
                    className="table__item--image"
                    onClick={() =>
                        onEditItem({
                            id,
                            name,
                            code,
                            measurement_units,
                            description,
                        })
                    }
                >
                    <img src={editIcon} alt="editIcon" />
                </div>
            </div>
        </>
    );
};

export default TableItem;
