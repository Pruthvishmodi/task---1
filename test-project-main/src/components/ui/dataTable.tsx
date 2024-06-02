"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useTableContext } from "@/contextApi/tableContext";
import { HomeSearchParams, ProductRes } from "@/types/products";

type Props = {
  data: ProductRes;
  searchParams: HomeSearchParams
};

export const columns = [
  {
    id: "title",
    title: "Title",
  },
  {
    id: "category",
    title: "Category",
  },
  {
    id: "price",
    title: "Price",
  },
  {
    id: "rating",
    title: "Rating",
  },
];

// Helper function to safely access properties
const getProperty = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return key in obj ? obj[key] : null; // or handle the case when the key is not present
};

export function DataTable({ data, searchParams }:Props) {
  const {toggleAllItem, toggleItem, checkedItems } = useTableContext();
  const [searchText, setSearchText] = React.useState("");
  const { debouncedValue } = useDebounce(searchText, 300);
  const { push } = useRouter();

  const page = React.useMemo(() => Number(searchParams.page || 1), [searchParams.page])
  const limit = React.useMemo(() => data.limit, [data.limit])

  React.useEffect(() => {
    if (debouncedValue) {
      push(`?q=${debouncedValue}`);
    } else {
      push('/');
    }
  }, [debouncedValue, push]);

  React.useEffect(() => {
    toggleAllItem(true, data)
  }, [data, toggleAllItem])
  

  return (
    <div className="flex-1">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter product..."
          className="max-w-sm"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={data.products.length === checkedItems.length}
                  onCheckedChange={(checked: boolean) => toggleAllItem(checked, data)}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.length ? (
              data.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={checkedItems.some((x) => x.id === product.id)}
                      onCheckedChange={(checked: boolean) => toggleItem(checked, product)}
                    />
                  </TableCell>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id}>
                        {getProperty(product, column.id as never)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={{
                  pathname: "/",
                  query: {
                    ...searchParams,
                    page: page <= 1 ? page : page - 1,
                  },
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={{
                  pathname: "/",
                  query: {
                    ...searchParams,
                    page: page * limit >= data.total ? page : page + 1,
                  },
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
