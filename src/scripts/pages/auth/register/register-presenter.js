export default class RegisterPresenter {
	#view;
	#model;
	#authModel;

	constructor({ view, model, authModel }) {
		this.#authModel = authModel;
		this.#model = model;
		this.#view = view;
	}


	async handleUserRegister({ name, email, password }) {
		this.#view.showLoadingSubmit();
		try {
			await this.#model.getRegistered({ name, email, password })

			/** 
			 * Redirect to login page
			*/
			this.#view.registerSuccessfully()

		} catch (error) {
			this.#view.registerFailed(error.message)
		} finally {
			this.#view.hideLoadingSubmit()
		}
	}
}