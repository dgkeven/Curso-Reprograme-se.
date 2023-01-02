let total_par = 0;
let total_impar = 0;
let count = 1;
while (count <= 20) {
  let quad = count * count;
  console.log(quad);
  if (quad % 2 == 0) {
    total_par += quad;
  } else {
    total_impar += quad;
  }
  count += 1;
}

console.log(`A soma de quadrados pares: ${total_par}`);
console.log(`A soma de quadrados ímpares: ${total_impar}`);