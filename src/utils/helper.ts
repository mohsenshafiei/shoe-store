import { LEGENDS_DATA } from './constant';

export function noop<T>(v: T): T {
  return v;
}

export const getLabelByColor = (color: string) => {
  const legend = LEGENDS_DATA.find(item => item.color === color);
  return legend ? legend.label : 'Unknown';
};

// Note: used shadcn colors
// Docs: https://ui.shadcn.com/colors

export const getColorForInventory = (inventory: number) => {
  if (inventory >= 100) {
    return LEGENDS_DATA[0].color;
  } else if (inventory >= 50) {
    return LEGENDS_DATA[1].color;
  } else if (inventory >= 10) {
    return LEGENDS_DATA[2].color;
  } else if (inventory > 0) {
    return LEGENDS_DATA[3].color;
  } else if (inventory === 0) {
    return LEGENDS_DATA[4].color;
  } else {
    return '#09090b';
  }
};

export const getColorForLowStock = (inventory: number) => {
  if (inventory >= 100) {
    return '#fff7f9';
  } else if (inventory >= 50) {
    return '#fff5f7';
  } else if (inventory >= 10) {
    return '#fff1f5';
  } else if (inventory >= 8) {
    return '#ffeef2';
  } else if (inventory >= 6) {
    return '#ffe4e6';
  } else if (inventory >= 4) {
    return '#fecdd3';
  } else if (inventory >= 2) {
    return '#fda4af';
  } else if (inventory > 0) {
    return '#fb7185';
  } else if (inventory === 0) {
    return '#f43f5e';
  } else {
    return '#09090b';
  }
};
