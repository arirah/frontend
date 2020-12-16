<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm mt-5 mb-5">
            <div class="card-body text-center pt-5 pb-5">
              <h4 class="pt-4 pb-4">Register</h4>
              <form action="" @submit.prevent="formHandler">
                <div class="row mb-3">
                  <div class="col-md-12">
                    <input v-model="form.name" type="text" class="form-control" placeholder="Enter email address"
                           required>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <input v-model="form.email" type="text" class="form-control" placeholder="Enter email address"
                           required>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-12">
                    <input v-model="form.password" type="password" class="form-control" placeholder="Enter password"
                           required>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-md-12">
                    <input v-model="form.password_confirmation" type="password" class="form-control"
                           placeholder="Enter password"
                           required>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-12">
                    <button class="btn btn-primary btn-block"> Register </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/helpers/Axios";
import {mapActions, mapState} from 'vuex';

export default {
  computed: {
    ...mapState('user', ['userInfo'])
  },
  name: "Login",
  data() {
    return {
      form: {
        name:'',
        email: '',
        password: ''
      },
      config: {
        size: 'sm',
        centered: true,
        buttonSize: 'sm',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0'
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    formHandler() {
      Axios.header().post('api/register', this.form)
          .then(response => {
            localStorage.setItem('_userToken', response.data.token);
            this.getUserInfo()
            this.$bvModal.msgBoxOk('Login successful !  ', {
              title: 'Success !', okVariant: 'success',
              ...this.config
            }).then(() => {
              if (this.userInfo.user) {
                window.location = '/user'
              }
            })
          }).catch(error => {
        console.log(error)
        this.$bvModal.msgBoxOk("Registration failed .. Try again..", {
          okVariant: 'danger',
          ...this.config
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
