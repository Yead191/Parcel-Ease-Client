import {
    Pagination as ShadPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Pagination = ({ currentPage, total, onPageChange }) => {
    const pageNumbers = Array.from({ length: total }, (_, i) => i + 1);

    return (
        <ShadPagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                        disabled={currentPage === 1}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pageNumbers.map((number) =>
                    number === currentPage ? (
                        <PaginationItem key={number}>
                            <PaginationLink href="#" isActive>
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={number}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(number);
                                }}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* Ellipsis */}
                {total > 5 && currentPage < total - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < total) onPageChange(currentPage + 1);
                        }}
                        disabled={currentPage === total}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadPagination>
    );
};

export default Pagination;
