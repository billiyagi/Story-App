
export default class CreateStoryPresenter {
	#view;
	#model;

	constructor({ view, model }) {
		this.#model = model;
		this.#view = view;
	}

	/** 
	 * @method handleSendStoryGuest
	 * handle request for uploading new story for guest
	*/
	async handleSendStoryGuest({ description, photo, lat, lon }) {
		console.log('dipresenter', { description, photo, lat, lon })
		try {
			const response = await this.#model.createStory({ description, photo, lat, lon })
			console.log(response)
		} catch (error) {
			console.log(error)
		} finally {
			console.log('upload finish')
		}
	}
}