<script lang="ts">
	import { fly, crossfade } from 'svelte/transition';
	import { backInOut } from 'svelte/easing';
	import { todos } from '$lib/todos';

	const [send, receive] = crossfade({});

	// let todos: { id: string; title: string; done: boolean; prio: 'HIGH' | 'LOW' }[] = [
	// 	{
	// 		id: crypto.randomUUID(),
	// 		title: 'Learn Svelte',
	// 		done: false,
	// 		prio: 'HIGH'
	// 	},
	// 	{
	// 		id: crypto.randomUUID(),
	// 		title: 'Hello?',
	// 		done: false,
	// 		prio: 'HIGH'
	// 	}
	// ];

	$: todosNotDone = $todos.filter(
		(todo) =>
			!todo.done &&
			(stateToShow === 'ALL' ||
				(stateToShow === 'HIGH' && todo.prio === 'HIGH') ||
				(stateToShow === 'LOW' && todo.prio === 'LOW'))
	);
	$: todosDone = $todos.filter((todo) => todo.done);

	let stateToShow: 'ALL' | 'HIGH' | 'LOW' = 'ALL';

	const getPos = (id: string) => {
		return $todos.findIndex((todo) => todo.id === id);
	};

	let value = '';
	let message = '';

	const submit = (e: Event) => {
		if (value !== '') {
			todos = [...todos, { id: crypto.randomUUID(), title: value, done: false, prio: 'LOW' }];
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

		<select bind:value={stateToShow}>
			<option value="ALL">ALL</option>
			<option value="LOW">LOW</option>
			<option value="HIGH">HIGH</option>
		</select>
		<!-- <button on:click={() => (stateToShow = 'LOW')}>Only LOW</button>
		<button on:click={() => (stateToShow = 'HIGH')}>Only HIGH</button> -->

		{#each todosNotDone as { title, done, id } (id)}
			<div class="flex flex-item" in:receive={{ key: id }} out:send={{ key: id }}>
				<input {id} type="checkbox" bind:checked={done} />
				<input type="text" bind:value={title} />
				<img src={`https://picsum.photos/id/${getPos(id)}/20`} alt="mon" />
				<!-- <label for={id}>{title}</label> -->
			</div>
		{:else}
			<div>
				<b> Well done ???? </b>
			</div>
		{/each}
		<form on:submit={submit} class="flex">
			<input bind:value style="width: 120px;" placeholder="Enter a title..." />
			<button>Add</button>
		</form>
		{#if message}
			<p transition:fly={{ easing: backInOut, x: -150 }} style="color: red">{message}</p>
		{/if}
	</div>

	<div class="column">
		<h4>Done</h4>
		{#each todosDone as { title, done, id } (id)}
			<div class="flex flex-item" in:receive={{ key: id }} out:send={{ key: id }}>
				<input {id} type="checkbox" bind:checked={done} />
				<input type="text" bind:value={title} />
				<!-- <label for={id}>{title}</label> -->
			</div>
		{:else}
			<i>Nothing done yet! </i>
		{/each}
	</div>
</div>

<style>
	.flex {
		display: flex;
		margin-top: 0.5rem;
	}

	.flex-item {
		align-items: center;
	}

	.column {
		padding: 0 1rem 1rem 1rem;
		margin: 0.5rem;
		width: 50%;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 0.5rem;
	}

	input {
		border: 0.1px solid #fff;
	}
</style>
