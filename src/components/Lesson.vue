<template>
  <div>
    <div v-html="lesson.content"></div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
};
</script>
