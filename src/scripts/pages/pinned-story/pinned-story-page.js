import { storyCard } from "../../templates";
import * as StoryAPI from '../../data/api'
import Database from "../../data/database";
import { alertHelper } from "../../utils";
import PinnedStoryPresenter from "./pinned-story-presenter";

export default class PinnedStoryPage {
	#presenter = null;

	async render() {
		return `
      <section class="container">
        <h1>Your pinned stories</h1>
        <div id="alert-container"></div>
        <div id="loading-container"></div>
        <div class="story-list" id="story-list-container">
        </div>
      </section>
    `;
	}

	async afterRender() {
		this.#presenter = new PinnedStoryPresenter({
			view: this,
			model: StoryAPI,
			dbmodel: Database
		})
		this.#presenter.getStories();
	}


	renderStory(stories) {
		const storyListContainer = document.querySelector('#story-list-container');

		stories.forEach((story) => {
			storyListContainer.innerHTML += storyCard({
				id: story.id,
				name: story.name,
				description: story.description,
				photoUrl: story.photoUrl,
				createdAt: story.createdAt,
				lat: story.lat,
				lon: story.lon
			})
		})
	}

	showLoadingRender() {
		document.querySelector('#loading-container').innerHTML = `
      <div class="flex items-center justify-center gap-1">
				<span class="loader loader__btn loader-dark"></span> <span>Loading Stories...</span>
			</div>
    `;
	}

	hideLoadingRender() {
		document.querySelector('#loading-container').innerHTML = ``;
	}

	fetchingStoriesFailed(message) {
		return alertHelper({ message: message });
	}

	showOfflineRender() {
		return alertHelper({ message: 'Anda sedang offline', type: 'alert__info' });
	}

	showPinnedStoryEmpty() {
		document.querySelector('#story-list-container').innerHTML = `
		<p class="pinned-empty">Your pinned story is empty</p>`
	}
}
