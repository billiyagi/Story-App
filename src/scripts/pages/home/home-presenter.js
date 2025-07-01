export default class HomePresenter {
	#view;
	#model;

	constructor({ view, model }) {
		this.#model = model;
		this.#view = view;
	}

	async getStories() {
		this.#view.showLoadingRender()
		const isOnline = navigator.onLine;

		/** 
		 * Check if Offline
		*/
		if (!navigator.onLine) {
			this.#view.showOfflineRender()
		}

		try {
			const response = await this.#model.getStories();
			this.#view.renderStory(response.listStory)
		} catch (error) {
			// Check if failed to fetch but its online
			if (isOnline) {
				this.#view.fetchingStoriesFailed(error)
			}
		} finally {
			this.#view.hideLoadingRender()
		}
	}
}