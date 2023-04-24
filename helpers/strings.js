import initials from 'initials'
import isDarkColor from 'is-dark-color'
import stc from 'string-to-color'

export const isDarkColour = (string) => isDarkColor(string)

export const percentageColour = (percentage) => {
  if (!percentage) {
    return 'grey'
  }
  switch (true) {
    case percentage < 25:
      return 'error'
    case percentage >= 25 && percentage < 50:
      return 'warning'
    case percentage >= 50 && percentage < 75:
      return 'info'
    default:
      return 'success'
  }
}

export const stringToColour = (string) => stc(string)

export const stringToInitials = (string) => initials(string)

export const stringToInitialsLimitTwo = (string) => {
  let _initials$shift, _initials$pop

  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
  let initials = [...string.matchAll(rgx)] || []
  return (
    (((_initials$shift = initials.shift()) === null || _initials$shift === void 0 ? void 0 : _initials$shift[1]) ||
      '') + (((_initials$pop = initials.pop()) === null || _initials$pop === void 0 ? void 0 : _initials$pop[1]) || '')
  ).toUpperCase()
}
