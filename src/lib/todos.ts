import { writable } from 'svelte/store';

type Todo = { id: string; title: string; done: boolean; prio: 'HIGH' | 'LOW' };

import { browser } from '$app/environment';
export const todos = writable<Todo[]>([
	{
		id: crypto.randomUUID(),
		title: 'Learn Svelte',
		done: false,
		prio: 'HIGH'
	},
	{
		id: crypto.randomUUID(),
		title: 'Hello?',
		done: false,
		prio: 'HIGH'
	}
]);

// export const todos = writable<Todo[]>(browser && JSON.parse(localStorage.getItem('todos') || []));

// // to finish...
// todos.subscribe((value) => {
// 	if (browser) {
// 		localStorage.todos = JSON.stringify(value);
// 	}
// });
