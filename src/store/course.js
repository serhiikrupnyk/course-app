import { fetchCourseData } from '@/services/lessonService';

export default {
    state: {
        course: {
            title: '',
            lessons: [],
        },
        currentLessonIndex: 0,
        courseStarted: false,
        attempts: JSON.parse(localStorage.getItem('course_attempts')) || [],
    },
    mutations: {
        setCourse(state, course) {
            state.course = course;
        },
        setCurrentLessonIndex(state, index) {
            state.currentLessonIndex = index;
        },
        setCourseStarted(state, started) {
            state.courseStarted = started;
        },
        addCourseAttempt(state, attempt) {
            state.attempts.push(attempt);
            localStorage.setItem('course_attempts', JSON.stringify(state.attempts));
        }
    },
    actions: {
        async fetchCourse({ commit }) {
            const courseData = fetchCourseData();
            commit('setCourse', courseData);
        },
        startCourse({ commit }) {
            commit('setCourseStarted', true);
        },
        setCurrentLessonIndex({ commit }, index) {
            commit('setCurrentLessonIndex', index);
        },
        finishCourse({ commit }) {
            const attempt = {
                timestamp: new Date(),
                lessonIndex: this.state.course.currentLessonIndex,
            };
            commit('addCourseAttempt', attempt);
            commit('setCourseStarted', false);
            commit('setCurrentLessonIndex', 0);
        },
    },
    getters: {
        course: (state) => state.course,
        currentLesson(state) {
            return state.course.lessons[state.currentLessonIndex] || null;
        },
        courseStarted(state) {
            return state.courseStarted;
        },
        currentLessonIndex(state) {
            return state.currentLessonIndex;
        },
        isLastLesson(state) {
            return state.currentLessonIndex === state.course.lessons.length - 1;
        },
        courseAttempts(state) {
            return state.attempts;
        }
    },
};
