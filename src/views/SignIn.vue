<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Course Tracker</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{ invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.dirty && !$v.email.email) }"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required" class="helper-text invalid">Email field must not be empty</small>
        <small v-else-if="$v.email.$dirty && !$v.email.email" class="helper-text invalid">Please enter a valid email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{ invalid: $v.password.$dirty && !$v.password.required }"
        >
        <label for="password">Password</label>
        <small v-if="$v.password.$dirty && !$v.password.required" class="helper-text invalid">Enter password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Sign in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required} from "vuelidate/lib/validators"
import messages from "@/utils/messages";

export default {
  name: "SignIn",
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      required
    }
  },
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {
        // eslint-disable-next-line
      }
    }
  }
}
</script>