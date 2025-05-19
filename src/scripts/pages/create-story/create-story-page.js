import Map from "../../utils/map";
import Camera from "../../utils/camera";
import CreateStoryPresenter from "./create-story-presenter";
import * as StoryAPI from '../../data/api'

export default class CreateStoryPage {
	#presenter = null;
	#coordinate;
	#form;
	#camera;
	#isCameraOpen = false;
	#takenPictureResult;

	async render() {
		return `
		<section class="container">
			<form class="form-control" id="guest-create-story-form" method="POST">
				<div class="form-control__header">
					<h1 class="form-control__heading">Create new story</h1>
				</div>

				<div class="form-control__input-group">
					<label for="description-input">Deskripsi</label>
					<textarea name="description" id="description-input" rows="7"></textarea>
				</div>

				<div class="form-control__document__container">
					<label for="pick-picture">Pilih Gambar</label>
					<input type="file" name="pick-picture" id="pick-picture" class="form-control__document__input">
					<div class="flex gap-1">
						<button type="button" class="form-control__btn transition" id="pick-picture-btn">Ambil Gambar</button>
						<button type="button" class="form-control__btn transition" id="open-documentations-camera-button">Buka Kamera</button>
					</div>

					<div class="form-control__camera__container" id="camera-container">
						<video id="camera-video" class="new-form__camera__video">
							Video stream not available.
						</video>
						<canvas id="camera-canvas" class="new-form__camera__canvas"></canvas>

						<div class="form-control__camera__tools">
							<select id="camera-select">
							</select>
							<div class="form-control__camera__tools_buttons">
								<button id="camera-take-button" class="form-control__btn__filled" type="button">
									Tangkap Gambar Kamera
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="form-control__location__container">
					<div class="form-control__title">Pilih Lokasi</div>
					<div id="map" class="form-control__location__maps"></div>
					<div class="form-control__location_latlng">
						<input name="longtitude-input" id="generate-longtitude-input" disabled>
						<input name="latitude-input" id="generate-latitude-input" disabled>
					</div>
					<small>*pilih lokasi dengan melakukan pin poin terhadap titik yang dipilih</small>
				</div>

				<button type="submit" class="action-button__filled" name="submit">Submit Story</button>
			</form>
		</section>
		
		`;
	}

	async afterRender() {
		this.#presenter = new CreateStoryPresenter({
			view: this,
			model: StoryAPI,
		})

		await this.setupSelectionMap()
		this.#setupForm();
	}

	#setupForm() {
		this.#form = document.querySelector('#guest-create-story-form');

		this.#form.addEventListener('submit', async (event) => {
			event.preventDefault();
			console.log(this.#takenPictureResult);
			console.log(this.#coordinate);

			return await this.#presenter.handleSendStoryGuest({
				description: document.querySelector('#description-input').value,
				photo: this.#takenPictureResult,
				lat: this.#coordinate.lat,
				lon: this.#coordinate.lng
			})
		})

		/** 
		 * Pick picture from storage
		*/
		document.querySelector('#pick-picture-btn').addEventListener('click', () => {
			this.#form.elements.namedItem('pick-picture').click();
		})

		/** 
		 * Open the camera
		*/
		const cameraContainer = document.getElementById('camera-container');

		document.querySelector('#open-documentations-camera-button').addEventListener('click', async (event) => {
			cameraContainer.classList.toggle('camera__open')
			this.#isCameraOpen = cameraContainer.classList.contains('camera__open')

			// Launch Camera
			if (this.#isCameraOpen) {
				event.currentTarget.textContent = 'Tutup Kamera'
				this.#setupCamera()
				this.#camera.launch();

				return;
			}

			event.currentTarget.textContent = 'Buka Kamera';
			this.#camera.stop();
		})
	}

	#setupCamera() {
		if (this.#camera) {
			this.#camera.stop();
			this.#camera = null;
		}

		this.#camera = new Camera({
			video: document.querySelector('#camera-video'),
			cameraSelect: document.querySelector('#camera-select'),
			canvas: document.getElementById('camera-canvas'),
		})

		this.#camera.addCheeseButtonListener('#camera-take-button', async () => {
			const image = await this.#camera.takeCameraPicture();
			alert(URL.createObjectURL(image));
			console.log(image);
			this.#takenPictureResult = image;
		})
	}


	async setupSelectionMap() {
		const map = await Map.build('#map', {
			zoom: 13,
			locate: true,
		});

		const centerCoordinate = map.getCenter();
		const draggableMarker = map.addMarker([centerCoordinate.latitude, centerCoordinate.longitude], { draggable: true })

		draggableMarker.addEventListener('move', (event) => {

			/** 
			 * Get the latitude & longtitude realtime
			*/
			const coordinate = event.target.getLatLng();

			/** 
			 * Update to the object & elements
			*/
			this.#updateLatLngInput(coordinate.lat, coordinate.lng)
		})
	}

	#updateLatLngInput(latitude, longtitude) {
		/** 
		 * Update to the elements
		*/
		this.#form.elements.namedItem('longtitude-input').value = longtitude
		this.#form.elements.namedItem('latitude-input').value = latitude;

		/** 
		 * Update coordinate object
		*/
		this.#coordinate = {
			lat: latitude,
			lng: longtitude
		}
	}
}