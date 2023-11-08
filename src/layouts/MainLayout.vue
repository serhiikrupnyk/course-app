<template>
  <div>
    <div v-if="loading" class="app-loader">
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
        </div>
      </div>
    </div>
    <div v-else class="app-main-layout">
      <SideBar v-model="toggleShowSidebar" />
      <NavBar @click="toggleShowSidebar = !toggleShowSidebar" />

      <main class="app-content" :class="{full: !toggleShowSidebar}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
<!--        <router-link class="btn-floating btn-large blue" to="/record">-->
<!--          <i class="large material-icons">add</i>-->
<!--        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/app/NavBar";
import SideBar from "@/components/app/SideBar";
import messages from "@/utils/messages";

export default {
  name: 'MainLayout',
  data: () => ({
    toggleShowSidebar: true,
    loading: true
  }),
  components: {SideBar, NavBar},
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$message(messages[fbError.code] || 'Something went wrong')
    }
  }
}
</script>