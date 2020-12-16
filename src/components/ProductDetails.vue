<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <div class="col-md-12 mb-5">
        <b-img thumbnail height="300" width="300" :src="product.image"></b-img>
        <h4>Product : {{ product.title }}s </h4>

        <h5> Description:  </h5>
        <p v-html="product.description">{{ product.description }} </p>
      </div>

      <div class="col-md-12">

      </div>
    </div>
  </div>

</template>

<script>
import Axios from './../helpers/Axios'

export default {
  name: "ProductDetails",
  data() {
    return {
      product: ''
    }
  },
  methods: {
    getProductDetails() {
      Axios.header().get('/api/product/' + this.$route.params.id)
          .then(response => {
            this.product = response.data
          })
    }
  }, mounted() {
    this.getProductDetails()
  }
}
</script>

<style scoped>

</style>
