import { storyCard } from "../../templates";
import * as StoryAPI from '../../data/api'
import HomePresenter from "./home-presenter";
import { alertHelper, trimText } from "../../utils";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section>
        <div id="alert-container"></div>
        <div id="loading-container" class="flex justify-center items-center"></div>
        <h1 class="my">List Stories</h1>
        <div class="story-list" id="story-list-container">
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: StoryAPI
    })
    this.#presenter.getStories();
  }


  renderStory(stories) {
    const storyListContainer = document.querySelector('#story-list-container');

    stories.forEach((story) => {
      storyListContainer.innerHTML += storyCard({
        id: story.id,
        name: story.name,
        description: trimText(story.description),
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
				<span class="loader loader__btn loader-dark"></span> <p>Loading Stories...</p>
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
}
