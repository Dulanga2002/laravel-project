import { useState } from 'react';

interface UsePaginationProps<T> {
    items: T[];
    itemsPerPage: number;
}

export function usePagination<T>({ items, itemsPerPage }: UsePaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems,
    };
}
