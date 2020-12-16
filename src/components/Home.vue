<template>
  <div class="container mt-4">

    <div class="row mb-3">
      <div class="col-md-12">
        <h4>Products List </h4>
      </div>
    </div>

    <div class="row">
      <div v-for="(product,index) in products.data" :key="index" class="col-md-4 mb-3">
        <b-card
            :title="product.title"
            :img-src="product.image"
            :img-alt="product.title"
            img-top
            img-height="150"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 border-0 shadow-sm"
        >
          <b-card-text v-html="product.description">
            {{product.description}}
          </b-card-text>
          <router-link class="btn btn-primary" :to="`/product/${product.id}`">View</router-link>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from './../helpers/Axios'
export default {
  name: "Home",
  data() {
    return {
      products: []
    }
  },
  methods: {
    getProducts(){
      Axios.header().get('api/products')
      .then(response=>{
        this.products = response.data
      })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
