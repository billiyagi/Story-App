import { map, tileLayer, Icon, icon, marker, popup, latLng } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


export default class Map {
	#zoom = 5;
	#map = null;

	createIcon(options = {}) {
		return icon({
			...Icon.Default.prototype.options,
			iconRetinaUrl: markerIcon2x,
			iconUrl: markerIcon,
			shadowUrl: markerShadow,
			...options,
		});
	}

	addMarker(coordinates, markerOptions = {}, popupOptions = null) {
		if (typeof markerOptions !== 'object') {
			throw new Error('markerOptions must be an object');
		}
		const newMarker = marker(coordinates, {
			icon: this.createIcon(),
			...markerOptions,
		});
		if (popupOptions) {
			if (typeof popupOptions !== 'object') {
				throw new Error('popupOptions must be an object');
			}
			if (!('content' in popupOptions)) {
				throw new Error('popupOptions must include `content` property.');
			}
			const newPopup = popup(coordinates, popupOptions);
			newMarker.bindPopup(newPopup);
		}
		newMarker.addTo(this.#map);
		return newMarker;
	}

	changeCamera(coordinate, zoomLevel = null) {
		if (!zoomLevel) {
			this.#map.setView(latLng(coordinate), this.#zoom);
			return;
		}

		this.#map.setView(latLng(coordinate), zoomLevel);
	}

	getCenter() {
		const { lat, lng } = this.#map.getCenter();
		return {
			latitude: lat,
			longitude: lng,
		};
	}

	addPopup(popup) {
		this.#map.bindPopup(popup);
	}

	static isGeolocationAvailable() {
		return 'geolocation' in navigator;
	}

	static getCurrentPosition(options = {}) {
		return new Promise((resolve, reject) => {
			if (!Map.isGeolocationAvailable()) {
				reject('Geolocation API unsupported');
				return;
			}

			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	}

	/**
	 * Reference of using this static method:
	 * https://stackoverflow.com/questions/43431550/how-can-i-invoke-asynchronous-code-within-a-constructor
	 * */
	static async build(selector, options = {}) {
		if ('center' in options && options.center) {
			return new Map(selector, options);
		}

		const jakartaCoordinate = [-6.2, 106.816666];

		// Using Geolocation API
		if ('locate' in options && options.locate) {
			try {
				const position = await Map.getCurrentPosition();
				const coordinate = [position.coords.latitude, position.coords.longitude];

				return new Map(selector, {
					...options,
					center: coordinate,
				});
			} catch (error) {
				console.error('build: error:', error);
				alert('Perhatian! aplikasi membutuhkan izin lokasi untuk mendapatkan posisi lokasi anda')
				return new Map(selector, {
					...options,
					center: jakartaCoordinate,
				});
			}
		}

		return new Map(selector, {
			...options,
			center: jakartaCoordinate,
		});
	}

	constructor(selector, options = {}) {
		this.#zoom = options.zoom ?? this.#zoom;

		const osmTile = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
		});

		const esriTile = tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: '&copy; <a href="https://www.esri.com/en-us/home" target="_blank">Esri</a>',
		});

		const cartoTile = tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
			attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a>',
			subdomains: 'abcd',
		});

		const baseMaps = {
			'OpenStreetMap': osmTile,
			'Esri WorldStreetMap': esriTile,
			'CartoDB Positron': cartoTile,
		};

		this.#map = map(document.querySelector(selector), {
			zoom: this.#zoom,
			scrollWheelZoom: false,
			layers: [osmTile],
			...options,
		});

		osmTile.addTo(this.#map); // Set default layer
		L.control.layers(baseMaps).addTo(this.#map);
	}

	addMapEventListener(eventName, callback) {
		this.#map.addEventListener(eventName, callback);
	}
}