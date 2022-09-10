import { readable } from 'svelte/store';

import { browser } from '$app/environment';
export const clock = readable(new Date(), function start(set) {
	function setDate() {
		const date = new Date();

		set(date);

		return setTimeout(() => {
			// console.log({ s: date.getSeconds(), ms: date.getMilliseconds() });

			t = setDate();
			// console.log({ t });
		}, 1000 - date.getMilliseconds());
	}

	let t = setDate();
	// console.log('Initial', { t });

	return function stop() {
		// console.log('stopped');

		clearTimeout(t);
	};
});

export const clockWithWorkerTimeout = readable(new Date(), function start(set) {
	let clockWorker: Worker | undefined = undefined;

	(async () => {
		if (browser) {
			const ClockWorker = await import('$lib/stores/clock-worker?worker');
			clockWorker = new ClockWorker.default();

			clockWorker.postMessage({ cmd: 'start' });

			clockWorker.onmessage = () => {
				const date = new Date();

				set(date);
			};
		}
	})();

	// console.log('Initial', { t });

	return function stop() {
		// console.log('stopped');

		clockWorker?.postMessage({ cmd: 'stop' });
	};
});
