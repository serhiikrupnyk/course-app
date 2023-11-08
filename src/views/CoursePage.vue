<template>
  <div>
    <div class="page-title">
      <button v-if="!courseStarted" class="btn waves-effect waves-light btn-small" @click="startCourse">Почати курс</button>
      <div v-else>
        <h3>{{ course.title }}</h3>
        <button class="btn waves-effect waves-light btn-small" @click="showPreviousLesson">Попередній урок</button>
        <span>Поточний урок: {{ currentLesson.id }}</span>
        <button class="btn waves-effect waves-light btn-small" @click="showNextLesson">Наступний урок</button>
      </div>
    </div>
    <PreLoader v-if="loading" />
    <div v-if="courseStarted" class="row">
      <Lesson :lesson="currentLesson" />
      <button v-if="isLastLesson" @click="finishCourse">Закінчити курс</button>
    </div>
  </div>
</template>

<script>

import Lesson from "@/components/Lesson.vue";
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "CoursesPage",
  data: () => ({
    loading: true,
    currency: null
  }),
  computed: {
    ...mapGetters(['currentLesson', 'course', 'courseStarted', 'currentLessonIndex', 'isLastLesson']),
  },
  async created() {
    await this.fetchCourse()
  },
  async mounted() {
    this.loading = false
  },
  methods: {
    ...mapActions(['fetchCourse', 'setCurrentLessonIndex', 'startCourse', 'finishCourse']),
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
    },
  components: {Lesson}
}
</script>