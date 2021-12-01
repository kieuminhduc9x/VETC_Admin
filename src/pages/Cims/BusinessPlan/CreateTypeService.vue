<template>
  <a-form-model
    v-if="formPlan"
    :model="formPlan"
    id="productModal"
    :rules="rules"
    ref="creatingFormGroup">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-form-model-item prop="productId" label="Sản phẩm" class="pt-create">
          <a-select
            show-search
            mode="multiple"
            class="select-create-province"
            :show-arrow="true"
            style="width: 100%"
            :filter-option="filterSelectOption"
            @search="fetchProduct"
            @change="onchangeProduct"
            :disabled="false"
            v-model="formPlan.productId"
          >
            <a-select-option value="all"> -- Tất cả --</a-select-option>
            <a-select-option
              :disabled="check"
              v-for="item in products"
              :key="'c-t-' + item.productId"
              :value="item.productId">
              {{ item.productCode }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import { searchProductConnect } from '@/api/product'

export default {
  name: 'CreateTypeService',
  props: {
    datable: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      formPlan: {
        productId: []
      },
      lastFetchId: '',
      check: null,
      fetching: false,
      listProduct: [],
      rules: {
        productId: [{ required: true, message: 'Không được phép để trống' }]
      }
    }
  },
  mounted () {
    this.fetchProduct()
  },
  computed: {
    products () {
      const productId = this.datable.map(item => {
        return item.dataIndex
      })
      return this.listProduct.filter(item => {
        return productId.indexOf(item.productId) === -1
      })
    }
  },
  methods: {
    fetchProduct (value) {
      this.listProduct = []
      searchProductConnect({ productNameCode: value, status: '1' }).then(response => {
        this.listProduct = response
      })
    },
    onchangeProduct (val) {
      const fetchData = []
      if (val.includes('all')) {
        this.formPlan.productId = ['all']
        this.check = val.includes('all')
        this.$emit('fetchDataCol', this.products)
      } else {
        this.check = false
        this.formPlan.productId.forEach(item => {
          const data = this.listProduct.find(value => item === value.productId)
          fetchData.push(data)
        })
        this.$emit('fetchDataCol', fetchData)
      }
    }
  }
}
</script>

<style lang="less">
.ant-select-selected-icon {
  border: 1px solid #dfdfdf !important;
}

.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon, .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {
  display: inline-block;
  color: #1890ff;
  background-color: #1890ff;
  z-index: 9999;
  font-weight: bold;
}

.ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected .ant-select-selected-icon, .ant-select-dropdown.ant-select-dropdown--multiple .ant-select-dropdown-menu-item-selected:hover .ant-select-selected-icon {
  display: inline-block;
  color: #e8e8e8;
  background-color: #1890ff;
  z-index: 9999;
  font-weight: bold;
}
.ant-select-dropdown {
  margin-top: 1rem!important;
}
.pt-create {
  @media only screen and (max-width: 1400px) {
    padding-bottom: 10% !important
  }
  @media only screen and (min-width: 1425px) {
    padding-bottom: 5%!important;
  }
}
#productModal {
  .ant-select {
    height: auto;
    ul, ol {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-bottom: 3px;
        float: none;
      }
    }
    &-selection__rendered {
      &:after {
        display: none;
      }
    }
  }
}
</style>
