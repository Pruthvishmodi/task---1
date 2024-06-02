"use client";
import { ProductRes, ProductType } from "@/types/products";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const TableContext = createContext<{
  checkedItems: ProductType[];
  toggleAllItem: (checked: boolean, data: ProductRes) => void;
  toggleItem: (checked: boolean, product: ProductType) => void;
}>({
  checkedItems: [],
  toggleAllItem: () => {},
  toggleItem: () => {}
});

export const TableProvider = ({ children }: PropsWithChildren) => {
  const [checkedItems, setCheckedItems] = useState<ProductType[]>([]);

  const toggleAllItem = useCallback((checked: boolean, data: ProductRes) => {
    setCheckedItems((value) => {
      if (checked) {
        return data.products;
      } else {
        return [];
      }
    });
  }, []);

  const toggleItem = useCallback((checked: boolean, product: ProductType) => {
    setCheckedItems((value) => {
      if (checked) {
        return [...value, product];
      } else {
        const index = value.findIndex((x) => x.id === product.id);
        return [...value.slice(0, index), ...value.slice(index + 1)];
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      checkedItems,
      toggleAllItem,
      toggleItem,
    }),
    [checkedItems, toggleAllItem, toggleItem]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);
