<script lang="ts">
	import { fly, crossfade } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';

	const [send, receive] = crossfade({});

	let todos: { id: string; title: string; done: boolean }[] = [
		{
			id: crypto.randomUUID(),
			title: 'Learn Svelte',
			done: false
		},
		{
			id: crypto.randomUUID(),
			title: 'Hello?',
			done: false
		}
	];

	$: todosNotDone = todos.filter((todo) => !todo.done);
	$: todosDone = todos.filter((todo) => todo.done);

	let value = '';
	let message = '';

	const submit = (e: Event) => {
		if (value !== '') {
			todos = [...todos, { id: crypto.randomUUID(), title: value, done: false }];
			value = '';
			message = '';
		} else {
			message = 'Il me faut un titre !';
		}
	};
</script>

<svelte:head>
	<title>Bonjour</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

<center>
	<h1>Welcome to ESGI</h1>
	<h3>My todo list</h3>
</center>

<div class="flex">
	<div class="column">
		<h4>Todo</h4>
		{#each todosNotDone as { title, done, id } (id)}
			<div in:receive={{ key: id }} out:send={{ key: id }}>
				<input {id} type="checkbox" bind:checked={done} />
				<label for={id}>{title}</label>
			</div>
		{/each}
		<form on:submit={submit} class="flex">
			<input bind:value />
			<button>Add</button>
		</form>
		{#if message}
			<p transition:fly={{ easing: backInOut, x: -150 }} style="color: red">{message}</p>
		{/if}
	</div>
	<div class="column">
		<h4>Done</h4>
		{#each todosDone as { title, done, id } (id)}
			<div in:receive={{ key: id }} out:send={{ key: id }}>
				<input {id} type="checkbox" bind:checked={done} />
				<label for={id}>{title}</label>
			</div>
		{/each}
	</div>
</div>

<style>
	.flex {
		display: flex;
		margin-top: 0.5rem;
	}

	.column {
		padding: 0 1rem 1rem 1rem;
		margin: 0.5rem;
		width: 50%;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
	}
</style>
