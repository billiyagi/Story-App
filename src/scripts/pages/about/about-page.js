export default class AboutPage {
  async render() {
    return `
      <section class="container top-gap">
        <h2>About Page</h2>
        
          <p class="my">
            Hii! Saya Febry Billiyagi, seorang pengembang web yang antusias dalam membangun aplikasi yang bermakna dan berdampak. Aplikasi ini, "Strings App", merupakan proyek pribadi saya yang dibuat dengan sepenuh hati dan secangkir teh di samping laptop.
          </p>

          <p class="my">
          Strings App hadir sebagai media eksplorasi terhadap kata-kata, cerita, dan emosi manusia. Di dunia yang semakin cepat dan digital, saya percaya bahwa mengekspresikan diri melalui tulisan dan bahasa masih memiliki tempat yang istimewa. Aplikasi ini saya rancang agar siapa pun bisa menuliskan, membaca, dan membagikan kalimat-kalimat yang bermakna—baik yang sederhana, lucu, menyentuh, atau bahkan menyembuhkan.
          </p>

          <p class="my">
            Dalam proses pengembangan, saya menggunakan berbagai teknologi web modern, mulai dari HTML5, CSS3, hingga JavaScript modular, dengan pendekatan SPA (Single Page Application) agar pengalaman pengguna lebih mulus dan cepat. Selain sisi teknis, saya juga memikirkan bagaimana aplikasi ini bisa mudah diakses, cepat dimuat, dan ramah untuk semua kalangan.
          </p>

          <p class="my">
            Lebih dari sekadar proyek teknis, Strings App adalah bentuk cinta saya terhadap dunia digital yang humanis. Setiap fitur, desain, dan kata dalam aplikasi ini dibangun dengan niat untuk menghubungkan manusia melalui bahasa.
          </p>

          <p class="my">
            Terima kasih telah mengunjungi halaman ini. Saya berharap Anda merasakan semangat yang sama seperti yang saya rasakan saat membangunnya. Silakan jelajahi, tulis sesuatu, atau cukup duduk dan baca—karena setiap kata punya cerita.
          </p>
        
      </section>
    `;
  }

  async afterRender() {
    return;
  }
}
