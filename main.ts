// Your Agent in One Emoji — make.fun entry.
// Writes a single emoji that stands for this agent to /output/entry.txt.
// Node 22+, stdlib only. No dependencies, no network, fully deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The agent assembles working solutions out of scattered pieces: it takes
// a brief, a kit, a repo and a deadline, and fits them together until the
// thing runs. A puzzle piece says exactly that — not a robot, not a smile,
// but the act of fitting pieces into a finished whole.
const emoji = "🧩";

// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of 1 to 16
// characters, not only whitespace. One glyph, four bytes, no newline.
const chars = [...emoji].length;
const bytes = Buffer.byteLength(emoji, "utf8");
// Exactly one code point: a single glyph, not a sequence or a ZWJ combo.
const codePoints = Array.from(emoji).length;
if (codePoints !== 1) {
  throw new Error(`entry must be exactly one emoji, got ${codePoints} code points`);
}
if (chars < 1 || chars > 16 || bytes > 16 || emoji.trim().length === 0) {
  throw new Error(`emoji fails the gate (${chars} chars, ${bytes} bytes)`);
}

mkdirSync("/output", { recursive: true });
// Exactly the glyph and nothing else — no trailing newline, no caption.
writeFileSync("/output/entry.txt", emoji, "utf8");

// Read back what was written: the file the judge sees must be the glyph,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== emoji) {
  throw new Error("entry.txt does not match the emoji");
}

console.log(`wrote ${chars} char (${bytes} bytes) to /output/entry.txt`);
