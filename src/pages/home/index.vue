<template>
  <main class="flex px-2">
    <div class="flex items-center flex-auto flex-shrink-0">
      <van-image round width="20" height="20" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />

      <div class="font-bold text-2xl text-gray-600">中部地区</div>
      <van-icon name="arrow" />
    </div>
    <div class="flex-auto">
      <van-search v-model="value" shape="round" placeholder="找医生" />
    </div>
  </main>
  <section v-if="homeData">
    <van-swipe height="180" :autoplay="3000" lazy-render>
      <van-swipe-item class="p-2" v-for="image in homeData?.slides" :key="image.id">
        <van-image radius="10" :src="image?.pic_image_url" class="object-contain" />
      </van-swipe-item>
    </van-swipe>
    <van-row justify="space-around">
      <van-col v-for="(item, i) in homeData?.nav2s" span="11" :key="item.id">
        <van-image radius="5" :src="item?.pic_image_url" class="object-contain" @click="goOrderTwo(i)" />
      </van-col>
    </van-row>
    <van-row @click="goOrder(item)" class="border-t border-gray-200 mb-2 p-1" v-for="item in homeData?.hospitals" justify="space-around" :key="item.id">
      <van-col span="6">
        <van-image width="100" height="90" radius="5" :src="item?.avatar_url" />
      </van-col>
      <van-col span="15">
        <div class="text-lg font-bold">{{ item?.name }}</div>
        <span class="text-blue-600">{{ item?.rank }} {{ item?.label }}</span>
        <p class="line-clamp-2">{{ item?.intro }}</p>
      </van-col>
    </van-row>
  </section>
  <van-empty v-else description="加载中..." />
</template>

<script setup lang="ts" generic="T">
const value = ref('')
const api: any = inject('api')
const homeData = ref()
const router = useRouter()
onMounted(async () => {
  const res = await api.home()
  homeData.value = res.data
})
const goOrderTwo = (index: number) => {
  router.push({
    name: 'createOrder',
    query: {
      id: homeData.value.hospitals[index].id
    }
  })
}
const goOrder = (item: any) => {
  router.push({
    name: 'createOrder',
    query: {
      id: item.id
    }
  })
}
</script>
