import { signal } from '@preact/signals-react';

// Computed
import {
  totalInventory,
  lowCountPercentage,
  lowStockShoes,
  inventoryByColor,
  shoesOutOfStock,
  suggestTransfers,
} from './computed';

// Actions
import { setInventoryCount } from './action';

// Initializers
import { initInventory } from './init';

// Types
import type { TransferData } from './computed';

const inventorySignals = initInventory();

const lastUpdateSignal = signal('');

const ws = new WebSocket(import.meta.env.VITE_WS_URL);
ws.onmessage = function (event) {
  const { store, model, inventory, timeStamp } = JSON.parse(event.data);

  const date = new Date(timeStamp);
  lastUpdateSignal.value = date.toLocaleString();

  setInventoryCount(store, model, inventory);
};

window.addEventListener('beforeunload', () => {
  ws.close();
});

export {
  inventorySignals,
  lastUpdateSignal,
  totalInventory,
  lowCountPercentage,
  lowStockShoes,
  inventoryByColor,
  shoesOutOfStock,
  suggestTransfers,
  setInventoryCount,

  // Types
  TransferData,
};
