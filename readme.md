# string unique

> missing string methods

```ts
// import { StringUnique } from './string-unique'
import Unique from './string-unique'

const script = new Unique([
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  'Mauris id malesuada eros.',
  'Morbi aliquam, elit volutpat commodo rutrum, nulla magna ornare felis, quis pulvinar mi elit vitae justo.',
  'Duis in ex sed orci cursus iaculis.',
  'Nullam ut libero venenatis, dapibus quam a, bibendum felis.',
  'Nunc convallis nisi porttitor, placerat ex sit amet, volutpat velit.',
  'Vestibulum laoreet velit bibendum efficitur pretium.',
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
])

script.add('Aliquam erat volutpat.')
script.add("javascript:alert('Another XSS Attack')")
script.add(`<img src=x onerror="alert('XSS Attack')">`)

const additional = script.merge([
  'Aliquam erat volutpat.',
  'Vestibulum placerat nibh in metus imperdiet eleifend.',
  'Donec porta ex metus, vel sodales purus molestie et.',
  'Mauris nec scelerisque ipsum, id auctor dui.',
  'Nunc vestibulum metus sit amet lectus lobortis tempus.',
])

additional.each((t, i) => console.log(t, i))

const a = ['ts', 'python', 'go']
const b = ['ts', 'go']
const d = ['java', 'c++']

const fe = new StringUnique<string>(a)

const merge = fe.merge(a)
const both = fe.both(b)
const diff = fe.diff(b)
const same = fe.same(b)
const inc = fe.includes(b)
const dis = fe.disjoint(d)

const c = fe.contain(b)
const e = fe.equal(a)
const h = fe.has('ts')

console.log('values', fe.values)
console.log('original size', fe.size)

console.log('-----------')

fe.add('js')
console.log('new values', fe.values)
console.log('new size', fe.size)

console.log('-----------')

console.log('contain', c)
console.log('equal', e)
console.log('has', h)

console.log('-----------')

console.log('merge', merge)
console.log('both', both)
console.log('diff', diff)
console.log('same', same)
console.log('includes', inc)
console.log('disjoint', dis)

console.log('-----------')

console.group('*** loop ***')
console.table(fe.each((v, i, s) => ({ v, i, s })))
console.groupEnd()

console.log('-----------')

fe.delete('js')
console.log('deleted values: (js)', fe.values)
console.log('deleted size: (js)', fe.size)

console.log('-----------')

fe.clear()
console.log('cleared size', fe.size)
```
