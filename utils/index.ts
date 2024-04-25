export function getWordNature(wordLine: string): string {
  const regex = /([a-zA-Z]+?)\./g;
  let match: RegExpExecArray | string[] = regex.exec(wordLine) || []
  return match.length > 0 ? match[1] : ''
}
export function getWordCh(wordLine: string): string {
  let strArr: string[] = wordLine.split('.')
  return strArr.length > 0 ? strArr[1] : ''
}
export function getEnCh(wordLine: string): string[] {
  let splitStr = getWordNature(wordLine)
  let arr = wordLine.split((splitStr + '.'))
  return arr.length > 0 ? arr : []
}