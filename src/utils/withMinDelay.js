/**
 * Waits for `promise` and ensures at least `minMs` milliseconds elapse
 * before resolving or rejecting.
 * @template T
 * @param {number} minMs
 * @param {Promise<T>} promise
 * @returns {Promise<T>}
 */
export async function withMinDelay(minMs, promise) {
  const start = Date.now();
  try {
    const result = await promise;
    const elapsed = Date.now() - start;
    if (elapsed < minMs) {
      await new Promise((resolve) => setTimeout(resolve, minMs - elapsed));
    }
    return result;
  } catch (err) {
    const elapsed = Date.now() - start;
    if (elapsed < minMs) {
      await new Promise((resolve) => setTimeout(resolve, minMs - elapsed));
    }
    throw err;
  }
}
