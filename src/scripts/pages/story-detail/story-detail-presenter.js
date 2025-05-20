import { parseActivePathname } from "../../routes/url-parser";
export default class StoryPresenter {
	#view;
	#model;

	constructor({ model, view }) {
		this.#model = model;
		this.#view = view;
	}

	async getDetailStory() {
		this.#view.showLoadingRender()
		try {
			const response = await this.#model.getStoryById(parseActivePathname().id);
			this.#view.renderStory(response.story)
			this.#view.renderMapLocation({
				lat: response.story.lat,
				lon: response.story.lon,
				name: response.story.name
			})
		} catch (error) {
			this.#view.fetchingStoriesFailed(error)
		} finally {
			this.#view.hideLoadingRender()
		}
	}
}