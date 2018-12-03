import Promise from 'bluebird';

Promise.config({
	cancellation: true,
});

export default function api(options) {
	const configs = {
        ...options,
        url: `https://my-json-server.typicode.com/keenkarthik/fake-db${options.url}`,
	};
	const requestPromise = new Promise(((resolve, reject, onCancel) => {
		const request = $.ajax({...configs, 
			cache: false,
			crossDomain: true,
			dataType: 'json',
			
			success(success) {
				resolve(success);
			},
			error(error) {
				reject(error);
			},
		});
		onCancel(() => {
			request.abort();
		});
	}));
	return requestPromise;
}
