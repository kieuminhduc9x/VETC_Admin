<template>
  <div>
    <a-row>
      <a-col :span="24" style="padding-top: 8px">
        <a-button class="btn-reset uppercase" @click="addRow"> <a-icon type="plus-circle"/></a-button>
      </a-col>
    </a-row>
    <a-row :gutter="16" type="flex">
      <a-col :span="24">
        <div class="wrapper1">
          <div class="div1"></div>
        </div>
        <a-form-model ref="validateFormExpand" :model="validateFormExpand">
          <a-table
            :columns="columns"
            :data-source="data"
            :rowKey="(item, index) => index"
            :pagination="false"
            :loading="loading"
            :components="components"
            :locale="{ emptyText: 'Chưa có dữ liệu' }"
            :scroll="{ x: 'max-content' }">
            <template slot="actionTitle">
              <a-icon type="control" :style="{fontSize: '14px'}"/>
            </template>
            <template slot="value" slot-scope="text, record, index">
              <a-form-model-item
                v-if="record.editable === true"
                ref="value"
                :prop="'items.' + index + '.value'"
                :rules="[
                  {
                    required: true,
                    message: 'Giá trị là bắt buộc',
                    trigger: 'change'
                  },
                  {
                    validator: inputNumberSpecialCharacters
                  },
                  {
                    max: 10,
                    message: 'Không nhập quá 10 ký tự'
                  }
                ]">
                <a-input v-model="record.value"></a-input>
              </a-form-model-item>
              <template v-else>
                {{ record.value }}
              </template>
            </template>
            <template slot="name" slot-scope="text, record, index">
              <a-form-model-item
                v-if="record.editable === true"
                :prop="'items.' + index + '.name'"
                :rules="[
                  {
                    required: true,
                    message: 'Tên là bắt buộc',
                    trigger: 'change'
                  },
                  {
                    max: 500,
                    message: 'Tên chỉ cho phép nhập tối đa 500 ký tự',
                    trigger: 'blur'
                  }
                ]">
                <a-input v-model="record.name"></a-input>
              </a-form-model-item>
              <template v-else>
                {{ record.name }}
              </template>
            </template>
            <template slot="description" slot-scope="text, record, index">
              <a-form-model-item
                v-if="record.editable === true"
                ref="description"
                :prop="'items.' + index + '.description'"
                :rules="{
                  required: false,
                  message: 'Trường bắt buộc',
                  trigger: 'change'
                }">
                <a-input v-model="record.description"></a-input>
              </a-form-model-item>
              <template v-else>
                {{ record.description }}
              </template>
            </template>
            <template slot="staDate" slot-scope="text, record">
              <a-form-model-item
                v-if="record.editable === true">
                <a-date-picker
                  v-model="record.staDate"
                  style="margin: -5px 0"
                  placeholder="DD/MM/YYYY"
                  :format="dateDisplayFormat"
                  :disabled-date="disabledStartDate"
                  @change="onChangeDatePicker(record)"/>
              </a-form-model-item>
              <template v-else>
                {{ moment.isMoment(record.staDate) ? record.staDate.format(datePlaceholderFormat) : record.staDate }}
              </template>
            </template>
            <template slot="endDate" slot-scope="text, record">
              <a-form-model-item
                v-if="record.editable === true">
                <a-date-picker
                  v-model="record.endDate"
                  style="margin: -5px 0"
                  placeholder="DD/MM/YYYY"
                  :format="dateDisplayFormat"
                  :disabled-date="disabledEndDate"
                  @change="onChangeEndDate(record)"/>
              </a-form-model-item>
              <template v-else>
                {{ moment.isMoment(record.endDate) ? record.endDate.format(datePlaceholderFormat) : record.endDate }}
              </template>
            </template>
            <template slot="displayOrder" slot-scope="text, record, index">
              <a-form-model-item
                v-if="record.editable === true"
                ref="displayOrder"
                :prop="'items.' + index + '.displayOrder'"
                :rules="[
                  {
                    validator: numberRequiredMaxLength
                  }
                ]">
                <a-input v-if="record.editable === true" v-model="record.displayOrder"></a-input>
              </a-form-model-item>
              <template v-else>
                {{ record.displayOrder }}
              </template>
            </template>
            <template slot="status" slot-scope="text, record, index">
              <a-form-model-item
                v-if="record.editable === true"
                :prop="'items.' + index + '.status'"
                :rules="{
                  required: true,
                  message: 'Trạng thái là bắt buộc',
                  trigger: 'change'
                }">
                <a-select v-model="record.status">
                  <a-select-option value="0">Không hoạt động</a-select-option>
                  <a-select-option value="1">Hoạt động</a-select-option>
                </a-select>
              </a-form-model-item>
              <template v-else>
                {{ record.status === '1' ? 'Hoạt động' : 'Không hoạt động' }}
              </template>
            </template>
            <template slot="operation" slot-scope="text, record, index">
              <div v-if="record.editable">
                <span @click="saveRow(record)" style="padding-right:12px;cursor: pointer">
                  <a-icon
                    type="save"
                    :style="{color: '#F98500',fontSize: '14px'}"
                  />
                </span>
                <span @click="onDeleteRow(record.globalListValueId, index)" style="cursor: pointer">
                  <a-icon
                    type="delete"
                    :style="{color: '#ee0033', fontSize: '14px'}"
                  />
                </span>
                <span @click="cancelRow(index)" style="cursor: pointer; padding-left: 12px">
                  <a-icon
                    type="stop"
                    :style="{color: '#ee0033', fontSize: '14px'}"
                  />
                </span>
              </div>
              <div v-else>
                <span @click="showEditRow(record.globalListValueId, record)" style="padding-right:12px;cursor: pointer">
                  <a-icon
                    type="form"
                    :style="{color: '#ee0033',fontSize: '14px'}"
                  />
                </span>
                <span @click="onDeleteRow(record.globalListValueId, index)" style="cursor: pointer">
                  <a-icon
                    type="delete"
                    :style="{color: '#ee0033', fontSize: '14px'}"
                  />
                </span>
              </div>
            </template>
          </a-table>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import columns from './_GlobalValueTableColumns'
