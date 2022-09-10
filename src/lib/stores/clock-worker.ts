let t: NodeJS.Timeout;

onmessage = (e) => {
	function setDate() {
		const date = new Date();

		postMessage({ date });
		// set(date);

		return setTimeout(() => {
			console.log({ s: date.getSeconds(), ms: date.getMilliseconds() });

			t = setDate();
			// console.log({ t });
		}, 1000 - date.getMilliseconds());
	}

	if (e.data['cmd'] == 'start') {
		console.log('Worker starting');

		t = setDate();
	} else if (e.data['cmd'] == 'stop') {
		console.log('Worker stopping');

		clearTimeout(t);
	}
};

export {};
