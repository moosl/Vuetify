import { randomDate } from '../helpers/dates.js'

import { faker } from '@faker-js/faker'
import initials from 'initials'
import isDarkColor from 'is-dark-color'
import stc from 'string-to-color'

export const people = (generate = 150) => {
  const elems = []

  for (let i = 1; i <= generate; i++) {
    const fullName = faker.fake('{{name.firstName}} {{name.lastName}}')
    const colour = stc(fullName)

    elems.push({
      avatar: initials(fullName),
      colour: colour,
      dark: isDarkColor(colour),
      dateOfBirth: randomDate(),
      department: faker.name.jobArea(),
      description: faker.lorem.sentence(),
      fullName: fullName,
      id: i,
      role: faker.name.jobTitle(),
      startDate: randomDate('2010-01-01', '2020-12-31'),
      tag: faker.helpers.slugify(fullName).toLocaleLowerCase()
    })
  }

  return elems && elems.length ? elems.sort((a, z) => a.fullName.localeCompare(z.fullName)) : []
}
