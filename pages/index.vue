<template>
  <h1>GPT-3 APP</h1>
  <form @submit.prevent="handleClick">
    <v-row>
      <v-col cols="3">
        <v-text-field v-model="keyword" />
      </v-col>
    </v-row>
    <div>
      <button type="submit">
        <template v-if="loading">
          Loading...
        </template>
        <template v-else>
          テキスト生成
        </template>
      </button>
    </div>
  </form>
  <div>
    <h2>生成したテキスト</h2>
    <div v-for="text of gptTexts">
      {{ text.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { GptText } from '~/types';

const keyword = ref('');
const gptTexts = ref<GptText[]>([])
const loading = ref(false)

const prompt = computed(() => `
  「${keyword.value}」の英文について文法的に間違っている箇所を特定し、文法に間違いがあればそれを指摘してください。
  間違いがなければ会話を続けてください。
`)
// const prompt = computed(() => keyword.value)

const handleClick = async () => {
  loading.value = true

  const { data } = await useFetch('/api/generate', {
    method: 'POST',
    body: { prompt }
  })

  gptTexts.value.push({
    value: data.value.choices[0].text
  })

  loading.value = false
}
</script>