export default class StoryPresenter {
	#view;
	#model;
	#storyId;
	#dbModel;
	#isPinned = false;

	constructor(storyId, { model, view, dbModel }) {
		this.#storyId = storyId;
		this.#model = model;
		this.#view = view;
		this.#dbModel = dbModel;
	}

	async getDetailStory() {
		this.#view.showLoadingRender()
		try {
			const response = await this.#model.getStoryById(this.#storyId);
			this.#view.renderStory(response.story)
			this.#view.renderMapLocation({
				lat: response.story.lat,
				lon: response.story.lon,
				name: response.story.name
			})
			this.#isPinned = await this.isPinned();
		} catch (error) {
			this.#view.fetchingStoriesFailed(error)
		} finally {
			this.#view.hideLoadingRender()
			this.#view.setupPinStoryButton()
		}
	}

	async handlePinStory() {
		try {
			const response = await this.#model.getStoryById(this.#storyId);

			/** 
			 * If this story is already pinned, then the request is to remove this pinned story
			*/
			if (this.#isPinned) {
				await this.#dbModel.removeStory(this.#storyId);

				/** 
				 * Show the save to pin story button
				*/
				this.#view.unpinnedStoryButton()
				this.#view.showAlertPinStory('Unpin Story Successfully')

			} else {
				await this.#dbModel.storeStory(response.story);

				/** 
				 * Show the unpin story button
				*/
				this.#view.pinnedStoryButton()
				this.#view.showAlertPinStory('Pin Story Successfully')
			}

		} catch (error) {
			console.error('storeStory: error:', error);
			this.#view.showAlertPinStory(error.message)
		}
	}

	async isPinned() {
		try {
			const response = await this.#dbModel.getStoryById(this.#storyId);

			if (response) {
				// Show the pinned button
				this.#view.pinnedStoryButton()
				return true;
			}
		} catch (error) {
			console.error('storeStory: error:', error);
		}
	}
}