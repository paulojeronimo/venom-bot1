export function mlStr(strings, ...values) {
  let combinedString = strings.reduce((acc, str, i) => acc + values[i - 1] + str)
  let lines = combinedString.split('\n').map(line => line.trimStart())
  if (lines[0] === '') lines = lines.slice(1)
  return lines.join('\n')
}
