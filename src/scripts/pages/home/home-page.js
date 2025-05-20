import { storyCard } from "../../templates";
import * as StoryAPI from '../../data/api'
import HomePresenter from "./home-presenter";
import { alertHelper } from "../../utils";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section class="container">
        <div id="alert-container"></div>
        <div id="loading-container"></div>
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
}
