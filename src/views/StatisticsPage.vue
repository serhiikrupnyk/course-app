<template>
  <div>
    <div class="page-title">
      <div>
        <h3>Statistics</h3>
      </div>
    </div>
    <div class="row">
      <div>
        <h2>Table of attempt rates</h2>
        <table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Lesson</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(attempt, index) in courseAttempts" :key="index">
            <td>{{ attempt.timestamp }}</td>
            <td>{{ attempt.lessonIndex + 1 }}</td>
          </tr>
          </tbody>
        </table>
        <p>Attempts: {{ courseAttempts.length }}</p>
        <p>Last attempt: {{ lastAttemptDate }}</p>
        <p>Hour of passage: {{ elapsedTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: "StatisticsPage",
  data: () => ({
    loading: true,
    currency: null
  }),
  computed: {
    ...mapGetters(['courseAttempts']),

    lastAttemptDate() {
      if (this.courseAttempts.length > 0) {
        const lastAttempt = this.courseAttempts[this.courseAttempts.length - 1];
        return moment(lastAttempt.timestamp).format('YYYY-MM-DD');
      }
      return '-';
    },
    elapsedTime() {
      if (this.courseAttempts.length > 0) {
        const firstAttempt = this.courseAttempts[0];
        const lastAttempt = this.courseAttempts[this.courseAttempts.length - 1];
        const elapsedMilliseconds = new Date(lastAttempt.timestamp) - new Date(firstAttempt.timestamp);
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        return `${hours} h. ${minutes} m. ${seconds} s.`;
      }
      return '-';
    },
  },
  async created() {
    await this.fetchCourse()
  },
  async mounted() {
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchCourse', 'setCurrentLessonIndex', 'startCourse', 'finishCourse']),
    // startCourse() {
    //   this.startCourseAction();
    // },
    async startCourseAction() {
      await this.fetchCourse();
    },
    async showNextLesson() {
      if (this.currentLessonIndex < this.course.lessons.length - 1) {
        this.loading = true
        await this.setCurrentLessonIndex(this.currentLessonIndex + 1)
        this.loading = false
      }
    },
    async showPreviousLesson() {
      if (this.currentLessonIndex > 0) {
        this.loading = true
        await this.setCurrentLessonIndex(this.currentLessonIndex - 1)
        this.loading = false
      }
    },
  }
}
</script>