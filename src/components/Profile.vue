<template>
  <div>
    <div class="container mt-4">
      <div class="row mt-4 mb-4">
        <div class="col-md-12">
          <h4>Product list :
            <button class="btn btn-primary float-right" @click="action='add'" v-b-modal.productForm>+ Add New Product
            </button>
          </h4>
        </div>
      </div>
      <div v-for="(product,index) in products.data" :key="index" class="row mt-4 mb-4">
        <div class="col-md-12">
          <b-card img-width="100" img-height="110" class="border-0 shadow-sm"
                  :img-src="(product.image)?product.image:defaultImage" img-alt="Card image" img-left>
            <b-card-text>
              <div class="row">
                <div class="col-md-7">
                  <b class="text-primary">{{ product.title }}</b>
                  <p v-html="product.description">{{ product.description }}</p>
                </div>
                <div class="col-md-2 align-self-center">
                  <h6>Price:</h6>
                  <h4>৳. {{ product.price }} </h4>
                </div>
                <div class="col-md-3 align-self-center text-center">
                  <button class="btn btn-primary btn-sm btn-block" @click="action='edit';selectedProduct=product"
                          v-b-modal.productForm>Edit
                  </button>
                  <button class="btn btn-danger btn-sm btn-block" @click="deleteProduct();selectedProduct=product">
                    Delete
                  </button>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div v-if="products.total>0" class="mt-3">
        <h6>Pages </h6>
        <b-pagination v-on:click.native="paginate" per-page="5" v-model="currentPage" pills
                      :total-rows="products.total"></b-pagination>
      </div>
      <ProductFormModal :getProducts="getProducts" :selectedProduct="selectedProduct" :action="action"/>
    </div>
  </div>
</template>

<script>
import ProductFormModal from "@/components/ProductFormModal";
import Axios from "@/helpers/Axios";
import router from "@/routes";

export default {
  name: "Profile",
  data() {
    return {
      products: [],
      currentPage: (this.$route.query.page) ? this.$route.query.page : 1,
      selectedProduct: '',
      action: "",
      defaultImage: process.env.VUE_APP_IMAGE_PATH + '/images/signup.jpg'
    }
  },
  methods: {
    paginate() {
      let param = {
        page: this.currentPage
      };
      router.push({path: '/user', query: param})
      this.getProducts();
    },
    getProducts() {
      Axios.header().get('api/my-products?page='+this.currentPage)
          .then(response => {
            this.products = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    deleteProduct() {
      this.$bvModal.msgBoxConfirm("Are you sure , want to delete this item?", {
        size: 'sm', buttonSize: 'sm', centered: true
      })
          .then(response => {
            if (response) {
              Axios.header().post('api/delete-product', {id: this.selectedProduct.id})
                  .then(response => {
                    this.products = response.data
                  }).catch(error => {
                console.log(error)
              })
            }
          })
    }
  },
  components: {
    ProductFormModal
  },
  async mounted() {
    await this.getProducts()
  }
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
