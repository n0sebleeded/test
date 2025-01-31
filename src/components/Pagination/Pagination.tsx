import React, { useRef } from "react";
import "./pagination.css";

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
    const startPage = useRef<number>();
    const endPage = useRef<number>();
    const getPageNumbers = () => {
        const pages = [];
        startPage.current = Math.max(1, selectedPage - 2);
        endPage.current = Math.min(totalPages, selectedPage + 2);

        if (startPage.current > 2) {
            pages.push("...");
        } else if (startPage.current === 1) {
            endPage.current = startPage.current + 5;
        }

        for (let i = startPage.current; i <= endPage.current; i++) {
            pages.push(i);
        }

        if (endPage.current < totalPages - 1) {
            pages.push("...");
        } else if (endPage.current < totalPages) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination">
            <div className="pagination__page-box">
                {getPageNumbers().map((item, index) => (
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
                    onChange={(e) => setSelectedPageSize(+e.target.value)}
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
