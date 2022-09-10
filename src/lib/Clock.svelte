<script lang="ts">
	import { spring } from 'svelte/motion';
	import { clock } from '$lib/stores/clock';

	const displayed_seconds = spring();
	$: displayed_seconds.set($clock.getSeconds() % 10);
	$: seconds_offset = modulo($displayed_seconds, 10);

	const displayed_tens = spring();
	$: displayed_tens.set(Math.floor($clock.getSeconds() / 10));
	$: tens_offset = modulo($displayed_tens, 6);

	const displayed_minutes = spring();
	$: displayed_minutes.set(Math.floor($clock.getMinutes() % 10));
	$: minutes_offset = modulo($displayed_minutes, 10);

	const displayed_ten_minutes = spring();
	$: displayed_ten_minutes.set(Math.floor($clock.getMinutes() / 10));
	$: ten_minutes_offset = modulo($displayed_ten_minutes, 6);

	const displayed_hours = spring();
	$: displayed_hours.set(Math.floor($clock.getHours() % 10));
	$: hours_offset = modulo($displayed_hours, 10);

	const displayed_ten_hours = spring();
	$: displayed_ten_hours.set(Math.floor($clock.getHours() / 10));
	$: ten_hours_offset = modulo($displayed_ten_hours, 6);

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<!-- {$displayed_seconds}
{seconds_offset} -->

<div class="clock">
	<div class="clock-viewport">
		<div class="clock-digits" style="transform: translate(0, {-100 * ten_hours_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
		<div class="clock-digits" style="transform: translate(0, {-100 * hours_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
		<div class="clock-digits"><strong>:</strong></div>
		<div class="clock-digits" style="transform: translate(0, {-100 * ten_minutes_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
		<div class="clock-digits" style="transform: translate(0, {-100 * minutes_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
		<div class="clock-digits"><strong>:</strong></div>
		<div class="clock-digits" style="transform: translate(0, {-100 * tens_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
		<div class="clock-digits" style="transform: translate(0, {-100 * seconds_offset}%)">
			<div><strong>0</strong></div>
			<div><strong>1</strong></div>
			<div><strong>2</strong></div>
			<div><strong>3</strong></div>
			<div><strong>4</strong></div>
			<div><strong>5</strong></div>
			<div><strong>6</strong></div>
			<div><strong>7</strong></div>
			<div><strong>8</strong></div>
			<div><strong>9</strong></div>
		</div>
	</div>
</div>

<style>
	.clock {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.clock-viewport {
		width: 20em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
		display: flex;
		justify-content: center;
		gap: 0.1em;
	}

	.clock-viewport strong {
		/* position: absolute; */
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--accent-color);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.clock-digits {
		height: 100%;
	}

	.clock-digits div {
		height: 100%;
	}
</style>
