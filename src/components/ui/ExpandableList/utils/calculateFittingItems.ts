interface CalculateFittingItemsParams {
  containerWidth: number;
  itemElements: (HTMLDivElement | null)[];
  itemGap: number;
  initialWidth: number;
}

export const calculateFittingItems = ({
  containerWidth,
  itemElements,
  itemGap,
  initialWidth,
}: CalculateFittingItemsParams): number => {
  let currentWidth = initialWidth;
  let itemsInRow = 0;

  for (let i = 0; i < itemElements.length; i++) {
    const itemElement = itemElements[i];

    if (!itemElement) continue;

    const itemWidth = itemElement.offsetWidth;

    if (currentWidth + itemWidth <= containerWidth) {
      currentWidth += itemWidth + itemGap;
      itemsInRow++;
    } else {
      break;
    }
  }

  return itemsInRow;
};
