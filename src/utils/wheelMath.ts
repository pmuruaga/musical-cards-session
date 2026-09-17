/**
 * Math helpers for a pointer-at-top wheel.
 * Segments are drawn clockwise with segment 0 centered at the top.
 * CSS rotate() moves the wheel clockwise.
 */

export function getSegmentAngle(segmentCount: number): number {
  return 360 / segmentCount;
}

/**
 * Given final rotation degrees (clockwise), return the winning segment index.
 */
export function getWinningIndex(
  rotationDegrees: number,
  segmentCount: number,
): number {
  const segmentAngle = getSegmentAngle(segmentCount);
  const normalized = ((rotationDegrees % 360) + 360) % 360;
  // Clockwise rotation brings the previous (counterclockwise) segments under the pointer.
  return (
    Math.floor(((360 - normalized + segmentAngle / 2) % 360) / segmentAngle) %
    segmentCount
  );
}

/**
 * Target rotation so that `targetIndex` lands under the pointer,
 * with several full spins and a slight random offset within the segment.
 */
export function computeSpinRotation(
  currentRotation: number,
  targetIndex: number,
  segmentCount: number,
  minSpins = 4,
  maxSpins = 7,
): number {
  const segmentAngle = getSegmentAngle(segmentCount);
  const spins =
    minSpins + Math.floor(Math.random() * (maxSpins - minSpins + 1));

  // Stay away from segment edges so the result is unambiguous.
  const edgePad = segmentAngle * 0.15;
  const offset =
    -segmentAngle / 2 +
    edgePad +
    Math.random() * (segmentAngle - edgePad * 2);

  // Rotation that places targetIndex under the top pointer.
  const targetAbsolute =
    (((-targetIndex * segmentAngle + offset) % 360) + 360) % 360;

  const currentNormalized = ((currentRotation % 360) + 360) % 360;
  let delta = targetAbsolute - currentNormalized;
  if (delta <= 0) delta += 360;

  return currentRotation + spins * 360 + delta;
}
