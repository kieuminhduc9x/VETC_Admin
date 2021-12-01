<template>
  <a-form-model
    v-if="formPlan"
    :model="formPlan"
    :rules="rules"
    ref="creatingFormGroup">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-form-model-item prop="productId" label="Danh sách sản phẩm">
          <a-select
            show-search
            :default-active-first-option="false"
            :show-arrow="true"
            :filter-option="filterSelectOption"
            @change="onchangeProduct"
            :disabled="false"
            v-model="formPlan.productId"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
            <a-select-option
              v-for="item in listProduct"
              :key="'c-t-' + item.dataIndex"
              :value="item.dataIndex">
              {{ item.title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
// import { searchProductConnect } from '@/api/product'
import _ from 'lodash'

export default {
  name: 'DeleteTypeService',
  props: {
    listColums: {
      type: Array
    }
  },
  data () {
    return {
      formPlan: {
        productId: ''
      },
      lastFetchId: '',
      fetching: false,
      rules: {
        productId: [{ required: true, message: 'không được phép để trống' }]
      }
    }
  },
  computed: {
    listProduct () {
      const list = this.listColums
      if (list) {
        return _.uniqWith(list, _.isEqual)
      }
      return null
    }
  },
  methods: {
    onchangeProduct (val) {
      const fetchData = this.listProduct.find(value => val === value.dataIndex)
      this.$emit('delColums', fetchData)
    }
  }
}
</script>

<style scoped>

</style>
