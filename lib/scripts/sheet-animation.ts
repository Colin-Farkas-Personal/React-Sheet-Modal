import { easingLinear } from '../utilities/easingFunctions';

export const SHEET_TRANSITION_OPEN_DURATION = 650;
export const SHEET_TRANSITION_CLOSE_DURATION = 650;
export const SHEET_TRANSITION_SNAP_POINT_DURATION = 650;

let animationFrameId: number | null = null;

// animateHeight.ts
export async function animateHeight(
  startHeight: number,
  targetHeight: number,
  duration: number = 400,
  setResizeHeight: (height: number) => void,
  easingFunction: (t: number) => number = easingLinear
): Promise<boolean> {
  return new Promise((resolve) => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = timestamp - start;
      const normalizedProgress = Math.min(progress / duration, 1);
      const easedProgress = easingFunction(normalizedProgress);
      const newHeight = startHeight + (targetHeight - startHeight) * easedProgress;

      setResizeHeight(newHeight);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setResizeHeight(targetHeight);
        resolve(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
  });
}

export function cancelAnimateHeight() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
}
