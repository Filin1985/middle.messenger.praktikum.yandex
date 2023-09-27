import './style/index.css';
import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import {userData} from './data/user/user';
import {messageData} from './data/message/message';

const ROUTES: Record<string, Array<any>> = {
  '404': [Pages.NotFound],
  '500': [Pages.ServerError],
  '/login': [Pages.Login, {title: 'Sign In', isEdit: true}],
  '/': [Pages.ChatPage, {messages: messageData}],
  '/profile': [Pages.ProfilePage, {user: userData}],
  '/edit-profile': [Pages.ProfilePage, {user: userData, isEdit: true}],
  '/change-password': [
    Pages.ProfilePage,
    {user: userData, isEdit: true, isPasswordChange: true},
  ],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigate = (route: string) => {
  console.log(route);
  const [source, context] = ROUTES[route] || ROUTES['404'];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
};
document.addEventListener('DOMContentLoaded', () =>
  navigate(window.location.pathname)
);
document.addEventListener('click', (evt: Event) => {
  const route = (evt.target as HTMLInputElement).getAttribute('route');
  if (route) {
    navigate(route);
    evt.preventDefault();
    evt.stopImmediatePropagation();
  }
});
