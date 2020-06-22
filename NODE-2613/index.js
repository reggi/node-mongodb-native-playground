const assert = require('assert')
const BSON = require('bson')
const Int32 = BSON.Int32

// const doc = { int32: new Int32(10) }
// const a = BSON.EJSON.stringify(doc, { relaxed: false })
// assert.equal(a, '{"int32":{"$numberInt":"10"}}')
// const b = BSON.EJSON.stringify(doc)
// assert.equal(b, '{"int32":10}')

// const docTwo = BSON.EJSON.parse('{"$numberInt":"10"}')
// assert.equal(docTwo, 10)

// const docThree = { int32: new Int32("10") }
// const docThreeString = BSON.EJSON.stringify(doc, { relaxed: false })
// assert.equal(docThreeString, '{"int32":{"$numberInt":"10"}}')
// const docThreeStringRF = BSON.EJSON.stringify(docThree)
// assert.equal(docThreeStringRF, '{"int32":10}')

// const alpha = new Int32("10")
// const alphaString = BSON.EJSON.stringify(alpha, { relaxed: false })
// assert.equal(alphaString, '{"$numberInt":"10"}')
// const alphaStringRf = BSON.EJSON.stringify(alpha)
// assert.equal(alphaStringRf, '10')

// const beta = new Int32(10)
// const betaString = BSON.EJSON.stringify(beta, { relaxed: false })
// assert.equal(betaString, '{"$numberInt":"10"}')
// const betaStringRf = BSON.EJSON.stringify(new Int32(10))
// assert.equal(betaStringRf, '10')


// console.log(BSON.EJSON.parse(10, {relaxed: false}))
// console.log()


const relaxed = [
  { key: BSON.EJSON.parse(10) },
  { key: BSON.EJSON.parse('10') },
  { key: new Int32(10) },
  { key: new Int32("10") },
  { key: BSON.EJSON.parse(`{"$numberInt":"10"}`) }
]
console.log(relaxed)

const notRelaxed = [
  { key: BSON.EJSON.parse(10, { relaxed: false }) },
  { key: BSON.EJSON.parse('10', { relaxed: false }) },
  { key: BSON.EJSON.parse(`{"$numberInt":"10"}`, {relaxed: false}) }
]
console.log(notRelaxed)

const relaxedStringified = relaxed.map(v => BSON.EJSON.stringify(v))
console.log(relaxedStringified)
const notRelaxedStringified = notRelaxed.map(v => BSON.EJSON.stringify(v))
console.log(notRelaxedStringified)



// const docthree = BSON.EJSON.parse('{"$numberInt":"10"}')
// console.log(docTwo)

// const c = BSON.EJSON.stringify(docTwo, { relaxed: false })
// assert.equal(c, '{"$numberInt":"10"}')

// const d = BSON.EJSON.stringify(docTwo)
// assert.equal(d, '10')


// // const numberIntOne = `{"$numberInt":"1"}`

// // const a = EJSON.parse(numberIntOne)
// // console.log(a)

// // const b = EJSON.parse(numberIntOne, { relaxed: false })
// // console.log(b)


// // const c = BSON.EJSON.parse(numberIntOne)
// // console.log(c)

// // const d = BSON.EJSON.parse(numberIntOne, { relaxed: false })
// // console.log(d)

// // console.log("---- partition ----- ")

// // const aa = BSON.EJSON.parse(`{"$numberDouble":"1"}`, {relaxed: false})
// // console.log(aa)
// // const bb =  BSON.EJSON.stringify(aa)
// // console.log(bb)

// // const cc = BSON.EJSON.parse(`{"$numberInt":"1"}`, { relaxed: false })
// // const stringValue = JSON.stringify(BSON.EJSON.stringify(cc));
// // console.log(JSON.stringify({ stringValue }))
// // assert.equal(stringValue, '1');
// // assert.equal(JSON.stringify("1"), '"1"')

// // console.log(BSON.EJSON.stringify(cc))

// // BSON.EJSON.stringify(cc)

// // const dd =  BSON.EJSON.stringify(cc)
// // console.log(dd)

// // const ee = BSON.EJSON.parse(`{"$numberLong":"1"}`, {relaxed: false})
// // console.log(ee)
// // const ff =  BSON.EJSON.stringify(ff)
// // console.log(ff)
