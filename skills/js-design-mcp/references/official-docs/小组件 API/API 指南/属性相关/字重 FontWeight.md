```TypeScript
type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type FontWeightString =
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold'
  | 'black'

type FontWeight = FontWeightNumerical | FontWeightString
```
