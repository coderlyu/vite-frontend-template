import md5 from 'js-md5'
interface TransformData {
  [prop: string]: string | number | Array<any> | Object | undefined | null
}
export default function objKeySort(data: TransformData): string {
  var newkey = Object.keys(data).sort()
  var newObj: TransformData = {}
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = data[newkey[i]]
  }
  let signature = 'au'
  for (var j = 0; j < newkey.length; j++) {
    signature += newObj[newkey[j]]
  }
  var date = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, '').replace(/\.[\d]{3}Z/, '')
  signature += date.substring(0, 10)
  signature += 'au'
  signature = md5(signature.toUpperCase())

  data.sign = signature

  return signature
}