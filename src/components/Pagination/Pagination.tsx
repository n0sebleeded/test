import React, { ChangeEvent } from "react";
import "./pagination.css";

import { usePagination } from "@hooks/usePagination.ts";

interface PaginationProps {
    setSelectedPageSize: (pageSize: number) => void;
    setSelectedPage: (page: number) => void;
    selectedPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
    setSelectedPageSize,
    setSelectedPage,
    selectedPage,
    totalPages,
}) => {
    const pages = usePagination({ selectedPage, totalPages });

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = +e.target.value;

        setSelectedPageSize(value);
        if (selectedPage > 1150 / value) {
            setSelectedPage(Math.floor(1150 / value));
        }
    };

    return (
        <div className="pagination">
            <div className="pagination__page-box">
                {pages.map((item, index) => (
                    <div
                        key={index}
                        className={`pagination__page-box--item${item === selectedPage ? "-active" : ""}`}
                        onClick={() =>
                            typeof item === "number" && setSelectedPage(item)
                        }
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="pagination__page-counter">
                <p className="pagination__page-counter--text">Показывать по:</p>
                <select
                    className="pagination__page-counter--slider"
                    onChange={onChange}
                >
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
