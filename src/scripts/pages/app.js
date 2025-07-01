import routes, { protectedRoutes, publicRoutes } from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { getAccessToken, getLogout } from '../utils/auth';
import { generateAuthenticatedNavigationActionListTemplate, generateAuthenticatedNavigationListTemplate, generateUnauthenticatedNavigationActionListTemplate, generateUnauthenticatedNavigationListTemplate, generateSubcribeButton } from '../templates';
import { skipToContent, transitionHelper } from '../utils';
import { isNotificationGranted, subscribe, isCurrentPushSubscriptionAvailable, unsubscribe } from '../utils/notification';
import NotFound from './notfound/notfound-page';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #navigationActionDrawer = null;

  constructor({ navigationDrawer, drawerButton, content, navigationActionDrawer }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#navigationActionDrawer = navigationActionDrawer;

    this.#setupDrawer();
  }

  async #setupPushNotification() {

    // Check if subscribed
    const isSubscribed = await isCurrentPushSubscriptionAvailable();

    // Generate button subscribe
    generateSubcribeButton(isSubscribed)

    if (isSubscribed) {
      document.querySelector('#unsubscribe-notification').addEventListener('click', () => {
        unsubscribe().finally(() => {
          this.#setupPushNotification();
        });
      });

      return;
    } else {
      document.querySelector('#subscribe-notification').addEventListener('click', () => {
        subscribe().finally(() => {
          this.#setupPushNotification();
        });
      })
    }
  }


  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      /** 
       * * Close the mobile menu drawer if user click at the outside area of the menu
       * Check if the clicked area is not contain element of navigation or drawer
       * when its true, remove the class open at navigation drawer for 
       * mobile version (close the menu)
      */
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      /** 
       * * Close the mobile menu drawer if user click at the inside area of the menu
       * Get all anchor link element, and then check if the clicked link contain 
       * for all link at navigationDrawer then remove the open class for 
       * mobile version (close the menu)
      */
      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const isLogin = !!getAccessToken();
    const url = getActiveRoute();
    const page = routes[url];


    const notFound = new NotFound()

    if (!page) {
      this.#setupNavigationList();
      this.#content.innerHTML = await notFound.render();
      return;
    }


    // Redirect jika user belum login
    if (protectedRoutes.includes(url) && !isLogin) {
      location.hash = '/login';
      return;
    }

    // Redirect jika user sudah login
    if (publicRoutes.includes(url) && isLogin) {
      location.hash = '/';
      return;
    }

    skipToContent(document.querySelector('#skip-button'), document.querySelector('#main-content'));

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'instant' });
      this.#setupNavigationList();
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();

    /** 
     * Fill the children element
    */
    const navListMain = this.#navigationDrawer;
    const navActionMain = this.#navigationActionDrawer;

    navListMain.innerHTML = generateUnauthenticatedNavigationListTemplate();
    navActionMain.innerHTML = generateUnauthenticatedNavigationActionListTemplate();

    /** 
     * If the user login, then use the authenticated version
    */
    if (isLogin) {
      navListMain.innerHTML = generateAuthenticatedNavigationListTemplate();
      navActionMain.innerHTML = generateAuthenticatedNavigationActionListTemplate();
      this.#setupPushNotification();
    }

    const logoutButton = document.querySelector('#logout-button')
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm('are you sure?')) {
          getLogout()
          location.hash = '/login';
        }
      })
    }
  }
}

export default App;
