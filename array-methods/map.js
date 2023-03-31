const prices = [42.42, 10, 28.2234, 3.2, 5, 12];

const pricesObj = prices.map(price => ({
  price, salePrice: price / 2
}))
console.log('Sale Prices:')
console.log(pricesObj)

const formattedPrices = prices.map(price => '$' + price.toFixed(2))
console.log('Formatted Prices:')
console.log(formattedPrices)