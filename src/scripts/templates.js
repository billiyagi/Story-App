import { showFormattedDate } from "./utils";
export function storyCard({ name, description, photoUrl, createdAt, lat, lon, id }) {
  return `
    <a href="/#/story/${id}" class="story-card">
      <div class="story-card__image">
        <img src="${photoUrl}" alt="The ${name} Story">
        <div class="story-card__image__user">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </span>
        ${name}</div>
      </div>

      <div class="story-card__summary">${description}</div>

      <div class="story-card__date">${showFormattedDate(createdAt)}</div>
    </a>
    `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
          <div class="nav-list__title_drawer only-for-mobile">
                <span>String Story</span>
              </div>
            <ul id="nav-list" class="nav-list">
              <li><a href="#/">Beranda</a></li>
              <li><a href="#/about">About</a></li>
              <li><a href="#/pinned-story">Pinned</a></li>
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

export function generateSubcribeButton(isSubscribed = false) {
  const bell = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="notification-button__icon">
  <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
</svg>
  `;
  const subscribe = `<button class="notification-button notification-button__green" id="subscribe-notification">${bell} <span>Subscribe</span></button>`;
  const subscribed = `<button class="notification-button notification-button__red" id="unsubscribe-notification">${bell} <span>Unsubcribe</span></button>`;
  const notificationButton = document.querySelector('#notification-container')
  notificationButton.innerHTML = isSubscribed ? subscribed : subscribe;
}

export function generateAuthenticatedNavigationActionListTemplate() {
  return `
          <div id="notification-container"></div>
          <a
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
            Logout
        </a>`;
}