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
  this.route('student', { path: '/student/:student_id' });
  this.route('edit-grades', { path: '/edit-grades/:student_id/:year/:quarter' });
});
