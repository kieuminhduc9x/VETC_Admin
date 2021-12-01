<template>
  <a-card>
    <span id="virtual-click"></span>
    <a-form-model
      v-if="formPlan"
      :model="formPlan"
      :rules="rules2"
      ref="creatingForm">
      <a-collapse v-model="activeKey" class="contract-information">
        <a-collapse-panel header="Thông tin kế hoạch" class="header-contant" key="1">
          <a-card style="width: 100%;" :bordered="false">
            <a-row :gutter="16">
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                style="    padding-left: 0;
    padding-right: 0">
                <a-col :xs="24" :md="8" :lg="8">
                  <a-form-model-item prop="planCode" ref="planName" label="Mã kế hoạch">
                    <a-input :disabled="isDetail" v-model="formPlan.planCode" @blur="trimSpace"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :xs="24" :md="8" :lg="8">
                  <a-form-model-item prop="planName" ref="planName" label="Tên kế hoạch">
                    <a-input :disabled="isDetail" v-model="formPlan.planName" @blur="trimSpaceName"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-col>
              <a-col :xs="24" :md="8" :lg="8">
                <a-form-model-item prop="planType" ref="planType" label="Kế hoạch doanh thu">
                  <a-select
                    :filter-option="filterSelectOption"
                    @change="onChangePlanTypeByCreate"
                    :allowClear="true"
                    :disabled="formPlan.id ? true : false"
                    show-search
                    style="width: 100%;color: #000c17!important;"
                    v-model="formPlan.planType"
                  >
                    <a-select-option
                      v-for="item in renderPlanType"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col
                v-if="formPlan.planType === '1'"
                :xs="24"
                :md="8"
                :lg="8"
              >
                <a-form-model-item prop="month" label="Tháng">
                  <a-select
                    :disabled="isDetail"
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="formPlan.month"
                  >
                    <a-select-option
                      v-for="item in renderMonth"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col
                v-if="formPlan.planType === '2'"
                :xs="24"
                :md="8"
                :lg="8"
              >
                <a-form-model-item prop="quarter" label="Quý">
                  <a-select
                    :disabled="isDetail"
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="formPlan.quarter"
                  >
                    <a-select-option
                      v-for="item in renderQuater"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="8" :lg="8">
                <a-form-model-item prop="year" label="Năm">
                  <a-select
                    :disabled="isDetail"
                    :filter-option="filterSelectOption"
                    :allowClear="true"
                    show-search
                    style="width: 100%"
                    v-model="formPlan.year"
                  >
                    <a-select-option
                      v-for="item in renderYear"
                      :key="'p-g-' + item.id"
                      :value="item.id">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
      <a-collapse v-model="activeResultKey" expandIconPosition="left" style=" margin-top: 8px" class="collapse-left">
        <a-collapse-panel header="Thông tin chi tiết" key="2">
          <a-card style="width: 100%; border: none" class="vts-table-container">
            <a-row>
              <a-col style="display: flex; justify-content: flex-end;margin-bottom: 20px">
                <a-button
                  v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI') && !isDetail"
                  class="ant-btn ant-btn-primary"
                  :style="{marginRight: '8px'}"
                  @click="openCreateProvince">
                  <a-icon
                    type="plus-circle"
                  />
                  Thêm tỉnh
                </a-button>
                <a-button
                  v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI') && !isDetail"
                  class="ant-btn ant-btn-primary"
                  :style="{marginRight: '8px'}"
                  @click="openCreateService">
                  <a-icon
                    type="plus-circle"
                  />
                  Thêm sản phẩm
                </a-button>
                <a-button
                  v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI') && !isDetail"
                  class="ant-btn ant-btn-primary"
                  :style="{marginRight: '8px'}"
                  :disabled="isDeleteCol"
                  @click="openDeleteService">
                  <a-icon
                    type="minus-circle"
                  />
                  Xóa sản phẩm
                </a-button>
                <a-button
                  v-if="hasComponentPermission('QLKD_THAM_SO_HE_THONG_THEM_MOI') && !isDetail"
                  class="ant-btn ant-btn-primary"
                  :style="{marginRight: '8px'}"
                  :disabled="isDisabledDelProvince"
                  @click="handProvince">
                  <a-icon
                    type="minus-circle"
                  />
                  Xóa Tỉnh thành
                </a-button>
              </a-col>
            </a-row>
            <a-row>
              <a-col style="display: flex; justify-content: flex-end;margin-bottom: -10px">
                <span style="font-weight: bold;padding-right: 4px;padding-top: 5px">
                  <span style="color: red;margin-right: 6px">{{
                    !isDetail ? '*' : ''
                  }}</span><span>Đơn vị{{ !isDetail ? '' : ':' }}</span>
                </span>
                <a-col :xs="24" :md="4" :lg="4" style="text-align: right">
                  <a-form-model-item prop="unitType">
                    <a-select
                      show-search
                      class="select-create-province"
                      :default-active-first-option="false"
                      :show-arrow="true"
                      :dropdownMatchSelectWidth="false"
                      :filter-option="false"
                      :disabled="isDetail"
                      v-model="formPlan.unitType"
                    >
                      <a-select-option
                        v-for="item in unitTypes"
                        :key="'c-t-' + item.id"
                        :value="item.id">
                        {{ item.name }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-form-model ref="formValidate2" :model="formValidate2">
                  <div class="wrapper1">
                    <div class="div1"></div>
                  </div>
                  <a-table
                    v-if="!isDetail"
                    ref="tb1"
                    :columns="columnsCreate"
                    :data-source="dataRow"
                    :rowKey=" (rowKey, index ) => index"
                    :loading="loadingUpdate"
                    :pagination="false"
                    :row-selection="{
                      hideSelectAllCheckbox : true, selectedRowKeys: selectedRowKeys, onChange: onChangeSelecting, getCheckboxProps: record => ({
                        props: {
                          disabled: record.province === 'sum' || String(record.province) === 'NaN' || isDetail,
                          hiddenClassName: record.province === 'sum' || String(record.province) === 'NaN' || isDetail
                        }
                      }),
                      visible: true,
                      rowSelection : isDetail,
                      hideDefaultSelections: true,
                      selections: true

                    }
                    "
                    :scroll="{ x: 'max-content' }"
                    :locale="{ emptyText: 'Chưa có dữ liệu' }"
                    class="ant-table-bordered table-tb1">
                    <template slot="actionTitle">
                      <a-icon type="control" :style="{fontSize: '14px'}"/>
                    </template>
                    <template slot="rowIndex" slot-scope="text, record, index">
                      {{ index === 0 ? null : index }}
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                      <div>
                        <span @click="onChangeRow(index, record)" style="cursor: pointer" v-if="index > 0">
                          <a-icon
                            type="delete"
                            :style="{color: '#F98500', fontSize: '14px'}"
                          />
                        </span>
                      </div>
                    </template>
                    <template slot="province" slot-scope="text, record, index">
                      <span v-if="index === 0">
                        <span style="font-weight: bold">
                          {{ text === 'sum' || String(text) === 'NaN' ? 'Tổng Tiền' : null }}
                        </span>
                      </span>
                      <span v-else>
                        {{ text === 'sum' ? 'Tổng tiền' : getText(listProvince, record.province) }}
                      </span>
                    </template>
                    <template slot="sumListProvince" slot-scope="text, record, index">
                      <span v-if="index === 0">
                        <span style="font-weight: bold">
                          {{ formatPrice2(text) }}
                        </span>
                      </span>
                      <span v-else style="font-weight: 500">
                        {{ formatPrice2(text) }}
                      </span>
                    </template>
                    <template
                      v-for="item in editColums"
                      :slot="item.dataIndex"
                      slot-scope="text, record, index"
                    >
                      <a-input-number
                        @keydown="onKeydownNumber"
                        v-if="index !== 0 && isDetail !== true"
                        @change="onChangeService(index, item.dataIndex)"
                        :key="item.dataIndex"
                        v-currency="convertMoney"
                        :min="0"
                        class="inputType ant-input"
                        :disabled="isDetail || index === 0"
                        v-model="record[item.dataIndex]"
                      />
                      <span v-else :key="item.dataIndex" style="font-weight: 500">
                        {{ formatPrice2(record[item.dataIndex]) }}
                      </span>
                    </template>
                  </a-table>
                  <a-table
                    v-else
                    ref="tb1"
                    :columns="columnsCreate"
                    :data-source="dataRow"
                    :rowKey=" (rowKey, index ) => index"
                    :loading="loadingUpdate"
                    :pagination="false"
                    :scroll="{ x: 'max-content' }"
                    :locale="{ emptyText: 'Chưa có dữ liệu' }"
                    class="ant-table-bordered table-tb1">
                    <template slot="actionTitle">
                      <a-icon type="control" :style="{fontSize: '14px'}"/>
                    </template>
                    <template slot="rowIndex" slot-scope="text, record, index">
                      {{ index === 0 ? null : index }}
                    </template>
                    <template slot="operation" slot-scope="text, record, index">
                      <div>
                        <span @click="onChangeRow(index, record)" style="cursor: pointer" v-if="index > 0">
                          <a-icon
                            type="delete"
                            :style="{color: '#F98500', fontSize: '14px'}"
                          />
                        </span>
                      </div>
                    </template>
                    <template slot="province" slot-scope="text, record, index">
                      <span v-if="index === 0">
                        <span style="font-weight: bold">
                          {{ text === 'sum' || String(text) === 'NaN' ? 'Tổng Tiền' : null }}
                        </span>
                      </span>
                      <span v-else>
                        {{ text === 'sum' ? 'Tổng tiền' : getText(listProvince, record.province) }}
                      </span>
                    </template>
                    <template slot="sumListProvince" slot-scope="text, record, index">
                      <span v-if="index === 0">
                        <span style="font-weight: bold">
                          {{ formatPrice2(text) }}
                        </span>
                      </span>
                      <span v-else style="font-weight: 500">
                        {{ formatPrice2(text) }}
                      </span>
                    </template>
                    <template
                      v-for="item in editColums"
                      :slot="item.dataIndex"
                      slot-scope="text, record, index"
                    >
                      <a-input-number
                        v-if="index !== 0 && isDetail !== true"
                        :key="item.dataIndex"
                        class="inputType ant-input"
                        :disabled="true"
                        v-model="record[item.dataIndex]"
                      />
                      <span v-else :key="item.dataIndex" style="font-weight: 500">
                        {{ formatPrice2(record[item.dataIndex]) }}
                      </span>
                    </template>
                  </a-table>
                </a-form-model>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
      <a-row :gutter="24" type="flex" justify="space-around" align="middle">
        <a-col
          :xs="24"
          :md="24"
          :lg="24"
          style=" margin-top: 0.5rem;margin-bottom:1.5rem;display:flex;justify-content:center">

          <a-button type="primary" @click="confirmCreate" :loading="loadingSave" v-if="!isDetail">Lưu</a-button>
          <a-button
            @click="resetAll"
            :loading="loadingSave"
            v-if="!formPlan.id"
            style="margin-left: 1rem; min-width:120px">Nhập lại
          </a-button>
          <a-button @click="gotoListg('businessPlan')" style="margin-left: 1rem; min-width:120px"> Quay lại</a-button>

        </a-col>
      </a-row>
    </a-form-model>
    <a-modal
      v-model="modalCreateType"
      :width="'28%'"
      :title="'Thêm sản phẩm'"
      @cancel="handleCancelCreate"
      :destroyOnClose="true"
      :closeIcon="false">
      <template slot="footer">
        <a-button key="back" :loading="modalLoading" @click="handleCancelCreate">
          {{ 'Quay lại' }}
        </a-button>
        <a-button key="submit" type="primary" :loading="modalLoading" @click="createCol">
          {{ 'Thêm mới' }}
        </a-button>
      </template>
      <create-type-service @fetchDataCol="fetchDataCol" :datable="editColums" style="padding-bottom: 55%"/>
    </a-modal>
    <a-modal
      v-model="modalCreateTypeProvince"
      :width="'40%'"
      height="500px"
      :title="'Thêm Tỉnh'"
      @cancel="handleCancelCreateProvince"
      :destroyOnClose="true"
      :closeIcon="false">
      <template slot="footer">
        <a-button key="back" :loading="isLoadingCreateProvince" @click="handleCancelCreateProvince">
          {{ 'Quay lại' }}
        </a-button>
        <a-button key="submit" type="primary" :loading="isLoadingCreateProvince" @click="addRow">
          {{ 'Thêm mới' }}
        </a-button>
      </template>
      <create-province @fetchDataRow="fetchDataRow" :datable="dataRow" style="padding-bottom: 55%"/>
    </a-modal>
    <a-modal
      v-model="modalDeleteType"
      :width="'28%'"
      :title="'Xóa sản phẩm'"
      @cancel="handleCancelDel"
      :destroyOnClose="true"
      :closeIcon="false">
      <template slot="footer">
        <a-button key="back" :loading="modalLoading" @click="handleCancelDel">
          {{ 'Quay lại' }}
        </a-button>
        <a-button key="submit" type="primary" :loading="modalLoading" :disabled="isDelBtn" @click="doDelColums">
          {{ 'Loại bỏ' }}
        </a-button>
      </template>
      <delete-type-service @delColums="fetchColums" :list-colums="editColums" :style="editColums.length > 4 ? {paddingBottom: '55%'} : {paddingBottom: '30%'}"/>
    </a-modal>
  </a-card>
