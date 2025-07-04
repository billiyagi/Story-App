export default class NotFound {
	async render() {
		return `
            <section class="story-not-found">
                <h1 class="story-not-found__title">404</h1>
                <div class="story-not-found__description">
                    <p>Oops, Halaman yang kamu cari tidak ditemukan.</p>
					<br>
                    <a href="/#/" class="action-button__filled green-button">Kembali ke beranda</a>
				</div>
            </section>
        `;
	}

	async afterRender() {
		return;
	}
}