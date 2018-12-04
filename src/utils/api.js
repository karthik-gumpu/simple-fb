import Promise from 'bluebird';
import $ from 'jquery';

import { API_URL } from './../constants';

Promise.config({
	cancellation: true,
});

export default function api(options) {
	const configs = {
        ...options,
        url: `${API_URL}${options.url}`,
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
