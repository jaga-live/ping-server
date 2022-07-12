///////Generate random number between certain intervals
export function randomIntFromInterval(min = 100000, max = 999999): Number { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomSixDigitOtp(): Number { 
  return randomIntFromInterval(100000, 999999)
}


