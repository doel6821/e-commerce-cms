<template>
  <div>
    <div class="container mt-5">
      <b-card no-body class="container bg-warning" style="max-width: 800px;">
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6" class="bg-warning">
            <b-card-body title="Add Product" class="mt-3">
              <b-alert :variant="color" show v-if="notification[0]">{{notification[0]}}</b-alert>
              <b-form  class="mt-5" @submit.prevent="addProduct">
                <b-form-group label="Name :">
                  <b-form-input
                    v-model="name"
                    type="text"
                    required
                    placeholder="Enter Product Name"
                  >
                  </b-form-input>
                </b-form-group>

                <b-form-group label="Image URL :">
                  <b-form-input
                    type="text"
                    v-model="image_url"
                    required
                    placeholder="Enter Image URL"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Price:">
                  <b-form-input
                    type="number"
                    v-model="price"
                    required
                    placeholder="Enter Price"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Stock:">
                  <b-form-input
                    type="number"
                    v-model="stock"
                    required
                    placeholder="Enter Stock"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Gender">
                  <b-form-select
                    v-model="gender"
                    :options="filters"
                    required
                    value-field="gender"
                    text-field="gender"
                  ></b-form-select>
                </b-form-group>

                <b-form-group label="Category">
                  <b-form-select
                    v-model="CategoryId"
                    :options="categories"
                    required
                    value-field="id"
                    text-field="category"
                  ></b-form-select>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'addProduct',
  data () {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
      gender: '',
      CategoryId: ''
    }
  },
  computed: {
    filters () {
      return this.$store.state.filters
    },
    categories () {
      return this.$store.state.categories
    },
    notification: {
      get () {
        return this.$store.state.notification
      }
    },
    color: {
      get () {
        return this.$store.state.color
      }
    }
  },

  methods: {
    addProduct () {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        gender: this.gender,
        CategoryId: this.CategoryId
      }

      this.$store.dispatch('addProduct', payload)
        .then(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
            this.$router.push('/Home')
          }, 1000)
        })
        .catch(() => {
          setTimeout(() => {
            this.$store.commit('SET_NOTIFICATION', [])
          }, 3000)
        })
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }
}
</script>

<style>

</style>
