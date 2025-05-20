export default class HomePresenter {
	#view;
	#model;

	constructor({ view, model }) {
		this.#model = model;
		this.#view = view;
	}

	async getStories() {
		this.#view.showLoadingRender()
		try {
			const response = await this.#model.getStories();
			console.log('response stories', response)
			this.#view.renderStory(response.listStory)
		} catch (error) {
			this.#view.fetchingStoriesFailed(error)
		} finally {
			this.#view.hideLoadingRender()
		}
	}
}