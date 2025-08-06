// src/utils/offlineFetch.js
import localforage from 'localforage';

export async function offlineFetch(url, key) {
  try {
    // Try network fetch
    const response = await fetch(url);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // Save to offline cache
    await localforage.setItem(key, data);

    return data;
  } catch (err) {
    console.warn('Fetching from cache due to offline or error:', err.message);

    // Try to get from cache
    const cached = await localforage.getItem(key);
    if (cached) return cached;

    throw new Error('No cached data found');
  }
}
