import expect from 'expect'

const add = (a, b) => {
  if (typeof b !== 'number') {
    return a + a
  }

  return a + b
}

const square = a => a * a

describe('add', function() {
  it('should add two numbers', function() {
    const result = add(5, 10)
    expect(result).toBe(15)
  })

  it('should doouble a single number', function() {
    const result = add(10)
    expect(result).toBe(20)
  })
})

describe('square', function() {
  it('should square a number', function() {
    const result = square(8)
    expect(result).toBe(64)
  })
})
