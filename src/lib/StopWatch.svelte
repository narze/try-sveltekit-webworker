<script lang="ts">
	import { onDestroy } from 'svelte';

	function createTimer(elapsed: number = 0) {
		const start = performance.now();
		return () => Math.floor(performance.now() - start + elapsed);
	}

	let interval: ReturnType<typeof setInterval>;
	let isRunning = false;
	let elapsed = 0;
	let laps: number[] = [];
	$: timeDisplay = displayTime(elapsed);
	$: lapsDisplay = laps.map(displayTime);
	$: lapElapsed = elapsed - (laps.slice(-1)[0] || 0);

	function displayTime(elapsed: number) {
		const seconds = Math.floor(elapsed / 1000) % 60;
		const minutes = Math.floor(elapsed / 1000 / 60) % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${elapsed
			.toString()
			.slice(-3)
			.padStart(3, '0')}`;
	}

	function startTimer() {
		if (isRunning) return;

		isRunning = true;
		const timer = createTimer(elapsed);

		interval = setInterval(() => {
			elapsed = timer();
		}, 1);
	}

	function pauseTimer() {
		if (!isRunning) return;

		isRunning = false;
		clearInterval(interval);
	}

	function resetTimer() {
		pauseTimer();
		elapsed = 0;
		laps = [];
	}

	function addLap() {
		laps = [...laps, elapsed];
	}

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<h1>Timer</h1>

<div>
	<h3>{timeDisplay}</h3>
	{#if lapElapsed != elapsed}
		<h4>Lap: {displayTime(lapElapsed)}</h4>
	{/if}
	<div>
		{#if !isRunning}
			<button on:click={startTimer}>Start</button>
		{:else}
			<button on:click={pauseTimer}>Stop</button>
			<button on:click={addLap}>Add Lap</button>
		{/if}
	</div>
	<div>
		{#if elapsed > 0}
			<button on:click={resetTimer}>Reset</button>
		{/if}
	</div>

	{#each lapsDisplay as lap}
		<p>{lap}</p>
	{/each}
</div>
