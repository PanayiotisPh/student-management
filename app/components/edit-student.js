import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EditStudentComponent extends Component {
  @tracked student = this.args.student;

  @action
  editStudent(event) {
    event.preventDefault();

    const jsonData = {
      'Student Name': this.student.name,
      'Date Of Birth': this.student.birth,
      'Student Class': this.student.class,
    };

    this.sendData(jsonData);
  }

  @action
  updateClass(event) {
    this.student.class = event.target.value;
  }

  sendData(jsonData) {
    fetch(`http://localhost:8090/student/${this.student.id}`, {
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
