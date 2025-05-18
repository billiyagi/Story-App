export default class GuestCreateStoryPage {
	$presenter = null;

	async render() {
		return `
		<section class="container">
			<form class="auth-form" id="auth-form">
				<div class="auth-form__header">
					<h1 class="auth-form__heading">Create new story</h1>
				</div>

				<div class="auth-form__input-group">
					<label for="description">Deskripsi</label>
					<textarea name="description" id="description" rows="7"></textarea>
				</div>
				<div class="auth-form__input-group">
					<label for="latitude">Latitude</label>
					<input type="text" id="latitude">
				</div>
				<div class="auth-form__input-group">
					<label for="longtitude">Longitude</label>
					<input type="text" id="longtitude">
				</div>
				

				<button type="submit" class="action-button__filled">Submit Story</button>
			</form>
		</section>
		
		`;
	}

	async afterRender() {
		console.log('afterrenderguest');
	}
}