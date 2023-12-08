import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  baseUrl: string;
  countPage: number;
  currentPage: number;
}

export default function Pagination({
  baseUrl,
  countPage,
  currentPage,
}: PaginationProps) {
  const router = useRouter();

  if (currentPage > countPage && currentPage && countPage)
    router.push(`/finance/${countPage}`);

  const paginationLinks = [];
  for (
    let page = currentPage - 1;
    page <= currentPage + 1 && page <= countPage;
    page++
  ) {
    if (page > 0) {
      paginationLinks.push(
        <Link
          className={`p-2 w-10 flex justify-center rounded items-center font-semibold transition-background opacity-100 ${
            currentPage === page
              ? "bg-cyan-500 bg-opacity-90 text-white"
              : "bg-zinc-400 bg-opacity-20"
          }`}
          key={page}
          href={`${baseUrl}/${page}`}
        >
          {page}
        </Link>
      );
    }
  }

  return (
    <div className="flex gap-2 p-3 justify-end">
      <Link
        className="flex items-center opacity-40 hover:opacity-70"
        href={`${baseUrl}/${currentPage > 1 ? currentPage - 1 : currentPage}`}
      >
        <FaChevronLeft />
      </Link>
      {paginationLinks}
      <Link
        className="flex items-center opacity-40 hover:opacity-70"
        href={`${baseUrl}/${currentPage + 1}`}
      >
        <FaChevronRight />
      </Link>
    </div>
  );
}
