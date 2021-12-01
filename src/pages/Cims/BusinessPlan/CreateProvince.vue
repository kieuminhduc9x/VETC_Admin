<template>
  <a-form-model
    v-if="formPlan"
    :model="formPlan"
    :rules="rules"
    id="provinceModal"
    ref="creatingFormGroup">
    <a-row>
      <a-col :xs="24" :md="24" :lg="24">
        <a-form-model-item prop="province" label="Tỉnh" class="pt-create filter-item-container">
          <a-select
            show-search
            mode="multiple"
            class="select-create-province"
            :show-arrow="true"
            :dropdownStyle="{top: '200px', marginLeft: '20px'}"
            :dropdownMenuStyle="{bottom: '100px'}"
            id="select-mutiple"
            style="width: 100%"
            :filter-option="filterSelectOption"
            @change="onchangeProvince"
            :disabled="false"
            v-model="formPlan.province"
          >
            <a-select-option value="all"> -- Tất cả --</a-select-option>
            <a-select-option
              :disabled="check"
              v-for="item in provinces"
              :key="'c-t-' + item.areaCode"
              :value="item.areaCode">
              {{ item.fullName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
import { getProvince } from '@/api/businessPlan'
// import _merge from 'lodash/merge'
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
        province: []
      },
      listProvince: [],
      check: false,
      rules: {
        province: [{ required: true, message: 'Không được phép để trống' }]
      }
    }
  },
  mounted () {
    this.fetchProvince()
  },
  computed: {
    provinces () {
      const areaCodes = this.datable.map(item => {
        return item.province
      })
      return this.listProvince.filter(item => {
        return areaCodes.indexOf(item.areaCode) === -1
      })
    },
    dropdownStyle () {
      return {
        top: '400px'
      }
    }
  },
  methods: {
    fetchProvince () {
      this.listProvince = []
      getProvince().then(response => {
        this.listProvince = response
      })
    },
    onchangeProvince (val) {
      const fetchData = []
      // // const height = document.getElementById('select-mutiple').offsetHeight
      // // const quantityProvince = this.formPlan.province.length
      // document.getElementsByClassName('ant-select-dropdown--multiple')[0].setAttribute('id', 'auto-margin')
      // document.getElementById('auto-margin').style.top = '800px !important'
      // document.getElementById('auto-margin').style.top = '800px !important'
      // document.getElementById('auto-margin').style.color = 'red'
      if (val.includes('all')) {
        this.formPlan.province = ['all']
        this.check = val.includes('all')
        this.$emit('fetchDataRow', this.provinces)
      } else {
        this.check = false
        this.formPlan.province.forEach(item => {
          const data = this.listProvince.find(value => item === value.areaCode)
          fetchData.push(data)
        })
        this.$emit('fetchDataRow', fetchData)
      }
    }
  }
}
</script>
<style lang="less">
.pt-create {
  @media only screen and (max-width: 1400px) {
    padding-bottom: 10%!important;
  }
  @media only screen and (min-width: 1425px) {
    padding-bottom: 5% !important
  }
}
#provinceModal {
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
