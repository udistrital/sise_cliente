export function formatSSSZDate(date) {
  const t = new Date(date)

  let formatOptions: any = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  let dateString = t.toLocaleDateString('es-CO', formatOptions);
  // => "02/17/2017, 11:32 PM"

  dateString = dateString.replace(',', '')
    .replace('PM', 'pm')
    .replace('AM', 'am');


  // extra
  const dateSplitted = dateString.split('/')
  const lastSplitted = dateSplitted[2].split(' ')
  const hour = `${lastSplitted[1]} ${lastSplitted[2]}`
  const splitted = [dateSplitted[0], dateSplitted[1], lastSplitted[0]]
  const reversed = splitted.reverse().join("-")
  let fullDate = `${reversed} ${hour}`

  fullDate = fullDate.split('. ').join("")
  fullDate = fullDate.split('.').join("")
  console.log('😔',fullDate.slice(0, fullDate.length - 2) +  fullDate.slice(fullDate.length - 1))
  let newStr = fullDate.slice(0, fullDate.length - 2) +  fullDate.slice(fullDate.length - 1)
  newStr = fullDate.replace("p m", "pm")

  console.log('🤔')
  console.log(newStr)

  return newStr
}

export function getMaxDate(arrDates) {
  return arrDates.reduce(function (valor1, valor2) { return new Date(valor1) > new Date(valor2) ? valor1 : valor2; });
}
