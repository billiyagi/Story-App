import CONFIG from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  STORY: {
    ALL: `${CONFIG.BASE_URL}/stories`,
    SHOW: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
    CREATE: `${CONFIG.BASE_URL}/stories`,
    CREATE_WITH_GUEST: `${CONFIG.BASE_URL}/stories/guest`
  }
};

/** 
 * @method getStories
 * get all stories data
*/
export async function getStories() {

  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY.ALL, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const json = await fetchResponse.json()

  if (!fetchResponse.ok) throw new Error(json.message);


  return {
    ...json,
    ok: fetchResponse.ok
  }
}

/** 
 * @method getStoryById
 * get one story data by its id
*/
export async function getStoryById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY.SHOW(id), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const json = await fetchResponse.json()

  if (!fetchResponse.ok) throw new Error(json.message);


  return {
    ...json,
    ok: fetchResponse.ok
  }
}

/** 
 * @method createStory
 * create one story with requested data
*/
export async function createStory({ description, photo, lat, lon }) {

  /** 
   * Get Authenticated token from user
  */
  const accessToken = getAccessToken();

  /** 
   * Create form data
  */
  const storyForm = new FormData();
  storyForm.append('description', description);
  storyForm.append('photo', photo);
  storyForm.append('lat', lat);
  storyForm.append('lon', lon);

  /** 
   * Check if the create story for guest or not
  */
  const header = {
    Authorization: `Bearer ${accessToken}`
  }

  console.log(header)

  /**
   * Request new story
  */
  const fetchResponse = await fetch(ENDPOINTS.STORY.CREATE, {
    method: 'POST',
    headers: header,
    body: storyForm
  })

  const json = fetchResponse.json();

  if (!fetchResponse.ok) throw new Error(json.message);

  return {
    ...json,
    ok: fetchResponse.ok
  }
}

/** 
 * @method getLogin
*/
export async function getLogin({ email, password }) {
  const loginForm = JSON.stringify({ email, password })

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: loginForm
  })


  const json = await fetchResponse.json()

  if (!fetchResponse.ok) throw new Error(json.message);

  return {
    ...json,
    ok: fetchResponse.ok
  }
}

/** 
 * @method getRegistered
*/
export async function getRegistered({ name, email, password }) {
  const registerForm = JSON.stringify({ name, email, password })

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: registerForm
  })


  const json = await fetchResponse.json();

  if (!fetchResponse.ok) throw new Error(json.message);

  return {
    ...json,
    ok: fetchResponse.ok
  }

}