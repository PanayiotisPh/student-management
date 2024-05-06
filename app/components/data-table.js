import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StudentsTableComponent extends Component {
  @service router;

  @action
  navigateToStudent(studentId) {
    this.router.transitionTo('student', studentId);
  }
}
