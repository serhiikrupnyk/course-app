<template>
  <nav class="navbar teal lighten-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click.prevent="$emit('click')" href="#">
          <i class="material-icons black-text">dehaze</i>
        </a>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
              class="dropdown-trigger black-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
          >
            {{ name }}

            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a @click.prevent="logout" href="#" class="black-text">
                <i class="material-icons">assignment_return</i>Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css';

export default {
  name: "NavBar",
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      coverTrigger: false
    })
  },
}
</script>