# Resources
* https://github.com/meltingice/CamanJS/blob/2b9da78b59edeb3a225049b50080fef8b2ac7977/src/lib/filters.coffee
* http://www.html5rocks.com/en/tutorials/canvas/imagefilters/

# Todo
* tint filter
* noise filter
* blur filter
* saturation filter
* add adjust level to sepia
* add unit tests

# Noise:
```
const adjust = Math.abs(adjust) * 2.55;
const rand = Calculate.randomRange adjust * -1, adjust;

data[i] += rand;
data[i + 1] += rand;
data[i + 2] += rand;
```

# Saturation:
```
adjust *= -0.01
max = Math.max data[i], data[i + 1], data[i + 2]

data[i] += (data[i] !== max) ? (max - data[i]) * adjust : data[i];
data[i + 1] += (data[i + 1] !== max) ? (max - data[i + 1]) * adjust : data[i + 1];
data[i + 2] += (data[i + 2] !== max) ? (max - data[i + 2]) * adjust : data[i + 2];
```
