import LoginPresenter from "./login-presenter";
import { alertHelper } from "../../../utils";
import * as StoryAPI from '../../../data/api'
import * as AuthModel from '../../../utils/auth'

export default class LoginPage {

	#presenter = null;

	async render() {
		return `
		<section class="container">
			<form class="form-control" id="auth-form" method="POST">
				<div class="form-control__header">
					<h1 class="form-control__heading">Welcome Back Stringers!</h1>
					<p>Digital place to share your stories or memories to people around the world</p>
				</div>
				

				<div id="alert-container"></div>

				<div class="form-control__input-group">
					<label for="email-input">Email Address</label>
					<input type="email" id="email-input" name="email" required>
				</div>
				<div class="form-control__input-group">
					<label for="password-input">Password</label>
					<input type="password" id="password-input" name="password" required>
				</div>

				<div id="login-submit-container">
					<button type="submit" class="action-button__filled green-button" id="submit-login-button">
					Login Akun</button>
				</div>
				<a href="#/register" class="action-button__bordered" id="link-register-button">Register Akun</a>
			</form>
		</section>
		
		`;
	}

	async afterRender() {
		this.#presenter = new LoginPresenter({
			view: this,
			model: StoryAPI,
			authModel: AuthModel
		})

		// Setup login form
		this.#setupForm();
	}

	#setupForm() {
		document.getElementById('auth-form').addEventListener('submit', async (event) => {
			event.preventDefault();
			/** 
			 * Request Login Session with Credentials
			*/
			return await this.#presenter.handleUserLogin({
				email: document.getElementById('email-input').value,
				password: document.getElementById('password-input').value,
			});

		});
	}

	loginSuccessfully() {
		return location.hash = '/';
	}

	loginFailed(message) {
		return alertHelper({ message: message });
	}

	showLoadingSubmit() {
		document.querySelector('#login-submit-container').innerHTML = `
		<button type="submit" class="action-button__filled green-button" id="submit-login-button" disabled>
			<div class="flex items-center justify-center gap-1">
				<span class="loader loader__btn"></span> <p>Loading</p>
			</div>
		</button>
		`;
	}

	hideLoadingSubmit() {
		document.querySelector('#login-submit-container').innerHTML = `
			<button type="submit" class="action-button__filled green-button" id="submit-login-button">Login Akun</button>
		`;
	}
}