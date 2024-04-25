<template>
  <div class="box">
    <NPopover trigger="click">
      <template #trigger>
        <div class="setting">
          <NIcon size="40">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
              <path d="M416.3,256c0-21,13.1-38.9,31.7-46.1c-4.9-20.5-13-39.7-23.7-57.1c-6.4,2.8-13.2,4.3-20.1,4.3c-12.6,0-25.2-4.8-34.9-14.4
	c-14.9-14.9-18.2-36.8-10.2-55C341.8,77,322.5,68.9,302.1,64C295,82.5,277,95.7,256,95.7c-21,0-39-13.2-46.1-31.7
	c-20.5,4.9-39.7,13-57.1,23.7c8.1,18.1,4.7,40.1-10.2,55c-9.6,9.6-22.3,14.4-34.9,14.4c-6.9,0-13.7-1.4-20.1-4.3
	C77,170.3,68.9,189.5,64,210c18.5,7.1,31.7,25,31.7,46.1c0,21-13.1,38.9-31.6,46.1c4.9,20.5,13,39.7,23.7,57.1
	c6.4-2.8,13.2-4.2,20-4.2c12.6,0,25.2,4.8,34.9,14.4c14.8,14.8,18.2,36.8,10.2,54.9c17.4,10.7,36.7,18.8,57.1,23.7
	c7.1-18.5,25-31.6,46-31.6c21,0,38.9,13.1,46,31.6c20.5-4.9,39.7-13,57.1-23.7c-8-18.1-4.6-40,10.2-54.9
	c9.6-9.6,22.2-14.4,34.9-14.4c6.8,0,13.7,1.4,20,4.2c10.7-17.4,18.8-36.7,23.7-57.1C429.5,295,416.3,277.1,416.3,256z M256.9,335.9
	c-44.3,0-80-35.9-80-80c0-44.1,35.7-80,80-80s80,35.9,80,80C336.9,300,301.2,335.9,256.9,335.9z"></path>
            </svg>
          </NIcon>
        </div>
      </template>
      <div style="padding:5px;box-sizing: border-box;">
        <NLayout>
          <NSpace vertical>
            <NLayout has-sider>
              <NLayoutSider width="80">
                字体大小：
              </NLayoutSider>
              <NLayoutContent>
                <NSlider style="width: 100px;" :max="50" :min="10" v-model:value="fontSize" :step="2" />
              </NLayoutContent>
            </NLayout>
            <NLayout has-sider>
              <NLayoutSider width="80">
                隐藏单词：
              </NLayoutSider>
              <NLayoutContent>
                <NSwitch v-model:value="hideWord" />
              </NLayoutContent>
            </NLayout>
            <NLayout has-sider>
              <NLayoutSider width="80">
                隐藏汉语：
              </NLayoutSider>
              <NLayoutContent>
                <NSwitch v-model:value="hidenCh" />
              </NLayoutContent>
            </NLayout>
          </NSpace>
        </NLayout>
      </div>
    </NPopover>

    <div class="input" style="display: flex">
      <NInput clearable type="text" v-model:value="preWord" placeholder="请输入单词头" />
      <NButton type="primary" @click="getWord">请求</NButton>
    </div>
    <h1>{{ _preWord.toUpperCase() }}
    </h1>
    <ul class="list">
      <li v-for="(item, index) in state.wordData" :key="index">
        <span>{{ index + 1 }}. </span>
        <span :class="{ hidden: hideWord }">{{ getEnCh(item.value)[0] }}</span>
        <NPopover>
          <template #trigger>
            <span class="list-nature">{{ getWordNature(item.value) }}. </span>
          </template>
          <div>
            {{ state.category[getWordNature(item.value)] }}
          </div>
        </NPopover>
        <span :class="{ hidden: hidenCh }">{{ getEnCh(item.value)[1] }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { NSpace, NSwitch, NButton, NInput, NIcon, NPopover, NSlider, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'
/* __placeholder__ */
import type { Item } from "~/types";
let hideWord = ref<boolean>(false)
let hidenCh = ref<boolean>(false)
let fontSize = ref<number>(16)
let fontSizeStyle = computed(() => {
  return fontSize.value + 'px'
})
// const counter = useState('counter', () => Math.round(Math.random() * 1000))
interface State {
  wordData: Item[],
  category: CategoryWord
}
interface CategoryWord {
  [keyname: string]: string,
}
let state = reactive<State>({
  wordData: [],
  category:
  {
    n: '名词 [Nouns(n.)]：用来表示人或事物名称的词',
    v: '动词 [Verb(v.)]：表示动作或状态的词',
    ad: '副词 [Adverb(adv.)]：用来修饰动词 形容词 副词 在句子中做定语 状语等',
    a: '形容词 [Adjective(adj.)]：表示事物或人特征的词',
    num: '数词 [Numeral(num.)]：表示人或事物数目多少(基数词)或顺序先后(序数词)在句中做宾语 定语等 ',
    pron: '代词 [Pronouns(pron.)]：用来代替名词的词',
    art: '冠词[Articles(art.)]：用在名词前，帮助说明名词所指范围的词',
    prep: '介词 [Prepositions(prep.)]：用在名词和代词之前，说明其与别的词的关系 其后跟宾语，一起在句子中做定语或状语',
    conj: '连词[Conjunctions(conj.)]：起连接作用的词',
    int: '感叹词[Interjections(int.)]：表示感叹语气的词 表示喜怒哀乐，在句中起到加强语气的作用',
    vt: '及物动词[transitive verb(vt.)]后面可以直接带宾语的动词。',
    vi: '不及物动词[intransitive verb(vi.)]后面不能带宾语。',
  }
})
let preWord = ref('a')
let _preWord = ref('')
async function getWord() {
  _preWord.value = preWord.value
  const wordData = await $fetch('/api/hello', {
    method: 'GET',
    params: { wordPer: preWord.value.toLocaleLowerCase() },
  })
  state.wordData = wordData
}
useHead({
  title: '不背单词',
  meta: [
    { name: 'description', content: '我的神奇网站。' }
  ],
  bodyAttrs: {
    class: 'test'
  },
})
getWord()
// useSeoMeta({
//   title: '我的神奇网站',
//   ogTitle: '我的神奇网站',
//   description: '这是我的神奇网站，让我来告诉你关于它的一切。',
//   ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
//   ogImage: 'https://example.com/image.png',
//   twitterCard: 'summary_large_image',
// })
// useHead({
//   script: [
//     {
//       src: 'https://third-party-script.com',
//       // 有效选项为：'head' | 'bodyClose' | 'bodyOpen'
//       tagPosition: 'bodyClose'
//     }
//   ]
// })
// let color = ref('red')
</script>
<style lang="scss" scoped>
.box {
  padding-top: 40px;
  margin: auto;
  width: 60%;
  height: 100vh;
  color: #569cd6;
  background-color: #181818;
  position: relative;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    width: 100%;
  }


  .hidden {
    color: #181818;

    &:hover {
      color: #569cd6;
    }
  }

  .list {
    font-size: v-bind(fontSizeStyle);
    height: calc(100vh - 40px);
    overflow: auto;
    padding-bottom: 50vh;
    box-sizing: border-box;

    .list-nature:hover {
      color: #f5ff00;
    }

    &::-webkit-scrollbar {
      display: none;
      /* Chrome, Safari, and Opera */
    }

    span {
      cursor: pointer;
    }
  }


  .input {
    position: absolute;
    width: 100%;
    top: 0;
  }

  // background-color: $primary;
  .setting {
    position: fixed;
    right: 10px;
    bottom: 10px;
    transition: .3s all;
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    &:hover {
      transform: rotate(180deg)
    }
  }
}
</style>