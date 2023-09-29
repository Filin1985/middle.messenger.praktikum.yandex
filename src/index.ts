import './style/index.scss';
import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';
import {userData} from './data/user/user';
import {messageData} from './data/message/message';
import {chatData} from './data/chat/chat';

const ROUTES: Record<string, Array<any>> = {
  '404': [Pages.NotFound],
  '500': [Pages.ServerError],
  '/login': [Pages.Login, {title: 'Sign In', isEdit: true}],
  '/signup': [
    Pages.Login,
    {title: 'Registration', isEdit: true, signup: true, user: userData},
  ],
  '/': [Pages.ChatPage, {messages: messageData, chats: chatData}],
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
  const [source, context] = ROUTES[route] || ROUTES['404'];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
};
document.addEventListener('DOMContentLoaded', () =>
  navigate(window.location.pathname)
);
