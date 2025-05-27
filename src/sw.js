import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Inject manifest di bawah oleh VitePWA
precacheAndRoute(self.__WB_MANIFEST);

// API cache
registerRoute(
	({ url }) => url.origin === 'https://story-api.dicoding.dev/v1',
	new NetworkFirst({
		cacheName: 'story-api-cache',
		networkTimeoutSeconds: 10,
	})
);

// Cache navigasi (HTML)
registerRoute(
	({ request }) => request.mode === 'navigate',
	new NetworkFirst({
		cacheName: 'html-cache',
	})
);

// Asset (CSS/JS)
registerRoute(
	({ request }) =>
		['style', 'script', 'worker'].includes(request.destination),
	new StaleWhileRevalidate({
		cacheName: 'assets-cache',
	})
);

// 🔔 Notifikasi Push
self.addEventListener('push', (event) => {
	async function handlePush() {
		let data = {};

		try {
			// Coba parse sebagai JSON
			data = event.data ? await event.data.json() : {};
		} catch (err) {
			// Kalau gagal parse JSON, fallback ke text
			console.warn('Push data bukan JSON:', err);
			const text = event.data ? await event.data.text() : 'No content';
			data = {
				title: 'Notifikasi',
				options: {
					body: text
				},
				url: '/'
			};
		}

		await self.registration.showNotification(data.title || 'Notifikasi', {
			icon: '/favicon-192x192.png',
			body: data.options?.body || '',
			data: data.url || '/'
		});
	}

	event.waitUntil(handlePush());
});


self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	event.waitUntil(
		clients.openWindow(event.notification.data)
	);
});
