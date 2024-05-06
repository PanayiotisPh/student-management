import EmberRouter from '@ember/routing/router';
import config from 'student-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('analytics');
  this.route('management');
  this.route('grades');
});
