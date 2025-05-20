import { showFormattedDate } from "./utils";
export function storyCard({ name, description, photoUrl, createdAt, lat, lon, id }) {
  return `
    <a href="/#/story/${id}" class="story-card">
      <div class="story-card__image">
        <img src="${photoUrl}" alt="The ${name} Story">
      </div>
      
      <div class="story-card__items__container">
        <div class="story-card__items">
          <div class="story-card__title">Pembuat</div>
          <div class="story-card__description">${name}</div>
        </div>
        <div class="story-card__items">
          <div class="story-card__title">Deskripsi</div>
          <div class="story-card__description">${description}</div>
        </div>
        <div class="story-card__items">
          <div class="story-card__title">Dibuat</div>
          <div class="story-card__description">${showFormattedDate(createdAt)}</div>
        </div>
      </div>
    </a>
    `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `<ul id="nav-list" class="nav-list">
              <li><a href="#/">Beranda</a></li>
              <li><a href="#/about">About</a></li>
              <li><a href="#/create-story" class="only-for-mobile">Buat Story</a></li>
            </ul>`;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `<ul id="nav-list" class="nav-list">
              <li><a href="#/">Beranda</a></li>
              <li><a href="#/about">About</a></li>
            </ul>`;
}

export function generateUnauthenticatedNavigationActionListTemplate() {
  return `<a href="#/login" class="action-button__filled flex items-center gap-1">
            <span class="flex items-center"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="action-button__icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
            Login Akun</a
          >`;
}

export function generateAuthenticatedNavigationActionListTemplate() {
  return `<a
            href="#/create-story"
            class="action-button__filled flex items-center gap-1 hidden-at-mobile"
          >
            <span class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="action-button__icon"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </span>
            Buat Story</a
          >
          <a href="#/logout" class="action-button__bordered_danger flex items-center gap-1 transition" id="logout-button">
            <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="action-button__icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>

            </span>
            Logout</a>`;
}