<script lang="ts">
	import Clock from '$lib/Clock.svelte';
	import ClockWorker from '$lib/ClockWorker.svelte';
	import { clockWithWorkerTimeout as clock } from '$lib/stores/clock';
</script>

<svelte:head>
	<title>{$clock.toISOString() + '.' + $clock.getMilliseconds()}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Clock</h1>

	<!-- <Clock /> -->
	<ClockWorker />

	<div>
		Time: {$clock.toLocaleTimeString()}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
