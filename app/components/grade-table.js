import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class GradeTableComponent extends Component {
  @tracked grades = [];
  @tracked selectedStudentId = 1;

  get students() {
    return this.args.data;
  }

  constructor() {
    super(...arguments);
    this.fetchGrades(); // Pre-fetch grades when the component is instantiated
  }

  @action
  handleStudentGradeSelection(event) {
    const selectedStudentId = event.target.value;
    this.selectedStudentId = selectedStudentId;
    this.fetchGrades();
  }

  @action
  fetchGrades() {
    fetch(`http://localhost:8090/student/grades/${this.selectedStudentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.grades = data.grades;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}
