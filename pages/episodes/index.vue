<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const perPage = 20
const page = ref(route.query.page || 1)
const filter = ref({
  name: route.query.name || '',
})

const query = reactive({
  page,
  ...filter.value,
})

watchEffect(() => {
  router.push({ query: { ...route.query, page: page.value, ...query } })
})

const { data, pending, error } = useQuery('/episode', {
  query,
  lazy: true,
})

const catalog = ref()

const onPage = (e) => {
  page.value = e.page
  catalog.value.scrollIntoView()
}

const applyFilters = () => {
  for (const key in filter.value) {
    query[key] = filter.value[key]
  }

  query.page = 1
}
</script>

<template>
  <div class="space-y-4 text-white pb-4 min-h-screen">
    <Banner />

    <div
      class="grid xl:grid-cols-[300px_1fr_300px] items-start max-w-[1400px] mx-auto gap-12"
    >
      <form
        class="p-4 space-y-4 xl:sticky top-0"
        @submit.prevent="applyFilters"
      >
        <h1>Filter</h1>

        <div class="flex flex-col">
          <label for="name">Name</label>
          <InputText
            id="name"
            v-model="filter.name"
          />
        </div>

        <Button
          type="submit"
          class="w-full"
          :disabled="pending"
        >
          {{ pending ? "Loading..." : "Apply" }}
        </Button>
      </form>

      <div class="w-full">
        <div
          v-if="error"
          class="text-center space-y-2 flex items-center justify-center flex-col h-full"
        >
          <h1 class="text-xl">
            Something went wrong
          </h1>
          <p>Error from server: {{ error }}</p>

          <img
            src="/error.jpg"
            alt="Sorry about that :("
            class="rounded-lg"
          >
        </div>

        <div
          v-else-if="pending"
          class="p-4 grid grid-cols-2 gap-4"
        >
          <Skeleton
            v-for="i in perPage"
            :key="i"
            height="24rem"
          />
        </div>

        <div v-else-if="data.results?.length">
          <div
            ref="catalog"
            class="p-4 grid sm:grid-cols-2 gap-4"
          >
            <Card
              v-for="card in data.results"
              :key="card.id"
            >
              <template #title>
                {{ card.name }}
              </template>

              <template #content>
                <ul>
                  <li>
                    Type:
                    {{
                      new Intl.DateTimeFormat().format(new Date(card.air_date))
                    }}
                  </li>
                  <li>Episode: {{ card.episode }}</li>
                  <li>Characters: {{ card.characters?.length || 0 }}</li>
                </ul>
              </template>
            </Card>
          </div>

          <Paginator
            :first="page * perPage"
            :rows="perPage"
            :total-records="data.info.count"
            class="sticky bottom-0"
            @page="onPage"
          >
            <template #start="slotProps">
              <div class="flex gap-2 flex-wrap">
                <span>Page: {{ slotProps.state.page }}</span>
                <span>Rows: {{ slotProps.state.rows }}</span>
                <span>Total: {{ data.info.count }} </span>
              </div>
            </template>
          </Paginator>
        </div>
      </div>

      <Navigation />
    </div>
  </div>
</template>
