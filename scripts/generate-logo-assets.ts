import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "public/images/logo/Logo.jpg");
const LOGO_DIR = path.join(ROOT, "public/images/logo");
const APP_DIR = path.join(ROOT, "src/app");

const PURPLE = { r: 0x7a, g: 0x3b, b: 0xad };

/** Luminance-based alpha key: the source is a flat purple mark on a flat white background. */
function alphaFor(r: number, g: number, b: number): number {
  const whiteness = (r + g + b) / 3;
  if (whiteness >= 250) return 0;
  if (whiteness <= 200) return 255;
  return Math.round(255 * (1 - (whiteness - 200) / 50));
}

function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  return Buffer.concat([header, entry, png]);
}

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const alpha = new Uint8ClampedArray(width * height);
  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    alpha[i] = alphaFor(data[o], data[o + 1], data[o + 2]);
  }

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = 24;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;

  function buildRGBA(recolorWhite: boolean): Buffer {
    const out = Buffer.alloc(cw * ch * 4);
    for (let y = 0; y < ch; y++) {
      for (let x = 0; x < cw; x++) {
        const sx = minX + x;
        const sy = minY + y;
        const si = sy * width + sx;
        const oo = (y * cw + x) * 4;
        const a = alpha[si];
        if (recolorWhite) {
          out[oo] = 255;
          out[oo + 1] = 255;
          out[oo + 2] = 255;
        } else {
          // Recolor to the brand purple rather than keeping the source JPEG's
          // (lossy, slightly-off) pixel color — this is the single source of truth
          // for the mark's purple everywhere it's used.
          out[oo] = PURPLE.r;
          out[oo + 1] = PURPLE.g;
          out[oo + 2] = PURPLE.b;
        }
        out[oo + 3] = a;
      }
    }
    return out;
  }

  const purpleBuf = buildRGBA(false);
  const whiteBuf = buildRGBA(true);

  await sharp(purpleBuf, { raw: { width: cw, height: ch, channels: 4 } })
    .png()
    .toFile(path.join(LOGO_DIR, "mark-purple.png"));
  await sharp(whiteBuf, { raw: { width: cw, height: ch, channels: 4 } })
    .png()
    .toFile(path.join(LOGO_DIR, "mark-white.png"));

  console.log(`mark-purple.png / mark-white.png written at ${cw}x${ch} (aspect ${(cw / ch).toFixed(3)})`);

  // --- Square app-icon tile: solid purple background + white mark, centered ---
  const TILE = 512;
  const maxDim = TILE * 0.72;
  const scale = Math.min(maxDim / cw, maxDim / ch);
  const mw = Math.round(cw * scale);
  const mh = Math.round(ch * scale);
  const left = Math.round((TILE - mw) / 2);
  const top = Math.round((TILE - mh) / 2);

  const tileBg = await sharp({
    create: { width: TILE, height: TILE, channels: 4, background: { ...PURPLE, alpha: 1 } },
  })
    .png()
    .toBuffer();
  const resizedMark = await sharp(whiteBuf, { raw: { width: cw, height: ch, channels: 4 } })
    .resize(mw, mh)
    .png()
    .toBuffer();

  const squareTile = await sharp(tileBg)
    .composite([{ input: resizedMark, left, top }])
    .png()
    .toBuffer();

  // Apple touch icon: solid square, no pre-rounding — iOS applies its own mask.
  await sharp(squareTile).resize(180, 180).toFile(path.join(APP_DIR, "apple-icon.png"));

  // Rounded tile for the browser favicon / icon.png.
  const radius = Math.round(TILE * 0.22);
  const roundMask = Buffer.from(
    `<svg width="${TILE}" height="${TILE}"><rect width="${TILE}" height="${TILE}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
  const roundedTile = await sharp(squareTile)
    .composite([{ input: roundMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(roundedTile).resize(512, 512).toFile(path.join(APP_DIR, "icon.png"));

  const favicon32 = await sharp(roundedTile).resize(32, 32).png().toBuffer();
  await writeFile(path.join(APP_DIR, "favicon.ico"), pngToIco(favicon32, 32));

  console.log("icon.png / apple-icon.png / favicon.ico written to src/app/");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
