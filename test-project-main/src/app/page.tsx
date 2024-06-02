import BarChart from "@/components/ui/barChart";
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/dataTable";
import { HomeSearchParams, ProductRes } from "@/types/products";

type Props = {
  searchParams: HomeSearchParams
};



export default async function Home({ searchParams }:Props) {
  const pageNumber = Number(searchParams.page ?? 1);
  const numberOfItems = 5;
  const offsetItems = (pageNumber - 1) * numberOfItems;
  console.log(`https://dummyjson.com/products/search?limit=${numberOfItems}&skip=${offsetItems}&select=id,title,category,price,rating&q=${searchParams.q || ''}`);
  
  const res = await fetch(
    `https://dummyjson.com/products/search?limit=${numberOfItems}&skip=${offsetItems}&select=id,title,category,price,rating&q=${searchParams.q || ''}`
  );
  const json = await res.json() as ProductRes;

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <DataTable data={json} searchParams={searchParams} />
      <BarChart />
    </main>
  );
}
