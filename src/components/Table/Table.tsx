import React from "react";
import "./table.css";
import TableItem from "../TableItem/TableItem.tsx";
import { item } from "../../App.tsx";

interface TableProps {
    itemList: item[] | undefined;
}

const Table: React.FC<TableProps> = ({ itemList }) => {
    console.log(itemList);

    return (
        <div className="table">
            <div className="table__header--item">
                <p className="table__header--item--text">Название</p>
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
                    <TableItem
                        id={item.id}
                        name={item.name}
                        measurement_unit={item.measurement_unit}
                        code={item.code}
                        description={item.description}
                        key={item.id}
                    />
                ))}
        </div>
    );
};

export default Table;
