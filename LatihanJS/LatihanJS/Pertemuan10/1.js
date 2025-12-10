function sapa(nama){
  console.log("Woi, " + nama + "!");
}

sapa("Rawi");

function hitungDiskon(harga){
  return harga*0.1;
}

let potongan = hitungDiskon(100000);
console.log("Potongan "+potongan)