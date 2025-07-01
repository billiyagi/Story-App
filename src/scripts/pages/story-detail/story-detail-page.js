import StoryPresenter from "./story-detail-presenter";
import * as StoryAPI from '../../data/api'
import Map from "../../utils/map";
import { showFormattedDate } from "../../utils";
import { parseActivePathname } from "../../routes/url-parser";
import Database from "../../data/database";


export default class StoryDetail {

	#presenter = null;
	#storyId = null;

	async render() {
		return `<section class="story-detail top-gap">
		<div id="alert-container"></div>
        <div id="loading-container" class="flex justify-center items-center"></div>
			<div id="story-detail-container"></div>
		</section>`
	}

	async afterRender() {
		this.#presenter = new StoryPresenter(parseActivePathname().id, {
			view: this,
			model: StoryAPI,
			dbModel: Database
		});

		this.#presenter.getDetailStory();
	}

	renderStory({ name, description, photoUrl, createdAt }) {
		document.querySelector('#story-detail-container').innerHTML = `
			<div class="story-detail__image">
				<h2>Thumbnail Story</h2>
				<img src="${photoUrl}" alt="Detail of ${name}'s Story">
			</div>

			<div class="story-detail-description">
				<h2>Story Detail</h2>
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
			</div>

			<div class="flex justify-center items-center">
			<button class="action-button__filled" id="pin-story-button">Pin This Story</button>
			</div>
			`;
	}

	setupPinStoryButton() {
		const pinStoryButton = document.querySelector('#pin-story-button');

		if (pinStoryButton) {
			pinStoryButton.addEventListener('click', async () => {
				await this.#presenter.handlePinStory();
			})
		}
	}

	pinnedStoryButton() {
		const pinStoryButton = document.querySelector('#pin-story-button')
		pinStoryButton.classList.add('pinned-story');
		pinStoryButton.textContent = 'Unpinned This Story'
	}

	unpinnedStoryButton() {
		const pinStoryButton = document.querySelector('#pin-story-button')

		if (pinStoryButton.classList.contains('pinned-story')) {
			pinStoryButton.classList.remove('pinned-story');
		}
		pinStoryButton.textContent = 'Pin This Story'
	}

	showAlertPinStory(message) {
		alert(message)
	}

	showLoadingRender() {
		document.querySelector('#loading-container').innerHTML = `
			<div class="flex items-center justify-center gap-1 loading-stories">
				<span class="loader loader__btn loader-dark"></span> <p>Loading Stories...</p>
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