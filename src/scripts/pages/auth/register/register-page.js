import RegisterPresenter from "./register-presenter";
import { alertHelper } from "../../../utils";
import * as StoryAPI from '../../../data/api'
import * as AuthModel from '../../../utils/auth'

export default class RegisterPage {

	#presenter = null;

	async render() {
		return `
		<section class="container">
			<form class="auth-form" id="register-form" method="POST">
				<div class="auth-form__header">
					<h1 class="auth-form__heading">Register your account</h1>
					<p>Make your own digital place to put your stories</p>
				</div>

				<div id="alert-container"></div>

				<div class="auth-form__input-group">
					<label for="name-input">Nama</label>
					<input type="text" id="name-input" name="name" required>
				</div>
				<div class="auth-form__input-group">
					<label for="email-input">Email Address</label>
					<input type="email" id="email-input" name="email" required>
				</div>
				<div class="auth-form__input-group">
					<label for="password-input">Password</label>
					<input type="password" id="password-input" name="password" required>
				</div>

				<div id="register-submit-container">
					<button type="submit" class="action-button__filled">Register Akun</button>
				</div>
				<a href="#/login" class="action-button__bordered">Login</a>
			</form>
		</section>
		
		`;
	}

	async afterRender() {
		/** 
		 * Inject the presenter
		*/
		this.#presenter = new RegisterPresenter({
			view: this,
			model: StoryAPI,
			authModel: AuthModel
		})

		/** 
		 * Setup form register
		*/
		this.#setupForm();
	}

	#setupForm() {
		document.getElementById('register-form').addEventListener('submit', async (event) => {
			event.preventDefault();

			const data = {
				name: document.getElementById('name-input').value,
				email: document.getElementById('email-input').value,
				password: document.getElementById('password-input').value,
			};
			await this.#presenter.handleUserRegister(data);
		});
	}

	registerSuccessfully() {
		location.hash = '/login';
	}

	registerFailed(message) {
		return alertHelper({ message: message });
	}

	showLoadingSubmit() {
		document.querySelector('#register-submit-container').innerHTML = `
		<button type="submit" class="action-button__filled" id="submit-register-button" disabled>
			<div class="flex items-center justify-center gap-1">
				<span class="loader loader__btn"></span> <span>Loading</span>
			</div>
		</button>
		`;
	}

	hideLoadingSubmit() {
		document.querySelector('#register-submit-container').innerHTML = `
			<button type="submit" class="action-button__filled">Register Akun</button>
		`;
	}
}