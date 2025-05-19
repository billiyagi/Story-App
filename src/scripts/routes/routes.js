import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import GuestCreateStoryPage from '../pages/guest-create-story/guest-create-story-page';
import { checkUnauthenticatedRouteOnly } from '../utils/auth';
import CreateStoryPage from '../pages/create-story/create-story-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': checkUnauthenticatedRouteOnly(new LoginPage()),
  '/register': checkUnauthenticatedRouteOnly(new RegisterPage()),
  '/guest-create-story': new GuestCreateStoryPage(),
  '/create-story': new CreateStoryPage()
};

export default routes;
