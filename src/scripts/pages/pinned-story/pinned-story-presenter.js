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

			/** 
			 * Get all stories form DB Model
			*/
			const response = await this.#dbModel.getAllStory();

			/** 
			 * Render the list of stories
			*/
			this.#view.renderStory(response)

			/** 
			 * If there's no story pinned, show the empty information
			*/
			if (Array.isArray(response) && !response.length) {
				this.#view.showPinnedStoryEmpty()
			}
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