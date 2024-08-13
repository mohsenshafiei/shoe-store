import { computed } from '@preact/signals-react';

// Utils
import {
  SHOE_LIST,
  STORE_LIST,
  LOW_STOCK_THRESHOLD,
  HIGH_STOCK_THRESHOLD,
} from '@utils/constant';

// Signals
import { inventorySignals } from './index';

type LowStockShoe = {
  store: string;
  shoe: string;
  count: number;
};

function getShoeInventory(store: string, shoe: string) {
  return inventorySignals.value[store].value[shoe].value;
}

export const lowStockShoes = computed<LowStockShoe[]>(() => {
  const lowStockShoesList: Array<{
    store: string;
    shoe: string;
    count: number;
  }> = [];

  STORE_LIST.forEach((store: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { count } = getShoeInventory(store, shoe);
      if (count >= 0 && count <= LOW_STOCK_THRESHOLD) {
        lowStockShoesList.push({ store, shoe, count });
      }
    });
  });

  lowStockShoesList.sort((a, b) => a.count - b.count);

  return lowStockShoesList.slice(0, 15);
});

export const totalInventory = computed<number>(() => {
  let totalCount = 0;
  STORE_LIST.forEach((store: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { count } = getShoeInventory(store, shoe);
      totalCount += count > 0 ? count : 0;
    });
  });
  return totalCount;
});

export const lowCountPercentage = computed<number>(() => {
  let totalLowCount = 0;
  let totalItemsWithData = 0;
  STORE_LIST.forEach((store: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { count } = getShoeInventory(store, shoe);
      if (count >= 0 && count <= LOW_STOCK_THRESHOLD) {
        totalLowCount++;
      }
      if (count >= 0) {
        totalItemsWithData++;
      }
    });
  });
  return totalItemsWithData > 0 ? totalLowCount / totalItemsWithData : 0;
});

type ColorMap = {
  [color: string]: number;
};

export const inventoryByColor = computed<ColorMap>(() => {
  const colorMap: { [color: string]: number } = {};

  STORE_LIST.forEach((store: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { color, count } = getShoeInventory(store, shoe);
      if (!colorMap[color]) {
        colorMap[color] = 0;
      }
      colorMap[color] += count > 0 ? count : 0;
    });
  });

  return colorMap;
});

type OutOfStock = { store: string; shoe: string };

export const shoesOutOfStock = computed<OutOfStock[]>(() => {
  const outOfStockList: OutOfStock[] = [];

  STORE_LIST.forEach((store: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { count } = getShoeInventory(store, shoe);
      if (count === 0) {
        outOfStockList.push({ store, shoe });
      }
    });
  });

  return outOfStockList;
});

export type TransferData = {
  fromStore: string;
  toStore: string;
  shoe: string;
  transferCount: number;
};

export const suggestTransfers = computed<TransferData[]>(() => {
  const transferSuggestions: Array<TransferData> = [];

  STORE_LIST.forEach((toStore: string) => {
    SHOE_LIST.forEach((shoe: string) => {
      const { count: toStoreCount } = getShoeInventory(toStore, shoe);
      if (toStoreCount >= 0 && toStoreCount < LOW_STOCK_THRESHOLD) {
        STORE_LIST.forEach((fromStore: string) => {
          if (fromStore !== toStore) {
            const { count: fromStoreCount } = getShoeInventory(fromStore, shoe);
            if (fromStoreCount > HIGH_STOCK_THRESHOLD) {
              const transferCount = Math.min(
                fromStoreCount - HIGH_STOCK_THRESHOLD,
                LOW_STOCK_THRESHOLD - toStoreCount,
              );
              if (transferCount > 0) {
                transferSuggestions.push({
                  fromStore,
                  toStore,
                  shoe,
                  transferCount,
                });
              }
            }
          }
        });
      }
    });
  });

  return transferSuggestions
    .sort((a, b) => b.transferCount - a.transferCount)
    .slice(0, 20);
});
