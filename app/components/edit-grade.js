import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EditGradeComponent extends Component {
  @tracked grade = this.args.grade;

  // get data from form and format it as JSON data matching the SQL schema
  @action
  editGrades(event) {
    event.preventDefault();

    const jsonData = {
      'Mathematics': this.grade.math,
      'Computer Science': this.grade.it,
      'Literature': this.grade.literature,
    };

    this.sendData(jsonData);
  }

  // update the grade for the selected subject
  sendData(jsonData) {
    fetch(`http://localhost:8090/student/grade/${this.grade.id}/${this.grade.year}/${this.grade.quarter}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok.');
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
