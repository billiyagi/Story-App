
export default class CreateStoryPresenter {
	#view;
	#model;

	constructor({ view, model }) {
		this.#model = model;
		this.#view = view;
	}

	/** 
	 * @method handleSendStory
	 * handle request for uploading new story
	*/
	async handleSendStory({ description, photo, lat, lon }) {
		this.#view.showLoadingSubmit();
		try {
			const response = await this.#model.createStory({ description, photo, lat, lon })

			this.#view.createStorySuccessfully()
		} catch (error) {
			this.#view.createStoryFailed()
		} finally {
			this.#view.hideLoadingSubmit();
		}
	}
}