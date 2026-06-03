import { TechStackRow } from "@/types/about";

export const getTechStackCellId = (row: TechStackRow, index: number): string =>
  `${row}-row-cell-${index}`;
