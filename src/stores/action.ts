import { inventorySignals } from '.';

// Utils
import { getColorForInventory } from '@utils/helper';

export const setInventoryCount = (
  store: string,
  shoe: string,
  count: number,
) => {
  const color = getColorForInventory(count);
  // Set value with O(1)
  inventorySignals.value[store].value[shoe].value = { count, color };
};
