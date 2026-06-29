import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const initial = browser ? localStorage.getItem('theme') || 'light' : 'light';

export const theme = writable(initial);

if (browser) {
  theme.subscribe((value) => {
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
  });
}

export function toggleTheme() {
  theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
}
