export default class LoginPresenter {
	#view;
	#model;
	#authModel;

	constructor({ view, model, authModel }) {
		this.#view = view;
		this.#model = model;
		this.#authModel = authModel;
	}

	/** 
	 * @method handleUserLogin
	 * handle request for user to login
	*/
	async handleUserLogin({ email, password }) {
		this.#view.showLoadingSubmit();
		try {
			const response = await this.#model.getLogin({ email, password });

			/** 
			 * Create session
			*/
			this.#authModel.putAccessToken(response.loginResult.token)

			/** 
			 * redirect to home
			*/
			this.#view.loginSuccessfully();

		} catch (error) {
			this.#view.loginFailed(error.message)
		} finally {
			this.#view.hideLoadingSubmit();
		}
	}
}