<template>
  <a-row :gutter="24">

    <a-col :xs="24" :md="6" :lg="6">
      <a-form-item label="Tỉnh / thành phố">
        <a-select
          show-search
          :filter-option="filterProvinceOptions"
          @change="onChangeProvince"
          @select="onChangeServiceForm"
          :disabled="!isEditable"
          style="width: 100%"
          :allowClear="true"
          v-decorator="['province', {
            initialValue: modelObject.province,
            rules: [{ required: true, message: 'Tỉnh / thành phố là bắt buộc' } ]
          }]">
          <a-select-option v-for="item in listProvince" :key="'province1-' + item.code" :value="item.areaCode">{{
            item.name }}
          </a-select-option>

        </a-select>
      </a-form-item>
    </a-col>
    <a-col :xs="24" :md="6" :lg="6">
      <a-form-item label="Quận/Huyện">
        <a-select
          show-search
          :filter-option="filterDistrictOptions"
          @change="onChangeDistrict"
          @select="onChangeServiceForm1"
          :disabled="!isEditable"
          style="width: 100%"
          :allowClear="false"
          v-decorator="['district', {
            initialValue: modelObject.district,
            rules: [{ required: true, message: 'Quận/Huyện là bắt buộc' } ]
          }]">
          <a-select-option v-for="item in listDistrict" :key="'district-' + item.code" :value="item.areaCode">{{
            item.name }}
          </a-select-option>

        </a-select>
      </a-form-item>
    </a-col>
    <a-col :xs="24" :md="6" :lg="6">
      <a-form-item label="Xã/Phường">
        <a-select
          show-search
          :filter-option="filterPhoeniexOptions"
          :disabled="!isEditable"
          style="width: 100%"
          :allowClear="false"
          v-decorator="['precinct', {
            initialValue: modelObject.precinct,
            rules: [{ required: true, message: 'Xã/Phường là bắt buộc' } ]
          }]">
          <a-select-option v-for="item in listPhoenix" :key="'phoenix-' + item.code" :value="item.areaCode">{{
            item.name }}
          </a-select-option>

        </a-select>
      </a-form-item>
    </a-col>

  </a-row>
</template>

<script>
import _find from 'lodash/find'
import { commonMethods } from '@/store/helpers'
import { removeUtf8 } from '@/utils/common'
export default {
  name: 'ProvinceArea',
  props: {
    isEditable: {
      type: Boolean,
      default: true
    },
    modelObject: {
      type: Object,
      required: true
    },
    form: {
      required: true
    }
  },
  data () {
    return {
      listProvince: [],
      listDistrict: [],
      listPhoenix: []
    }
  },
  async created () {
    if (this.modelObject && this.modelObject.province) {
      await this.getProvince()
      await this.onChangeProvince(this.modelObject.province)
      await this.onChangeDistrict(this.modelObject.district)
    } else {
      this.getProvince()
      this.getDistrict()
      // this.getPhoenix()
    }
  },
  watch: {
    'modelObject.province' (newVal) {
      this.getProvince()
      setTimeout(() => {
        this.onChangeProvince(this.modelObject.province)
      }, 1000)
      setTimeout(() => {
        this.onChangeDistrict(this.modelObject.district)
      }, 1900)
    }
    // modelObject: {
    //   deep: true,
    //   handler: function () {
    //     if (this.modelObject.areaCodeProvince) {
    //       this.form.setFieldsValue({
    //         'precinct': this.modelObject.areaCodeProvince
    //       })
    //     }
    //     if (this.modelObject.areaCodeDistrict) {
    //       this.form.setFieldsValue({
    //         'district': this.modelObject.areaCodeDistrict
    //       })
    //     }
    //     if (this.modelObject.areaCodePrecinct) {
    //       this.modelObject.precinct = this.modelObject.areaCodePrecinct
    //     }
    //   }
    // }
  },
  methods: {
    ...commonMethods,

    async onChangeProvince (provinceAreaCode) {
      if (!provinceAreaCode) {
        this.clearDistrictField()
        this.clearPhoenixField()
      } else {
        await this.getDistrict(provinceAreaCode)
      }
    },
    async onChangeServiceForm () {
      this.form.setFieldsValue({
        productId: null
      })
      this.form.setFieldsValue({
        provisionType: null
      })
      this.form.setFieldsValue({
        productOfferId: null
      })
      this.form.setFieldsValue({
        productOfferType: null
      })
      this.form.setFieldsValue({
        priceSale: null
      })
      this.form.setFieldsValue({
        priceMin: null
      })
      this.form.setFieldsValue({
        priceMax: null
      })
      this.form.setFieldsValue({
        quantity: null
      })
      this.form.setFieldsValue({
        subtotal: null
      })
      this.form.setFieldsValue({
        volBase: null
      })
      this.form.setFieldsValue({
        volPromotion: null
      })
      this.form.setFieldsValue({
        district: null
      })
      this.form.setFieldsValue({
        district: null
      })
      this.form.setFieldsValue({
        precinct: null
      })
      this.$emit('resetDocument', null)
    },
    async onChangeServiceForm1 () {
      this.form.setFieldsValue({
        productId: null
      })
      this.form.setFieldsValue({
        provisionType: null
      })
      this.form.setFieldsValue({
        productOfferId: null
      })
      this.form.setFieldsValue({
        productOfferType: null
      })
      this.form.setFieldsValue({
        priceSale: null
      })
      this.form.setFieldsValue({
        priceMin: null
      })
      this.form.setFieldsValue({
        priceMax: null
      })
      this.form.setFieldsValue({
        quantity: null
      })
      this.form.setFieldsValue({
        subtotal: null
      })
      this.form.setFieldsValue({
        volBase: null
      })
      this.form.setFieldsValue({
        volPromotion: null
      })
      this.form.setFieldsValue({
        precinct: null
      })
      this.$emit('resetDocument', null)
    },
    async onChangeDistrict (districtAreaCode) {
      if (!districtAreaCode) {
        this.clearDistrictField()
      } else {
        await this.getPhoenix(districtAreaCode)
      }
    },
    clearDistrictField () {
      this.form.setFieldsValue({
        district: null
      })
      this.listDistrict = []
    },

    clearPhoenixField () {
      this.form.setFieldsValue({
        precinct: null
      })
      this.listPhoenix = []
    },

    async getProvince () {
      await this.fetchProvinces().then(res => {
        if (res) {
          this.listProvince = res
          return null
        }
      })
    },
    async getDistrict (province) {
      await this.fetchDistricts(province).then(res => {
        if (res) {
          this.listDistrict = res
          return null
        }
      })
    },
    async getPhoenix (district) {
      await this.fetchPhoenixes(district).then(res => {
        if (res) {
          this.listPhoenix = res
          return null
        }
      })
    },
    filterProvinceOptions (val, option) {
      const opt = _find(this.listProvince, { areaCode: option.componentOptions.propsData.value })
      return opt && removeUtf8(opt.name.toLowerCase()).includes(removeUtf8(val))
    },

    filterDistrictOptions (val, option) {
      const opt = _find(this.listDistrict, { areaCode: option.componentOptions.propsData.value })
      return opt && removeUtf8(opt.name.toLowerCase()).includes(removeUtf8(val))
    },

    filterPhoeniexOptions (val, option) {
      const opt = _find(this.listPhoenix, { areaCode: option.componentOptions.propsData.value })
      return opt && removeUtf8(opt.name.toLowerCase()).includes(removeUtf8(val))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
