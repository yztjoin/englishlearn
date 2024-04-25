import { readdirSync, readFileSync } from 'fs'
import { Item } from '~/types'
// import { useState } from 'nuxt/app'
let wordData = new Map();
function getWordData(wordPre: string = "all") {

  const files: string[] = readdirSync('./public/data')
  if (!wordData.has('all')) {
    let _wordDate = new Map()
    _wordDate.set('all', [])
    for (let name of files) {
      let info = JSON.parse(readFileSync('./public/data/' + name, 'utf8'))
      _wordDate.set(name.split('.')[0], info)
      _wordDate.set('all', _wordDate.get('all').concat(_wordDate.get(name.split('.')[0])))
    }
    wordData = _wordDate
    return _wordDate.get(!!wordPre ? wordPre : "all")
  } {
    return wordData.get(!!wordPre ? wordPre : "all")
  }

}
export default defineEventHandler((event): Item[] => {
  let { wordPer } = getQuery(event) as { wordPer: string }
  const wordData = getWordData(wordPer);
  return wordData
}) 