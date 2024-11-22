import { heightPercentToPixels } from '../helpers/sheetHeight';

const SNAP_POINT_LARGE_HEIGHT = '95%';
const SNAP_POINT_MEDIUM_HEIGHT = '55%';
function getSnapPointHeight(snapPoint: TSnapPoint): string | number {
  switch (snapPoint) {
    case SnapPoint.large:
      return SNAP_POINT_LARGE_HEIGHT;

    case SnapPoint.medium:
      return SNAP_POINT_MEDIUM_HEIGHT;

    default:
      return snapPoint;
  }
}

export const SnapPoint = {
  large: 'large',
  medium: 'medium',
  fitContent: 'fit-content',
} as const;
export type TSnapPoint = (typeof SnapPoint)[keyof typeof SnapPoint] | number;

export function getMainSnapPoint(snapPoints: TSnapPoint[]): number {
  const firstSnapPoint = snapPoints[0];
  const firstSnapPointHeight = getSnapPointHeight(firstSnapPoint);

  return parsePixels(firstSnapPointHeight);
}

const CLOSED_SNAP_POINT_VALUE = 0;
export function getSnapPointHeights(snapPoints: TSnapPoint[]): number[] {
  const snapPointValues: Array<number | string> = [CLOSED_SNAP_POINT_VALUE];

  snapPoints.forEach((snapPoint) => snapPointValues.push(getSnapPointHeight(snapPoint)));

  const snapPointHeights: Array<number> = [];
  snapPointValues.forEach((value) => snapPointHeights.push(parsePixels(value)));

  return snapPointHeights;
}

export function getSnapPointHeightsOrdered(snapPoints: TSnapPoint[]): number[] {
  const snapPointValues: Array<number | string> = [CLOSED_SNAP_POINT_VALUE];

  snapPoints.forEach((snapPoint) => snapPointValues.push(getSnapPointHeight(snapPoint)));

  const snapPointHeights: Array<number> = [];
  snapPointValues.forEach((value) => snapPointHeights.push(parsePixels(value)));

  return snapPointHeights.sort((a, b) => a - b);;
}

// [0, 410.85, 709.65]
export function findClosestSnapPoint(
  snapPointHeights: number[],
  currentHeight: number
): number {
  let closestSnapPoint: number = Number.MAX_VALUE;
  let smallestDifference: number = Number.MAX_VALUE;

  snapPointHeights.forEach((snapPoint) => {
    const difference = Math.abs(snapPoint - currentHeight);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestSnapPoint = snapPoint;
    }
  });

  return closestSnapPoint;
}

export function findSmallestSnapPoint(
  snapPointHeights: number[],
  excludeClosed: boolean = true
): number {
  let snapPointHeightsCopy = [...snapPointHeights];

  if (excludeClosed) {
    snapPointHeightsCopy = snapPointHeights.filter((p) => p !== CLOSED_SNAP_POINT_VALUE);
  }

  return Math.min(...snapPointHeightsCopy);
}

export function findLargestSnapPoint(
  snapPointHeights: number[],
  excludeClosed: boolean = true
): number {
  let snapPointHeightsCopy = [...snapPointHeights];

  if (excludeClosed) {
    snapPointHeightsCopy = snapPointHeights.filter((p) => p !== CLOSED_SNAP_POINT_VALUE);
  }

  return Math.max(...snapPointHeightsCopy);
}

function parsePixels(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  return heightPercentToPixels(parseInt(value));
}

export function isMinimumHeight(
  currentHeight: number,
  snapPointHeights: number[],
  excludeClosed: boolean = false
): boolean {
  if (excludeClosed) {
    snapPointHeights.filter((p) => p !== CLOSED_SNAP_POINT_VALUE);
  }

  const smallestSnapPoint = findSmallestSnapPoint(snapPointHeights, excludeClosed);
  return currentHeight > smallestSnapPoint;
}

export function isMaximumHeight(currentHeight: number, snapPointHeights: number[]): boolean {
  const largestSnapPoint = Math.max(...snapPointHeights);

  return currentHeight > largestSnapPoint;
}
