import { signal, Signal } from '@preact/signals-react';

// Utils
import { STORE_LIST, SHOE_LIST } from '@utils/constant';
import { getColorForInventory } from '@utils/helper';

type StoreName = (typeof STORE_LIST)[number];
type ShoeName = (typeof SHOE_LIST)[number];

export type InventoryItem = {
  count: number;
  color: string;
};

type StoreInventory = { [key in ShoeName]: Signal<InventoryItem> };
type InventorySignals = { [key in StoreName]: Signal<StoreInventory> };

export const initInventory = (): Signal<InventorySignals> => {
  const inventorySignals = signal<InventorySignals>({} as InventorySignals);

  STORE_LIST.forEach((store: string) => {
    const storeInventory = signal<StoreInventory>({} as StoreInventory);
    SHOE_LIST.forEach((shoe: string) => {
      storeInventory.value[shoe] = signal<InventoryItem>({
        count: -1,
        color: getColorForInventory(-1),
      });
    });

    inventorySignals.value[store] = storeInventory;
  });
  return inventorySignals;
};
