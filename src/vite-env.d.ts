/// <reference types="vite/client" />

declare type Legend = {
  id: string;
  label: string;
  color: string;
};

declare module '@utils/constant' {
  export const LEGENDS_DATA: Legend[];
  export const STORE_LIST: string[];
  export const SHOE_LIST: string[];
  export const LOW_STOCK_THRESHOLD: number;
  export const HIGH_STOCK_THRESHOLD: number;
}

declare module '@utils/helper' {
  export function noop<T>(v: T): T;
  export function getLabelByColor(color: string): string;
  export function getColorForInventory(inventory: number): string;
  export function getColorForLowStock(inventory: number): string;
}

declare module '@stores' {
  export const inventorySignals: Signal<InventorySignals>;
  export const lastUpdateSignal: Signal<string>;
  export const totalInventory: ReadonlySignal<number>;
  export const lowCountPercentage: ReadonlySignal<number>;
  export const lowStockShoes: ReadonlySignal<
    {
      store: string;
      shoe: string;
      count: number;
    }[]
  >;
  export const inventoryByColor: ReadonlySignal<
    {
      store: string;
      shoe: string;
    }[]
  >;
  export const shoesOutOfStock: ReadonlySignal<
    {
      store: string;
      shoe: string;
    }[]
  >;
  export const suggestTransfers: ReadonlySignal<TransferData[]>;
  export const setInventoryCount: (
    store: string,
    shoe: string,
    count: number,
  ) => void;

  export type TransferData = {
    fromStore: string;
    toStore: string;
    shoe: string;
    transferCount: number;
  };
}

// Components
declare module '@components/Legends' {
  type LegendProps = Legend;
  type LegendsProps = {
    legends: Legend[];
    label?: string;
  };

  const Legend: React.FC<LegendProps>;
  const Legends: React.FC<LegendsProps>;

  export default Legends;
}

declare module '@components/Navbar' {
  const Navbar: React.FC;
  export default Navbar;
}

declare module '@components/Footer' {
  const Footer: React.FC;
  export default Footer;
}
