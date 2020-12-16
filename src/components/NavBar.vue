<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Devs</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link v-if="!userInfo.user" class="nav-link" to="/login">Login</router-link>
          <router-link v-if="!userInfo.user" class="nav-link" to="/register">Register</router-link>
          <b-nav-item-dropdown v-if="userInfo.user" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ userInfo.user.name }}</em>
            </template>
            <b-dropdown-item href="/user">Profile</b-dropdown-item>
            <b-dropdown-item v-on:click="logout()" href="javascript:void(0)">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>


<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapState('user', ['userInfo'])
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('user', ['getUserInfo', 'logout'])
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>
