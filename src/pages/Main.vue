<template>
  <div class="h-full">
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component"></component>
        <template #fallback>
          <van-empty description="加载中..." />
        </template>
      </Suspense>
    </RouterView>

    <div style="height: 3rem"></div>
    <van-tabbar v-model="active" route active-color="#1976D2" inactive-color="#757575">
      <van-tabbar-item :to="{ path: `/${item.path}` }" v-for="item in router.options.routes[0].children" :icon="`${item.meta?.icon!}`" :key="item.path" :name="item.path">{{ item.meta?.name }} </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts" generic="T">
const active = ref('home')
const router = useRouter()
const route = useRoute()

onMounted(() => {
  const data = router.options.routes[0]
  const result = data.children?.find((item) => item.path === route.path.replace('/', ''))
  active.value = result?.path!
})
</script>