</template>

<script>
import { globalListComputed } from '@/store/helpers'
import CreateTypeService from '@/pages/Cims/BusinessPlan/CreateTypeService'
import DeleteTypeService from '@/pages/Cims/BusinessPlan/DeleteTypeService'
import CreateProvince from '@/pages/Cims/BusinessPlan/CreateProvince'
import { createRevenuePlane, getProvince, updateRevenuePlan } from '@/api/businessPlan'
import { numberRequired } from '@/utils/helpers'
import moment from 'moment'
import _ from 'lodash'

const columnsCreate = [
  {
    slots: { title: 'actionTitle' },
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    width: 50,
    align: 'center'
  },
  {
    title: 'STT',
    dataIndex: 'rowIndex',
    scopedSlots: {
      customRender: 'rowIndex'
    },
    align: 'center',
    ellipsis: true,
    width: 50
  },
  {
    title: 'Tỉnh',
    dataIndex: 'province',
    scopedSlots: { customRender: 'province' },
    align: 'left',
    width: 350
  }
]
export default {
  name: 'Form',
  components: {
    CreateTypeService,
    DeleteTypeService,
    CreateProvince

  },
  props: {
    dataRowNew: {
      type: Array,
      default: function () {
        return []
      }
    },
    editColumsProps: {
      type: Array
    },
    columnsCreateProps: {
      type: Array
    },
    loadingUpdate: {
      type: Boolean,
      default: true
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    isUpdate: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    formPlanProps: {
      type: Object
    },
    dataSumProduct: {
      type: Array
    },
    columsSum: {
      type: Array
    },
    formartPrice: {
      type: Array
    }
  },
  data () {
    return {
      columnsCreate,
      modalVisible: false,
      modalLoading: false,
      loadingSave: false,
      loading: false,
      moment,
      isLoadingCreateProvince: false,
      isCreateBtnProvince: false,
      isDelBtn: true,
      modalCreateTypeProvince: false,
      modalCreateType: false,
      modalDeleteType: false,
      selectedRowKeys: [],
      formPlan: {
        unitType: '1',
        planType: '1',
        planName: '',
        planCode: '',
        id: null,
        month: '',
        quarter: '',
        year: ''
      },
      unitTypes: [
        {
          id: '1',
          name: 'Nghìn (VNĐ)'
        },
        {
          id: '2',
          name: 'Triệu (VNĐ)'
        },
        {
          id: '3',
          name: 'Tỷ (VNĐ)'
        }
      ],
      sumProvince: {
        sumProduct: ''
      },
      isMouseConvert: false,
      activeKey: 1,
      activeResultKey: 2,
      newColums: [],
      sumProduct: [],
      titleCoLums: [],
      sumProductColums: [
        {
          title: 'Tổng Tiền',
          dataIndex: 'sumListProvince',
          scopedSlots: {
            customRender: 'sumListProvince'
          },
          align: 'center',
          ellipsis: true,
          width: 80
        }
      ],
      dataRow: [
        {
          province: 'sum',
          sumListProvince: 0
        }
      ],
      listProvince: [],
      selectedRows: [],
      fetchData: {},
      fetchRow: null,
      fetchProduct: null,
      dataForm: [],
      editColums: [],
      sumRevenueProvince: null,
      sumRevenueProduct: null,
      rules2: {
        planType: [{ required: !this.isDetail, message: 'Kế hoạch doanh thu là trường bắt buộc' }],
        unitType: [{ required: !this.isDetail, message: 'Đơn vị là trường bắt buộc' }],
        planCode: [{ required: !this.isDetail, message: 'Mã kế hoạch là trường bắt buộc' },
          { max: 20, message: 'Mã kế hoạch là không vượt quá 20 ký tự' }
        ],
        planName: [{ required: !this.isDetail, message: 'Tên kế hoạch là trường bắt buộc' },
          { max: 255, message: 'Tên kế hoạch là không vượt quá 255 ký tự' }
        ],
        year: [
          { required: !this.isDetail, message: 'Năm là trường bắt buộc' }
        ],
        month: [
          { required: !this.isDetail, message: 'Tháng là trường bắt buộc' }
        ],
        quarter: [
          { required: !this.isDetail, message: 'Quý là trường bắt buộc' }
        ]
      },
      renderPlanType: [
        {
          id: '1',
          name: 'Tháng'
        },
        {
          id: '2',
          name: 'Quý'
        },
        {
          id: '3',
          name: 'Năm'
        }
      ]
    }
  },
  created () {
    if (this.isCreate) {
      this.resetAll()
      this.formPlan.unitType = '1'
    }
    if (this.dataRowNew) {
      this.dataRow = this.dataRowNew
    }
  },
  computed: {
    ...globalListComputed,
    convertMoney () {
      return {
        precision: 2,
        currency: null,
        locale: 'zh-ZH',
        allowNegative: false,
        distractionFree: false,
        valueAsInteger: false,
        autoDecimalMode: false
      }
    },
    isDisabledDelProvince () {
      const selection = this.selectedRowKeys
      if (selection.length > 0) {
        return false
      }
      return true
    },
    formValidate2 () {
      return {
        items: this.dataRow
      }
    },
    renderQuater () {
      const arr = []
      for (let i = 1; i < 5; i++) {
        const Obj = {
          id: i,
          name: 'Quý ' + i
        }
        arr.push(Obj)
      }
      return arr
    },
    renderMonth () {
      const arr = []
      for (let i = 1; i < 13; i++) {
        const Obj = {
          id: i,
          name: 'Tháng ' + i
        }
        arr.push(Obj)
      }
      return arr
    },
    renderYear () {
      const arr = []
      for (let i = 2019; i < 2040; i++) {
        const Obj = {
          id: i,
          name: 'Năm ' + i
        }
        arr.push(Obj)
      }
      return arr
    },
    isDeleteCol () {
      const isButton = this.editColums
      if (isButton) {
        if (isButton.length > 0) {
          return false
        } else {
          return true
        }
      }
      return true
    }
  },
  mounted () {
    this.getProvinceList()
    if (this.dataSumProduct) {
      this.sumProduct = this.dataSumProduct
    }
  },
  methods: {
    numberRequired,
    trimSpace (val) {
      const data = val.target.value.trim()
      this.formPlan.planCode = data
    },
    trimSpaceName (val) {
      const data = val.target.value.trim()
      this.formPlan.planName = data
    },
    onChangeSelecting (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handProvince () {
      const listAreaCode = this.selectedRows.map(item => {
        return item.province
      })
      const newData = this.dataRow.filter(value => !listAreaCode.includes(value.province))
      this.dataRow = [...newData]
      this.selectedRowKeys = []
      this.selectedRows = []
      this.dataRow.forEach((item, index) => {
        this.sumRow(index)
        for (const p in item) {
          this.sumColumn(p)
        }
      })
    },
    getText (arr, id) {
      if (id !== '') {
        for (var i in arr) {
          if (arr.hasOwnProperty(i) && arr[i].areaCode === id) {
            return arr[i].fullName
          }
        }
      }
      return null
    },
    resetAll () {
      this.editColums = []
      this.dataRow = [
        {
          province: 'sum',
          sumListProvince: 0
        }
      ]
      this.formPlan = {
        planType: '1',
        unitType: '1',
        id: null,
        month: moment().month() + 1,
        quarter: null,
        year: moment().year()
      }
      this.columnsCreate = [
        {
          slots: { title: 'actionTitle' },
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 50,
          align: 'center'
        },
        {
          title: 'STT',
          dataIndex: 'rowIndex',
          scopedSlots: {
            customRender: 'rowIndex'
          },
          align: 'center',
          ellipsis: true,
          width: 50
        },
        {
          title: 'Tỉnh',
          dataIndex: 'province',
          scopedSlots: { customRender: 'province' },
          align: 'left',
          width: 350
        }
      ]
    },
    handleCancelCreateProvince () {
      this.fetchRow = null
      this.modalCreateTypeProvince = false
    },
    getProvinceList () {
      getProvince().then(res => {
        this.listProvince = res
      })
    },
    onChangePlanTypeByCreate (val) {
      if (val === '1') {
        this.formPlan = {
          planType: this.formPlan.planType,
          unitType: this.formPlan.unitType,
          month: this.moment().month() + 1,
          quarter: null,
          planCode: this.formPlan.planCode,
          planName: this.formPlan.planName,
          year: this.moment().year()
        }
      } else if (val === '2') {
        this.formPlan = {
          planType: this.formPlan.planType,
          unitType: this.formPlan.unitType,
          month: null,
          quarter: this.moment().quarter(),
          year: this.moment().year(),
          planCode: this.formPlan.planCode,
          planName: this.formPlan.planName
        }
      } else {
        this.formPlan = {
          planType: this.formPlan.planType,
          unitType: this.formPlan.unitType,
          month: null,
          quarter: null,
          year: this.moment().year(),
          planCode: this.formPlan.planCode,
          planName: this.formPlan.planName
        }
      }
    },
    fetchDataCol (data) {
      this.fetchData = data
      this.fetchProduct = data
    },
    openCreateProvince () {
      this.modalCreateTypeProvince = true
    },
    openCreateService () {
      this.modalCreateType = true
    },
    openDeleteService () {
      this.modalDeleteType = true
    },
    handleCancelCreate () {
      this.modalCreateType = false
      this.fetchData = {}
    },

    handleCancelCreateType () {
      this.modalCreateType = false
    },
    handAllCreateColums () {
      this.columnsCreate = [
        {
          slots: { title: 'actionTitle' },
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          width: 50,
          align: 'center'
        },
        {
          title: 'STT',
          dataIndex: 'rowIndex',
          scopedSlots: {
            customRender: 'rowIndex'
          },
          align: 'center',
          ellipsis: true,
          width: 50
        },
        {
          title: 'Tỉnh',
          dataIndex: 'province',
          scopedSlots: { customRender: 'province' },
          align: 'left',
          width: 350
        }
      ]
    },
    createCol () {
      if (this.fetchProduct === null) {
        this.$error({ title: 'Thông báo', content: 'Bạn chưa chọn sản phẩm' })
      } else {
        this.modalLoading = true
        setTimeout(() => {
          const arrNameColums = []
          this.columnsCreate.forEach(item => {
            arrNameColums.push(item.dataIndex)
          })
          this.columnsCreate = this.columnsCreate.filter(item => item.dataIndex !== 'sumListProvince')
          const oldData = this.fetchData.map(item => {
            return {
              title: item.productCode,
              dataIndex: item.productId,
              scopedSlots: { customRender: item.productId },
              align: 'center',
              width: 100
            }
          })
          oldData.forEach(item => {
            this.columnsCreate.push(item)
            this.editColums.push(item)
          })
          /*
          const data = this.dataRow.map(item => {
            this.fetchData.forEach(i => {
              item[i.productId] = ''
            })
            return item
          })
          */
          // this.dataRow = _.uniqWith(data, _.isEqual)
          this.columnsCreate = _.uniqWith(this.columnsCreate, _.isEqual).concat(this.sumProductColums)
          this.editColums = _.uniqWith(this.editColums, _.isEqual)
          this.modalCreateType = false
          this.fetchData = []
          this.modalLoading = false
          this.fetchProduct = null
        }, 50)
      }
    },

    appendRowEmpty () {
      setTimeout(() => {
        for (const fRow in this.fetchRow) {
          if (this.fetchRow.hasOwnProperty(fRow)) {
            const row = {
              province: this.fetchRow[fRow].areaCode,
              sumListProvince: 0
            }
            if (this.editColums.length > 0) {
              for (const col in this.editColums) {
                if (this.editColums.hasOwnProperty(col)) {
                  row[col.dataIndex] = null
                }
              }
            }
            this.dataRow.push(row)
          }
        }
        this.isLoadingCreateProvince = false
        this.handleCancelCreateProvince()
      }, 50)
    },
    loadingProvince () {
      this.isLoadingCreateProvince = true
    },
    addRow () {
      if (this.fetchRow === null) {
        this.$error({ title: 'Thông báo', content: 'Bạn chưa chọn tỉnh thành' })
      } else {
        this.loadingProvince()
        this.appendRowEmpty()
      }
    },
    fetchDataRow (data) {
      this.fetchRow = data
    },
    handleCancelDel () {
      this.modalDeleteType = false
      this.isDelBtn = true
    },
    doDelColums () {
      const colums = this.newColums
      const listTitle = this.titleCoLums
      if (colums && listTitle) {
        this.editColums = colums
        this.columnsCreate = listTitle
        const oldData = this.oldDataColums
        this.dataRow.forEach((item, index) => {
          if (this.editColums.length === 0) {
            delete item.sumListProvince
          }
          delete item[oldData]
          let total = 0
          for (const p in item) {
            if (item.hasOwnProperty(p)) {
              if (['province', 'productId', 'revenue', 'sumListProvince'].indexOf(p) === -1) {
                total += item[p]
              }
            }
          }
          item['sumListProvince'] = total
        })
        this.modalDeleteType = false
      }
    },
    fetchColums (colums) {
      this.oldDataColums = colums.dataIndex
      if (colums) {
        this.isDelBtn = false
        this.newColums = this.editColums.filter(item => item.dataIndex !== colums.dataIndex)
        this.titleCoLums = this.columnsCreate.filter(item => item.dataIndex !== colums.dataIndex)
      }
    },
    async doCreate () {
      const that = this
      that.loadingSave = true
      const params = {
        'lstRevenuePlanDetail': [],
        'month': this.formPlan.month !== '' ? this.formPlan.month : null,
        'planName': this.formPlan.planName !== '' ? this.formPlan.planName : null,
        'unitType': this.formPlan.unitType !== '' ? this.formPlan.unitType : null,
        'planCode': this.formPlan.planCode !== '' ? this.formPlan.planCode : null,
        'planType': this.formPlan.planType !== '' ? this.formPlan.planType : null,
        'year': this.formPlan.year !== '' ? this.formPlan.year : null,
        'quarter': this.formPlan.quarter !== '' ? this.formPlan.quarter : null,
        'revenuePlanId': this.formPlan.id ? this.formPlan.id : null,
        'status': 1
      }
      let data = _.cloneDeep(this.dataRow)
      data = data.filter(item => item.province !== 'sum' && item.province !== null && item.province !== undefined && String(item.province) !== 'NaN')
      data.forEach(item => {
        delete item.undefined
        if (String(item.province) === 'NaN') {
          delete item.province
        }
      })
      data.forEach(row => {
        const exclusions = ['operation', 'rowIndex', 'province', 'productId', 'revenue', 'sumListProvince']
        const item = {
          'lstRevenueProduct': [],
          'province': row.province
        }
        Object.keys(row).forEach(k => {
          if (exclusions.indexOf(k) === -1) {
            if (row.hasOwnProperty(k)) {
              item.lstRevenueProduct.push({
                'productId': Number(k),
                'revenue': that.trimRemove(row[k]).replace(/₫/g, '').replace(/,/g, '') !== 'null' ? Number(that.trimRemove(row[k]).replace(/₫/g, '').replace(/,/g, '')) : null
              })
            }
          }
        })
        params.lstRevenuePlanDetail.push(item)
      })
      if (!this.formPlan.id) {
        createRevenuePlane(params).then(res => {
          this.gotoListg('businessPlan')
          this.$success({ title: 'Tạo mới kế hoạch thành công' })
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
        }).finally(() => {
          that.loadingSave = false
        })
      } else {
        updateRevenuePlan(params).then(res => {
          this.gotoListg('businessPlan')
          this.$success({ title: 'Cập nhật kế hoạch thành công' })
        }).catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
        }).finally(() => {
          that.loadingSave = false
        })
      }
    },
    confirmCreate () {
      const that = this
      this.$refs.formValidate2.validate(valid => {
        if (valid) {
          that.$confirm({
            title: this.formPlan.id ? 'Bạn có chắc chắn muốn cập nhật?' : 'Bạn có chắn muốn thêm mới?',
            onOk () {
              that.doCreate()
            }
          })
        }
      })
    },
    onChangeRow (index, record) {
      this.$confirm({
        title: 'Bạn muốn thay đổi phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        keyboard: true,
        confirmLoading: true,
        cancelText: 'Không',
        onOk: () => {
          this.confirmLoading = false
          const data = _.cloneDeep(this.dataRow)
          const newData = []
          for (let i = 0; i < data.length; i++) {
            if (i !== index) {
              newData.push(data[i])
            }
          }
          this.dataRow = newData
          for (const row in record) {
            this.sumColumn(row)
          }
        }
      })
    },
    onMouseOut () {
      this.isMouseConvert = true
    },
    onMouseMove () {
      this.isMouseConvert = false
    },
    onBlurService (val) {
    },
    onChangeService (row, col) {
      this.sumRow(row)
      this.sumColumn(col)
      this.activeKey = 0
      this.activeKey = 1
    },
    sumRow (currentRow) {
      let total = 0
      let totalAll = 0
      for (const p in this.dataRow[currentRow]) {
        if (this.dataRow[currentRow].hasOwnProperty(p) && ['rowIndex', 'productId', 'revenue', 'province', 'operation', 'sumListProvince'].indexOf(p) === -1) {
          total += this.trimRemove2(this.dataRow[currentRow][p]).replace(/,/g, '') !== 'null' ? Number(this.trimRemove2(this.dataRow[currentRow][p]).replace(/,/g, '')) : null
        }
      }
      for (const p in this.dataRow[0]) {
        if (this.dataRow[0].hasOwnProperty(p) && ['rowIndex', 'productId', 'revenue', 'province', 'operation', 'sumListProvince'].indexOf(p) === -1) {
          totalAll += this.trimRemove2(this.dataRow[0][p]).replace(/,/g, '') !== 'null' ? Number(this.trimRemove2(this.dataRow[0][p]).replace(/,/g, '')) : null
        }
      }
      this.dataRow[0]['sumListProvince'] = totalAll
      this.dataRow[currentRow]['sumListProvince'] = total
    },
    sumColumn (currentColumn) {
      let sumCol = 0
      for (const row in this.dataRow) {
        if (row > 0 && this.dataRow.hasOwnProperty(row) && this.dataRow[row][currentColumn]) {
          sumCol += parseFloat(this.dataRow[row][currentColumn])
        }
      }
      this.dataRow[0][currentColumn] = sumCol
    }
  },
  watch: {
    editColumsProps: {
      deep: true,
      handler (val) {
        this.editColums = val
      }
    },
    columnsCreateProps: {
      deep: true,
      handler (val) {
        this.columnsCreate = val
      }
    },
    formPlanProps: {
      deep: true,
      handler (val) {
        this.formPlan = val
      }
    }
  }
}
</script>

<style lang="less">

.plan-input {
  margin-bottom: 0 !important;
}

.ant-input-number-handler-wrap {
  display: none;
}

.ant-input-number input {
  text-align: right;
  margin-right: -30px !important;
}

.ant-input-disabled {
  color: #000c17 !important;
}
.ant-select-selection__rendered {
  color: #000c17 !important;
}
.table-tb1 {
  .ant-table-fixed {
    thead {
      tr {
        th {
          &:first-child {
            .ant-table-selection {
              display: none;
            }
          }
        }
      }
    }
  }

}
</style>
