import { RouteConfig } from 'react-router-config';
import PagePaths from 'client/constants/PagePaths';

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: PagePaths.Home,
    exact: true,
    component: require('client/pages/Home').default,
  },
  {
    name: 'Write',
    path: PagePaths.Write,
    exact: true,
    component: require('client/pages/Write').default,
  },
  {
    name: 'Update',
    path: PagePaths.Update,
    exact: true,
    component: require('client/pages/Update').default,
  },
  {
    name: 'Search',
    path: PagePaths.Search,
    exact: true,
    component: require('client/pages/Search').default,
  },
  {
    name: 'Notice',
    path: PagePaths.Notice,
    exact: true,
    component: require('client/pages/Notice').default,
  },
  {
    name: 'Suggestion',
    path: PagePaths.Suggestion,
    exact: true,
    component: require('client/pages/Suggestion').default,
  },
  {
    path: '*',
    component: require('client/pages/NotFound').default,
  },
];

export default routes;
