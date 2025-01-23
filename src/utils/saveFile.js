import { saveAs } from "file-saver";

/**
 * Saves a Blob as a file with a timestamped filename.
 * @param {Blob} blob - The Blob to save.
 * @param {string} [prefix="screenshot"] - The prefix for the filename.
 */
export const saveFile = (blob, prefix = "screenshot") => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  saveAs(blob, `${prefix}-${timestamp}.png`);
};
