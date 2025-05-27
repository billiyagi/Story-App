export default class PinnedStoryPresenter {
	#view;
	#model;
	#dbModel;

	constructor({ view, model, dbmodel }) {
		this.#model = model;
		this.#view = view;
		this.#dbModel = dbmodel;
	}

	async getStories() {
		this.#view.showLoadingRender()
		try {
			const response = await this.#dbModel.getAllStory();
			this.#view.renderStory(response)
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