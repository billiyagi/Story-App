import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import CreateStoryPage from '../pages/create-story/create-story-page';
import StoryDetail from '../pages/story-detail/story-detail-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/create-story': new CreateStoryPage(),
  '/story/:id': new StoryDetail()
};

export const protectedRoutes = ['/', '/create-story', '/story/:id'];
export const publicRoutes = ['/login', '/register'];

export default routes;
