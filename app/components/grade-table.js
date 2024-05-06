import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export default class GradeTableComponent extends Component {
  // Define the tracked properties
  // set studentId default value to 1 to match the first student in the list(default value)
  @tracked grades = [];
  @tracked selectedStudentId = 1;
  @service router;

  // Get the students data from the parent component
  get students() {
    return this.args.data;
  }

  // Fetch the grades for the selected student when the component is instantiated
  constructor() {
    super(...arguments);
    this.fetchGrades(); // Pre-fetch grades when the component is instantiated
  }

  // Navigate to the edit grades page
  @action
  navigateToEditGrades(studentId, year, quarter) {
    this.router.transitionTo('edit-grades', studentId, year, quarter);
  }

  // Handle the student selection from the dropdown
  @action
  handleStudentGradeSelection(event) {
    const selectedStudentId = event.target.value;
    this.selectedStudentId = selectedStudentId;
    this.fetchGrades();
  }

  // Fetch the grades for the selected student
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
