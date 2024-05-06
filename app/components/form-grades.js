import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormGradesComponent extends Component {
  @action
  removeInputLine(index) {
    if (this.grades.length > 1) {
      this.grades.splice(index, 1);
      this.grades = this.grades.slice();
    } else {
      alert('At least one set of input fields must remain.');
    }
  }

  @tracked grades = [
    { id: '', year: '', quarter: '', math: '', it: '', literature: '' },
  ];

  @action
  addStudent() {
    this.grades = [
      ...this.grades,
      { id: '', year: '', quarter: '', math: '', it: '', literature: '' },
    ];
  }

  @action
  submitForm(event) {
    event.preventDefault();
    console.log('Submitting grades:', this.grades);

    const jsonData = this.grades.map((grade) => ({
      'Student ID': grade.id,
      Year: grade.year,
      Quarter: grade.quarter,
      Mathematics: grade.math,
      'Computer Science': grade.it,
      Literature: grade.literature,
    }));

    this.sendData(jsonData);
  }

  sendData(jsonData) {
    console.log('Sending JSON data:', JSON.stringify(jsonData));
    fetch('http://localhost:8090/student/grades', {
      method: 'POST',
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
