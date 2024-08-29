<template>
  <van-nav-bar title="填写服务订单" left-text="返回" left-arrow @click-left="onClickLeft" />

  <StatusBar item="0" />

  <van-cell>
    <template #title>
      <div class="flex items-center space-x-2">
        <van-image width="25" :src="orderList?.service?.serviceImg" />
        <span>{{ orderList?.service?.serviceName }}</span>
      </div>
    </template>
    <div>
      <span class="mr-2"><van-icon name="warning-o"></van-icon></span>
      服务内容
    </div>
  </van-cell>

  <van-cell-group class="bg-gray-500 border-transparent">
    <van-cell>
      <template #title>
        <div>就诊医院</div>
      </template>
      <div class="cursor-pointer justify-end flex items-center space-x-2" @click="() => (showBottom = true)">
        <span>{{ form.hospital_name || '请选择就诊医院' }}</span>
        <van-icon name="arrow"></van-icon>
      </div>
      <template #right-icon></template>
    </van-cell>
    <van-cell>
      <template #title>
        <div>就诊时间</div>
      </template>
      <div class="cursor-pointer justify-end flex items-center space-x-2" @click="() => (showStartTime = true)">
        <span>{{ currentDate || '请选择就诊时间' }}</span>
        <van-icon name="arrow"></van-icon>
      </div>
      <template #right-icon></template>
    </van-cell>
    <van-cell>
      <template #title>
        <div>陪诊师</div>
      </template>
      <div class="cursor-pointer justify-end flex items-center space-x-2" @click="() => (showCompanions = true)">
        <span>{{ companionName || '请选择陪诊师' }}</span>
        <van-icon name="arrow"></van-icon>
      </div>
      <template #right-icon></template>
    </van-cell>
    <van-cell class="items-center">
      <template #title> 接送地址 </template>
      <template #default>
        <div>
          <van-field input-align="right" v-model="form.receiveAddress" placeholder="请填写接送地址" />
        </div>
      </template>
    </van-cell>
    <van-cell class="items-center">
      <template #title> 联系电话 </template>
      <template #default>
        <div>
          <van-field input-align="right" v-model="form.tel" placeholder="请填写联系电话" />
        </div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-cell-group title="服务需求">
    <van-field show-word-limit maxlength="50" type="textarea" v-model="form.demand" placeholder="请简要描述一下。。。" rows="2" autosize />
  </van-cell-group>
  <van-button @click="onSubmit" type="primary" size="large" class="submit">提交订单</van-button>
  <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '30%' }">
    <van-picker :columns="hospitalsColumns" @confirm="onConfirm" @cancel="showBottom = false" />
  </van-popup>
  <van-popup v-model:show="showStartTime" position="bottom" :style="{ height: '30%' }">
    <van-date-picker @confirm="showTimeConfirm" @cancel="showStartTime = false" title="选择日期" :maxDate :minDate />
  </van-popup>
  <van-popup v-model:show="showCompanions" position="bottom" :style="{ height: '30%' }">
    <van-picker @confirm="showCompanionsConfirm" @cancel="showCompanions = false" :columns="companionsColumns" />
  </van-popup>
  <van-dialog v-model:show="payDialog" :showConfirmButton="false">
    <van-icon name="cross" size="30" class="absolute left-3 top-8" @click="closeCode"></van-icon>
    <div class="text-center space-y-2">
      <div class="m-auto mb-3 text-3xl">微信支付</div>
      <van-image :src="payUrl" width="150" />
      <p class="h-10 text-center">请使用本人微信扫描二维码</p>
    </div>
  </van-dialog>
</template>

<script setup lang="ts" generic="T">
import StatusBar from '@/components/StatusBar.vue'
import Qrcode from 'qrcode'
const router = useRouter()
const api: any = inject('api')
const orderList = ref()
const showBottom = ref(false)
const showStartTime = ref(false)
const showCompanions = ref(false)
const currentDate = ref()
const companionName = ref('')
const payDialog = ref(false)
const payUrl = ref('')
const minDate = computed(() => {
  return new Date()
})
const maxDate = computed(() => new Date(2026, 8, 8))
const form = reactive({
  hospital_id: '',
  hospital_name: '',
  demand: '',
  companion_id: '',
  receiveAddress: '',
  tel: '',
  starttime: 0
})
const onClickLeft = () => {
  router.back()
}

const closeCode = () => {
  router.push('/order')
}
const hospitalsColumns = computed(() => {
  return orderList.value.hospitals.map((item: any) => ({
    text: item.name,
    value: item.id
  }))
})
const companionsColumns = computed(() => {
  return orderList.value.companion.map((item: any) => ({
    text: item.name,
    value: item.id
  }))
})
onMounted(async () => {
  const res = await api.h5Companion()

  if (res.code === 10000) {
    orderList.value = res.data
  }
})

const onConfirm = (item: any) => {
  form.hospital_id = item.selectedOptions[0].value
  form.hospital_name = item.selectedOptions[0].text
  showBottom.value = false
}

const showTimeConfirm = (item: any) => {
  const time = (item.selectedValues as string[]).join('-')
  currentDate.value = time
  const timeStamp = new Date(time).getTime()
  form.starttime = timeStamp
  showStartTime.value = false
}

const showCompanionsConfirm = (item: any) => {
  form.companion_id = item.selectedOptions[0].value
  companionName.value = item.selectedOptions[0].text
  showCompanions.value = false
}

const onSubmit = async () => {
  for (let key in form) {
    //@ts-ignore
    if (!form[key]) {
      showNotify({ message: '任一项都不能为空' })
      return
    }
  }
  const res = await api.createOrder(form)

  const qrcodeUrl = await Qrcode.toDataURL(res.data.wx_code)
  payDialog.value = true
  payUrl.value = qrcodeUrl
}
</script>
<style>
.submit {
  position: absolute;
  bottom: 0;
}
</style>
