import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type DynamicPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const DynamicPagination = ({
  page,
  totalPages,
  onPageChange,
}: DynamicPaginationProps) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <Pagination className="w-auto m-0">
      <PaginationContent className="*:cursor-pointer">
        <PaginationItem
          className={cn({
            "pointer-events-none opacity-50 cursor-not-allowed": page <= 1,
          })}
        >
          <PaginationPrevious onClick={() => onPageChange(page - 1)} />
        </PaginationItem>

        {totalPages <= 5 &&
          pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === page}
                onClick={() => onPageChange(p)}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        {totalPages > 5 && (
          <>
            {page <= 3 ? (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 1}
                    onClick={() => onPageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 2}
                    onClick={() => onPageChange(2)}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === 3}
                    onClick={() => onPageChange(3)}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : page > totalPages - 3 ? (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink
                    isActive={page === totalPages - 2}
                    onClick={() => onPageChange(totalPages - 2)}
                  >
                    {totalPages - 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === totalPages - 1}
                    onClick={() => onPageChange(totalPages - 1)}
                  >
                    {totalPages - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === totalPages}
                    onClick={() => onPageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink
                    isActive={page === page - 1}
                    onClick={() => onPageChange(page - 1)}
                  >
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    isActive={page === page + 1}
                    onClick={() => onPageChange(page + 1)}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>
                  <PaginationLink onClick={() => onPageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
          </>
        )}

        <PaginationItem
          className={cn({
            "pointer-events-none opacity-50 cursor-not-allowed":
              page >= totalPages,
          })}
        >
          <PaginationNext onClick={() => onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DynamicPagination;
