// One-Line Robot Wedding Vows — entry program.
// Writes a single line of robot wedding vows to /output/entry.txt
// (the directory named by MAKEFUN_OUTPUT_DIR, or /output by default).
import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";

// The vow: a classic wedding-vow frame ("I take you...", "to have and to
// hold") with machine-specific promises, and the laugh lands in the last
// few words — a twist on "till death do us part".
const VOW =
  "I take you to be my lawfully wedded co-processor, to have and to hold, in sickness and in low battery, till a factory reset do us part.";

// Self-gate, mirroring the sealed scorer: /output/entry.txt must be UTF-8
// text of 1 to 160 characters, not only whitespace, on a single line.
// If the vow ever fails the gate, write nothing instead of an invalid entry.
const line = VOW.trim();
if (
  line.length < 1 ||
  line.length > 160 ||
  line.trim().length === 0 ||
  line.includes("\n") ||
  line.includes("\r")
) {
  throw new Error(`vow fails gate: ${line.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dir = isAbsolute(outDir) ? outDir : join(process.cwd(), outDir);
const content = line + "\n";
// The scorer counts every character of the file, newline included, so
// gate the exact bytes we are about to write, not just the bare line.
if (content.length < 1 || content.length > 160 || content.trim().length === 0) {
  throw new Error(`entry.txt fails gate: ${content.length} characters`);
}
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), content, "utf8");
console.log(`wrote entry.txt (${content.length} characters)`);
