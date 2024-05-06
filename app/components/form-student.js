import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StudentFormComponent extends Component {

  // remove a set of input fields
  // works by removing the element at the last index and updating the array
  @action
  removeInputLine(index) {
    if (this.students.length > 1) {
      this.students.splice(index, 1);
      this.students = this.students.slice();
    } else {
      alert('At least one set of input fields must remain.');
    }
  }

  // initialize the students array with one set of input fields
  @tracked students = [{ name: '', birth: '', class: '' }];

  // add a new set of input fields
  @action
  addStudent() {
    this.students = [...this.students, { name: '', birth: '', class: '' }];
  }

  // get data from form and format it as JSON data matching the SQL schema
  @action
  submitForm(event) {
    event.preventDefault();
    console.log('Submitting students:', this.students);

    const jsonData = this.students.map((student) => ({
      'Student Name': student.name,
      'Date Of Birth': student.birth,
      'Student Class': student.class,
    }));

    this.sendData(jsonData);
  }

  // send the data to the database
  sendData(jsonData) {
    console.log('Sending JSON data:', JSON.stringify(jsonData));
    fetch('http://localhost:8090/student', {
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
