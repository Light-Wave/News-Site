// A spot to add util functions that might be used in more than your current working file. Feel free to add as many functions as you want
// (doesn't matter if the function only gets used once)

export function isNumericString(value: string): value is `${number}` {
  return /^\d+$/.test(value);
}
