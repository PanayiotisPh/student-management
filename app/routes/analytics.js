import Route from '@ember/routing/route';

export default class AnalyticsRoute extends Route {
  async model() {
    try {
      const response = await fetch('http://localhost:8090/student');
      const data = await response.json();
      return data.students;
    } catch (error) {
      console.log(error);
    }
  }
}