import {
  GlobalListValueCreate,
  GlobalListValueDelete,
  GlobalListValueSearch,
  GlobalListValueUpdate
} from '@/api/global_list'
import resizeableTitle from '@/utils/resizable-columns'
import moment from 'moment'
import {
  inputNumberSpecialCharacters,
  numberRequiredMaxLength,
  numberRequiredMaxLengths
} from '@/utils/helpers'
const ResizeableTitle = resizeableTitle(columns)

export default {
  name: 'GlobalValueTable',
  props: {
    dataSource: {
      type: Object,
      required: true
    }
  },
  data () {
    this.components = {
      header: {
        cell: ResizeableTitle
      }
    }
    return {
      columns,
      moment,
      data: [],
      loading: false,
      fetching: false,
      lastFetchId: null,
      staDate: null,
      endDate: null,
      recordDateStart: '',
      recordDateEnd: ''
    }
  },
  computed: {
    validateFormExpand () {
      return {
        items: this.data
      }
    }
  },
  watch: {
    dataSource (old, newData) {
      if (newData.globalListDetails !== undefined && typeof newData.globalListDetails === 'object') {
        this.data = [...newData.globalListDetails]
      } else {
        this.data = []
      }
    }
  },
  mounted () {
    if (this.dataSource.globalListDetails) {
      this.data = [...this.dataSource.globalListDetails]
    } else {
      this.loading = true
      GlobalListValueSearch({ globalListId: this.dataSource.globalListId }).then(res => {
        this.dataSource.globalListDetails = this.convertPropToDisplayDate(res)
        this.data = [...this.dataSource.globalListDetails]
      }).catch(err => {
        const msg = this.handleApiError(err)
        this.$notification.error({
          message: '',
          description: msg,
          duration: 5
        })
      }).finally(res => {
        this.loading = false
      })
    }
  },
  methods: {
    inputNumberSpecialCharacters,
    numberRequiredMaxLength,
    numberRequiredMaxLengths,
    onTrim (string) {
      return string.trim()
    },
    onChangeDatePicker (record) {
      this.recordDateStart = record.staDate
    },
    onChangeEndDate (record) {
      this.recordDateEnd = record.endDate
    },
    disabledStartDate (staDate) {
      const endDate = this.recordDateEnd
      if (!staDate || !endDate) {
        return false
      }
      return staDate.valueOf() > endDate.valueOf()
    },
    disabledEndDate (endDate) {
      const staDate = this.recordDateStart
      return staDate.valueOf() >= endDate.valueOf()
    },
    canCreateOrUpdate (record) {
      return true
    },

    handleChange (val, index, col) {
      const newData = [...this.data]
      newData[index][col] = val
      this.data = newData
    },
    showEditRow (id, record) {
      const newData = [...this.data]
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].editable) {
          this.saveRow(newData[i])
        }
        if (newData[i].globalListValueId === id && this.canCreateOrUpdate(newData[i])) {
          newData[i].editable = true
        }
      }
      this.data = newData
    },
    saveRow (record) {
      this.$refs.validateFormExpand.validate(valid => {
        if (valid) {
          let params = {
            description: record.description,
            name: record.name,
            code: record.code,
            status: record.status,
            globalListId: record.globalListId,
            staDate: record.staDate,
            endDate: record.endDate,
            value: record.value,
            displayOrder: record.displayOrder
          }
          params = this.convertPropToSubmitDate(params)
          this.loading = true
          if (record.globalListValueId) {
            params['globalListValueId'] = record.globalListValueId
            GlobalListValueUpdate(params)
              .then(rs => {
                const newData = [...this.data]
                for (let i = 0; i < newData.length; i++) {
                  if (newData[i].globalListValueId === record.globalListValueId) {
                    delete newData[i].editable
                  }
                }
                this.data = newData
                this.$notification.success({
                  message: 'Danh mục dùng chung',
                  description: 'Cập nhật thành công',
                  duration: 5
                })
              })
              .catch(err => {
                const msg = this.handleApiError(err)
                this.$notification.error({
                  message: '',
                  description: msg,
                  duration: 5
                })
              }).finally(res => {
                this.loading = false
              })
          } else {
            params['globalListValueId'] = null
            GlobalListValueCreate(params).then(rs => {
              const newData = [...this.data]
              for (let i = 0; i < newData.length; i++) {
                if (newData[i].globalListValueId === record.globalListValueId) {
                  delete newData[i].editable
                  newData[i].globalListValueId = rs.globalListValueId
                }
              }
              this.data = newData
              this.$notification.success({
                message: 'Danh mục dùng chung',
                description: 'Bạn vừa tạo mới cấu hình ' + params.name,
                duration: 5
              })
            }).catch(err => {
              const msg = this.handleApiError(err)
              this.$notification.error({
                message: '',
                description: msg,
                duration: 5
              })
            }).finally(res => {
              this.loading = false
            })
          }
        }
      })
    },
    cancelRow (index) {
      const newData = [...this.data]
      delete newData[index].editable
      this.data = newData
    },
    appendRowEmpty (numberRow) {
      const { data } = this
      for (let i = 0; i < numberRow; i++) {
        const newData = {
          id: null,
          description: '',
          name: '',
          code: '',
          status: '1',
          globalListId: this.dataSource.globalListId,
          staDate: '',
          endDate: '',
          value: '',
          displayOrder: '0',
          editable: true
        }
        this.data = [newData, ...data]
      }
    },
    addRow () {
      this.appendRowEmpty(1)
    },
    onDeleteRow (id, index) {
      this.$confirm({
        title: 'Bạn muốn xóa phần cài đặt này?',
        okText: 'Có',
        okType: 'primary',
        cancelText: 'Không',
        onOk: () => {
          if (id) {
            this.deleteGLValue(id)
          }
          const newData = [...this.data]
          newData.splice(index, 1)
          this.data = newData
        },
        onCancel () {
        }
      })
    },
    deleteGLValue (id) {
      const $this = this
      this.loading = true
      GlobalListValueDelete({ globalListValueId: id })
        .then(rs => {
          $this.$notification.success({
            message: 'Danh mục dùng chung',
            description: 'Bạn vừa xóa thành công!',
            duration: 5
          })
        })
        .catch(err => {
          const msg = this.handleApiError(err)
          this.$notification.error({
            message: '',
            description: msg,
            duration: 5
          })
        }).finally(res => {
          this.loading = false
        })
    }
  }
}
</script>
