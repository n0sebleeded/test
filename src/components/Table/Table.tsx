import React from "react";
import { v4 as uuid } from "uuid";
import "./table.css";

import TableItem from "@components/TableItem/TableItem.tsx";

import { Item, SortOrder } from "@types";

interface TableProps {
    itemList?: Item[];
    onEditItem: (item: Item) => void;
    setSortOrder: (sortOrder: SortOrder) => void;
    sortOrder: SortOrder;
}

const Table: React.FC<TableProps> = ({
    itemList,
    setSortOrder,
    onEditItem,
    sortOrder,
}) => {
    const handleSort = () => {
        if (sortOrder === SortOrder.ASC) {
            setSortOrder(SortOrder.DESC);
        } else {
            setSortOrder(SortOrder.ASC);
        }
    };

    return (
        <div className="table">
            <div className="table__header--item">
                <p
                    className="table__header--item--text-clickable"
                    onClick={handleSort}
                >
                    Название {sortOrder === SortOrder.ASC ? `▼` : "▲"}
                </p>
            </div>
            <div className="table__header--item">
                <p className="table__header--item--text">Единица измерения</p>
            </div>
            <div className="table__header--item">
                <p className="table__header--item--text">Артикул/код</p>
            </div>
            <div className="table__header--item"></div>
            {!!itemList &&
                itemList.map((item) => (
                    <TableItem key={uuid()} onEditItem={onEditItem} {...item} />
                ))}
        </div>
    );
};

export default Table;
