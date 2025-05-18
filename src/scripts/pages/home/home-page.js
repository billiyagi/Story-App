import { storyCard } from "../../templates";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <div class="story-list">
          ${storyCard({
      name: 'billiyagi', description: 'this is story of the world', photoUrl: 'https://google.com', createdAt: '22 februari 2023', lat: 77323982, lon: 2193891231
    })}
        </div>
      </section>

      
    `;
  }

  async afterRender() {
    // Do your job here

  }
}
