import Route from '@ember/routing/route';

export default class StudentRoute extends Route {
  async model(params) {
    try {
      const response = await fetch(`http://localhost:8090/student/${params.student_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      const data = await response.json();
      const convertedData = {
        id: data.student['Student ID'],
        name: data.student['Student Name'],
        birth: data.student['Date Of Birth'],
        class: data.student['Student Class']
      };
      return convertedData
      
      // Reshape the data to fit your application's conventions
    } catch (error) {
      console.error('Error fetching student data:', error);
      // Handle errors in a way that the rest of your app can respond to,
      // e.g., by returning undefined, an empty object, or setting an error state.
      return {};
    }
  }
}
