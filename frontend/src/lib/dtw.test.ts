import { dtwDistance, euclideanDistance, frameDistance, sequenceDistance, normalizeSequence, type Point, type LandmarkFrame, type LandmarkSequence } from "./dtw";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

function runTests() {
  console.log("=== DTW Tests ===\n");

  console.log("--- Basic dtwDistance (numeric arrays) ---");
  
  const seq1 = [1, 2, 3, 4, 5];
  const seq2 = [1, 2, 3, 4, 5];
  const dist1 = dtwDistance(seq1, seq2, (a, b) => Math.abs(a - b));
  assert(dist1 === 0, "Identical sequences give distance 0");

  const seq3 = [1, 2, 3, 4, 5];
  const seq4 = [1, 2, 3, 4, 5, 6, 7];
  const dist2 = dtwDistance(seq3, seq4, (a, b) => Math.abs(a - b));
  assert(dist2 >= 0, "Different length sequences produce valid distance");
  console.log(`  Distance between [1,2,3,4,5] and [1,2,3,4,5,6,7]: ${dist2.toFixed(2)}`);

  const seq5 = [1, 2, 3, 4, 5];
  const seq6 = [10, 20, 30, 40, 50];
  const dist3 = dtwDistance(seq5, seq6, (a, b) => Math.abs(a - b));
  assert(dist3 > dist1, "Clearly different sequences give larger distance");
  console.log(`  Distance between [1,2,3,4,5] and [10,20,30,40,50]: ${dist3.toFixed(2)}`);

  console.log("\n--- Euclidean distance (Point) ---");
  const p1: Point = { x: 0, y: 0, z: 0 };
  const p2: Point = { x: 3, y: 4, z: 0 };
  assert(euclideanDistance(p1, p2) === 5, "3-4-5 triangle gives distance 5");

  const p3: Point = { x: 1, y: 1, z: 1 };
  const p4: Point = { x: 1, y: 1, z: 1 };
  assert(euclideanDistance(p3, p4) === 0, "Identical points give distance 0");

  console.log("\n--- Frame distance (LandmarkFrame) ---");
  const frameA: LandmarkFrame = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];
  const frameB: LandmarkFrame = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];
  assert(frameDistance(frameA, frameB) === 0, "Identical frames give distance 0");

  const frameC: LandmarkFrame = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 0, y: 10 },
  ];
  const frameDist = frameDistance(frameA, frameC);
  assert(frameDist > 0, "Different frames give positive distance");
  console.log(`  Frame distance: ${frameDist.toFixed(2)}`);

  console.log("\n--- Sequence distance (LandmarkSequence) ---");
  const seqA: LandmarkSequence = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    [{ x: 0.1, y: 0 }, { x: 1.1, y: 0 }],
    [{ x: 0.2, y: 0 }, { x: 1.2, y: 0 }],
  ];
  const seqB: LandmarkSequence = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    [{ x: 0.1, y: 0 }, { x: 1.1, y: 0 }],
    [{ x: 0.2, y: 0 }, { x: 1.2, y: 0 }],
  ];
  const seqDist1 = sequenceDistance(seqA, seqB);
  assert(seqDist1 === 0, "Identical landmark sequences give distance 0");

  const seqC: LandmarkSequence = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    [{ x: 0.1, y: 0 }, { x: 1.1, y: 0 }],
    [{ x: 0.2, y: 0 }, { x: 1.2, y: 0 }],
    [{ x: 0.3, y: 0 }, { x: 1.3, y: 0 }],
    [{ x: 0.4, y: 0 }, { x: 1.4, y: 0 }],
  ];
  const seqDist2 = sequenceDistance(seqA, seqC);
  assert(seqDist2 >= 0, "Different length sequences work");
  console.log(`  Distance (3 frames vs 5 frames): ${seqDist2.toFixed(4)}`);

  const seqD: LandmarkSequence = [
    [{ x: 100, y: 100 }, { x: 200, y: 200 }],
    [{ x: 100, y: 100 }, { x: 200, y: 200 }],
    [{ x: 100, y: 100 }, { x: 200, y: 200 }],
  ];
  const seqDist3 = sequenceDistance(seqA, seqD);
  assert(seqDist3 > seqDist1, "Clearly different sequences give larger distance");
  console.log(`  Distance (different position): ${seqDist3.toFixed(2)}`);

  console.log("\n--- Normalize sequence ---");
  const rawSeq: LandmarkSequence = [
    [{ x: 100, y: 200 }, { x: 150, y: 250 }],
    [{ x: 110, y: 210 }, { x: 160, y: 260 }],
  ];
  const normalized = normalizeSequence(rawSeq);
  for (const frame of normalized) {
    for (const p of frame) {
      assert(p.x >= 0 && p.x <= 1, `x normalized: ${p.x}`);
      assert(p.y >= 0 && p.y <= 1, `y normalized: ${p.y}`);
    }
  }
  console.log("  Normalized coordinates are in [0, 1] range");

  console.log("\n=== All tests passed ===");
}

runTests();