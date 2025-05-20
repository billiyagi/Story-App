import StoryPresenter from "./story-detail-presenter";
import * as StoryAPI from '../../data/api'
import Map from "../../utils/map";
import { showFormattedDate } from "../../utils";


export default class StoryDetail {

	#presenter = null;

	async render() {
		return `<section class="container story-detail">
		<div id="alert-container"></div>
        <div id="loading-container"></div>
			<div id="story-detail-container"></div>
		</section>`
	}

	async afterRender() {
		this.#presenter = new StoryPresenter({
			view: this,
			model: StoryAPI
		});

		this.#presenter.getDetailStory();
	}

	renderStory({ name, description, photoUrl, createdAt, lat, lon }) {
		document.querySelector('#story-detail-container').innerHTML = `
			<div class="story-detail__image">
				<img src="${photoUrl}" alt="Detail of ${name}'s Story">
			</div>

			<div class="story-detail__item">
				<div class="story-detail__title">Peta Lokasi</div>
				<div class="story-detail__description">
					<div id="map" class="story-detail__map"></div>
				</div>
			</div>

			<div class="story-detail__item">
				<div class="story-detail__title">Pembuat</div>
				<div class="story-detail__description">${name}</div>
			</div>

			<div class="story-detail__item">
				<div class="story-detail__title">Deskripsi</div>
				<div class="story-detail__description">${description}</div>
			</div>
			
			<div class="story-detail__item">
				<div class="story-detail__title">Dibuat pada</div>
				<div class="story-detail__description">${showFormattedDate(createdAt)}</div>
			</div>
			
			`;
	}

	showLoadingRender() {
		document.querySelector('#loading-container').innerHTML = `
		  <div class="flex items-center justify-center gap-1">
					<span class="loader loader__btn loader-dark"></span> <span>Loading Stories...</span>
				</div>
		`;
	}

	async renderMapLocation({ lat, lon, name }) {
		const map = await Map.build('#map', {
			zoom: 10,
			locate: false,
		});

		map.addMarker([lat, lon], { draggable: false }, { content: `Position of ${name}` })
		map.changeCamera([lat, lon], 15);
	}

	hideLoadingRender() {
		document.querySelector('#loading-container').innerHTML = ``;
	}

	fetchingStoriesFailed(message) {
		return alertHelper({ message: message });
	}
}