export interface Point {
  x: number;
  y: number;
  z?: number;
}

export type LandmarkFrame = Point[];
export type LandmarkSequence = LandmarkFrame[];

export function dtwDistance<T>(
  seqA: T[],
  seqB: T[],
  distanceFn: (a: T, b: T) => number
): number {
  const n = seqA.length;
  const m = seqB.length;

  if (n === 0 || m === 0) {
    return Infinity;
  }

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(Infinity)
  );

  dp[0][0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = distanceFn(seqA[i - 1], seqB[j - 1]);
      dp[i][j] = cost + Math.min(
        dp[i - 1][j],     // insertion
        dp[i][j - 1],     // deletion
        dp[i - 1][j - 1]  // match
      );
    }
  }

  return dp[n][m];
}

export function euclideanDistance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z ?? 0) - (b.z ?? 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function frameDistance(frameA: LandmarkFrame, frameB: LandmarkFrame): number {
  const minLen = Math.min(frameA.length, frameB.length);
  if (minLen === 0) return Infinity;

  let sum = 0;
  for (let i = 0; i < minLen; i++) {
    sum += euclideanDistance(frameA[i], frameB[i]);
  }
  return sum / minLen;
}

export function sequenceDistance(seqA: LandmarkSequence, seqB: LandmarkSequence): number {
  return dtwDistance(seqA, seqB, frameDistance);
}

export function normalizeSequence(seq: LandmarkSequence): LandmarkSequence {
  if (seq.length === 0) return seq;

  const allPoints = seq.flat();
  if (allPoints.length === 0) return seq;

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (const p of allPoints) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
    minZ = Math.min(minZ, p.z ?? 0);
    maxZ = Math.max(maxZ, p.z ?? 0);
  }

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const rangeZ = maxZ - minZ || 1;

  return seq.map(frame =>
    frame.map(p => ({
      x: (p.x - minX) / rangeX,
      y: (p.y - minY) / rangeY,
      z: ((p.z ?? 0) - minZ) / rangeZ,
    }))
  );
}