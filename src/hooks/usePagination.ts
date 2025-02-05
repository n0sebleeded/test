interface PaginationProps {
    selectedPage: number;
    totalPages: number;
}

export const usePagination = ({
    selectedPage,
    totalPages,
}: PaginationProps) => {
    const pages: (number | "...")[] = [];
    totalPages = Math.ceil(totalPages);

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    const startPage = Math.max(1, selectedPage - 2);
    const endPage = Math.min(totalPages, selectedPage + 2);

    if (startPage > 2) {
        pages.push(1, "...");
    } else if (startPage === 2) {
        pages.push(1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages - 1) {
        pages.push("...", totalPages);
    } else if (endPage === totalPages - 1) {
        pages.push(totalPages);
    }

    return pages;
};
