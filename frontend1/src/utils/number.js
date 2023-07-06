export const zPad = (n, width, z) => {
  z = z || "0"
  n = n + ""
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

export const numberOrdinal = num => {
  const ords = ["th", "st", "nd", "rd"]
  const v = num % 100
  return ords[(v - 20) % 10] || ords[v] || ords[0]
}
