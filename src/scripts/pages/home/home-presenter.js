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
			this.#view.renderStory(response.listStory)
		} catch (error) {

			// Check if offline
			if (!navigator.onLine) {
				this.#view.showOfflineRender()
			} else {
				this.#view.fetchingStoriesFailed(error)
			}
		} finally {
			this.#view.hideLoadingRender()
		}
	}
}