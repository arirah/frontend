<template>
  <b-modal @shown="setData" hide-footer ok-title="Submit" centered size="md" ref="productForm" id="productForm"
           title="Manage Product">
    <form action="" @submit.prevent="formSubmit">
      <div class="row mb-3">
        <div class="col-md-12">
          <h6>Title</h6>
          <input v-model="form.title" type="text" class="form-control" placeholder="Enter product name" required>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12">
          <h6>Description</h6>
          <VueEditor v-model="form.description"/>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-12">
          <h6>Price</h6>
          <input v-model="form.price" type="number" class="form-control" placeholder="Enter product price" required>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4">
          <h6>Product Image </h6>
          <button type="button" class="btn btn-outline-primary" @click="()=>{this.$refs.file.click()}"> Choose file
          </button>
          <input v-on:change="handleFileUpload" type="file" class="form-control" name="file" style="display: none"
                 ref="file">
        </div>
        <div class="col-md-8">
          <b-img width="200" height="200" :src="form.image"></b-img>
        </div>
      </div>

      <div class="row mb-3 mt-4">
        <div class="col-md-12">
          <button type="button" class="btn btn-secondary mr-2" @click="()=>{this.$refs.productForm.hide()}"> Cancel
          </button>

          <button type="submit" class="btn btn-primary"> Submit</button>
        </div>
      </div>
    </form>
  </b-modal>
</template>
<script>
import {VueEditor} from "vue2-editor";
import Axios from "@/helpers/Axios";

export default {
  name: "ProductFormModal",
  data() {
    return {
      modalTitle: 'Add Product',
      form: {
        title: '',
        description: '',
        price: '',
        image: '',
        id: ''
      },
      config: {
        size: 'sm',
        centered: true,
        buttonSize: 'sm',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0'
      },
      file: ''
    }
  },
  methods: {
    formSubmit() {
      Axios.header().post('api/add-product', this.form)
          .then(() => {
            this.$bvModal.msgBoxOk("Product data saved  !", {
              title: "Success !",
              okVariant: 'success',
              ...this.config
            })
            this.getProducts()
            this.$refs.productForm.hide();
          }).catch(() => {
        this.$bvModal.msgBoxOk("Something went wrong !", {
          title: 'Error ',
          okVariant: 'danger',
          ...this.config
        })
      })
    },
    setData() {
      if (this.action === 'add') {
        this.form = {
          title: '',
          description: '',
          price: '',
          image: ''
        }
        return false;
      }
      this.form = this.selectedProduct
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      let headers = {'Content-Type': 'multipart/form-data'};
      formData.append('file', this.file);
      Axios.header(headers).post('api/file-uploader', formData)
          .then(response => {
            this.file = ''
            this.form.image = process.env.VUE_APP_IMAGE_PATH + response.data.image
            this.getProducts()
          }).catch(() => {
        this.$bvModal.msgBoxOk("Something went wrong !", {
          okVariant: 'danger',
          title: 'Error !',
          ...this.config
        })
        this.file = ''
      });
      console.log(process.env)
    }
  },
  props: ['selectedProduct', 'action', 'getProducts'],
  components: {
    VueEditor
  }
}
</script>

<style scoped>

</style>
