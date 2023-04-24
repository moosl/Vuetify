import { articleTypesEnum } from '/data/enums.js'

import { dateRandom } from '/helpers/dates.js'
import { numberIsOdd } from '/helpers/numbers.js'
import { isDarkColour, stringToColour, stringToInitials, stringToInitialsLimitTwo } from '/helpers/strings.js'

import { faker } from '@faker-js/faker'

const FIRST_NAME = faker.name.firstName()
const LAST_NAME = faker.name.lastName()

const LOGGED_IN_USER = {
  avatarURL: faker.image.avatar(),
  firstName: FIRST_NAME,
  fullName: `${FIRST_NAME} ${LAST_NAME}`,
  lastName: LAST_NAME,
  role: faker.name.jobTitle()
}

const SKILL_LEVELS = [
  {
    description: 'Can perform a basic level of this skill including this and that.',
    label: 'Entry',
    level: 1
  },
  {
    description: 'Can perform a standard level of this skill including that and this.',
    label: 'Standard',
    level: 2
  },
  {
    description: 'Can perform an advanced level of this skill including bits and bobs and even bats.',
    label: 'Advanced',
    level: 3
  },
  {
    description: 'Can perform an expert level of this skill including bobs, bits, bats and not forgetting bets.',
    label: 'Expert',
    level: 4
  }
]

export const articles = (generate = 9) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    let summaryPreText = null

    const countArticleTypes = Object.keys(articleTypesEnum).length
    const indexArticleType = g > countArticleTypes ? g - countArticleTypes : g

    switch (indexArticleType) {
      case articleTypesEnum.BLOG:
        summaryPreText =
          'This is a <b>blog post,</b> the focus is on the content, not the social element where the publisher is highlighted.'
        break
      case articleTypesEnum.EVENT:
        summaryPreText = "This is an <b>event post</b>, the event details aren't replicated here."
        break
      case articleTypesEnum.POLL:
        summaryPreText = "This is a <b>poll post</b>, the poll details aren't replicated here."
        break
      case articleTypesEnum.SOCIAL:
        summaryPreText = 'This is a <b>social post</b>, the focus is on the author.'
        break
      case articleTypesEnum.SURVEY:
        summaryPreText = "This is a <b>survey post</b>, the survey details aren't replicated here."
        break
      case articleTypesEnum.TASK:
        summaryPreText = 'This is a <b>task post</b>.'
        break
      case articleTypesEnum.USER:
        summaryPreText = "This is a <b>user post</b>, it doesn't contain a title. It can contain a main image."
        break
      default:
        summaryPreText = ''
        break
    }

    const imageHeight = faker.datatype.number({ min: 8 * 32, max: 8 * 64 })
    const publishedDate = faker.date.recent(generate)

    elems.push({
      allowComments:
        indexArticleType === articleTypesEnum.BLOG || indexArticleType === articleTypesEnum.SOCIAL
          ? true
          : faker.datatype.boolean(),
      allowLikes: indexArticleType === articleTypesEnum.SOCIAL ? true : faker.datatype.boolean(),
      articleTypeId: indexArticleType,
      awardAwardedBy:
        indexArticleType === articleTypesEnum.AWARD ? faker.fake('{{name.firstName}} {{name.lastName}}') : null,
      awardAwardedOn: indexArticleType === articleTypesEnum.AWARD ? faker.date.recent(generate) : null,
      awardPersonAvatarURL: indexArticleType === articleTypesEnum.AWARD ? faker.image.avatar() : null,
      awardPersonName:
        indexArticleType === articleTypesEnum.AWARD ? faker.fake('{{name.firstName}} {{name.lastName}}') : null,
      awardPictureURL:
        indexArticleType === articleTypesEnum.AWARD ? 'https://img.icons8.com/color/2x/knowledge-transfer.png' : null,
      awardTitle: indexArticleType === articleTypesEnum.AWARD ? `${faker.lorem.words(3)} award` : null,
      createdByAvatarURL: faker.image.avatar(),
      createdByName: faker.fake('{{name.firstName}} {{name.lastName}}'),
      createdByRole: faker.name.jobTitle(),
      eventAttendeesCount:
        indexArticleType === articleTypesEnum.EVENT ? faker.datatype.number({ min: 4, max: 12 }) : null,
      eventLocation:
        indexArticleType === articleTypesEnum.EVENT
          ? `${faker.address.streetAddress()}, ${faker.address.city()}`
          : null,
      eventTitle:
        indexArticleType === articleTypesEnum.EVENT
          ? faker.lorem.sentence(faker.datatype.number({ min: 4, max: 12 }))
          : null,
      eventDateTime: indexArticleType === articleTypesEnum.EVENT ? faker.date.future() : null,
      eventEndDateTime: null,
      id: g,
      lastReactionPersonName: faker.fake('{{name.firstName}} {{name.lastName}}'),
      lastReactionReactionDate: faker.date.between(publishedDate, new Date()),
      lastReactionType: faker.random.arrayElement(['commented', 'liked this']),
      mainImageId:
        indexArticleType !== articleTypesEnum.AWARD && (numberIsOdd(g) || indexArticleType === articleTypesEnum.USER)
          ? faker.image.imageUrl(800, imageHeight, 'animals', true, true)
          : null,
      numberOfAttachments:
        indexArticleType !== articleTypesEnum.AWARD && indexArticleType !== articleTypesEnum.USER && !numberIsOdd(g)
          ? faker.datatype.number({ min: 0, max: 4 })
          : null,
      numberOfComments: faker.datatype.number({ min: 0, max: 6 }),
      numberOfLikes: faker.datatype.number({ min: 0, max: 18 }),
      pollOptions: [],
      pollPeople: [],
      pollType: indexArticleType === articleTypesEnum.POLL ? faker.random.arrayElement([1, 2]) : null,
      priorityId:
        indexArticleType !== articleTypesEnum.AWARD && numberIsOdd(g)
          ? faker.datatype.number({ min: 0, max: 4 })
          : null,
      published: true,
      publishedDate: publishedDate,
      summary: summaryPreText ? `${summaryPreText} ${faker.lorem.sentences(2)}` : faker.lorem.sentences(3),
      surveyId: null,
      tag: faker.lorem.slug(2),
      title: faker.lorem.sentence(faker.datatype.number({ min: 4, max: 12 }))
    })
  }

  return elems && elems.length
    ? elems.sort((a, z) => new Date(z.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    : []
}

export const feedback = (generate = 3) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    const createdByFirstName = faker.name.firstName()
    const createdByLastName = faker.name.lastName()

    elems.push({
      id: faker.datatype.uuid(),
      createdBy: {
        id: faker.datatype.uuid(),
        fullName: `${createdByFirstName} ${createdByLastName}`,
        avatarURL: faker.image.avatar(),
        role: faker.name.jobTitle(),
        knownAs: createdByFirstName
      },
      personFor: {
        id: faker.datatype.uuid(),
        fullName: LOGGED_IN_USER.fullName,
        avatarURL: LOGGED_IN_USER.avatarURL,
        role: LOGGED_IN_USER.role,
        knownAs: LOGGED_IN_USER.firstName
      },
      createdOn: faker.date.recent(generate),
      feedback: faker.lorem.sentences(2),
      type: 2,
      rating: null,
      performanceCategoryId: null,
      values: []
    })
  }

  return elems && elems.length
    ? elems.sort((a, z) => new Date(z.createdOn).getTime() - new Date(a.createdOn).getTime())
    : []
}

export const loggedInUser = () => {
  return LOGGED_IN_USER
}

export const personSkills = (generate = 10) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    const name = `${faker.company.catchPhraseNoun()} ${faker.company.catchPhraseNoun()}`
    const colour = stringToColour(name)
    const level = faker.datatype.number({ min: 1, max: 4 })
    const relevantSkillLevel = SKILL_LEVELS.find((item) => item.level === level)

    elems.push({
      avatarColour: colour,
      avatarURL: stringToInitialsLimitTwo(name),
      darkText: !isDarkColour(colour),
      id: faker.datatype.uuid(),
      skillLevel: {
        description: relevantSkillLevel ? relevantSkillLevel.description : null,
        label: relevantSkillLevel ? relevantSkillLevel.label : 'none',
        level: level
      },
      name: name,
      personId: faker.datatype.uuid()
    })
  }

  return elems && elems.length ? elems.sort((a, z) => a.name.localeCompare(z.name)) : []
}

export const skillLevels = SKILL_LEVELS

export const skillsPeople = (generate = 10) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    const name = `${faker.company.catchPhraseNoun()} ${faker.company.catchPhraseNoun()}`
    const numberOfPeople = faker.datatype.number({ min: 1, max: 20 })
    const people = []

    for (let p = 1; p <= numberOfPeople; p++) {
      const createdByFirstName = faker.name.firstName()
      const createdByLastName = faker.name.lastName()
      const fullName = `${createdByFirstName} ${createdByLastName}`
      const colour = stringToColour(fullName)
      const id = faker.datatype.uuid()
      people.push({
        avatarURL: faker.datatype.boolean() ? `https://i.pravatar.cc/96?u=${id}` : null,
        fullName: fullName,
        id: id,
        initials: {
          colour: colour,
          darkText: !isDarkColour(colour),
          value: stringToInitials(fullName)
        },
        knownAs: createdByFirstName,
        role: faker.name.jobTitle(),
        skillLevel: faker.datatype.number({ min: 1, max: 4 })
      })
    }

    const colour = stringToColour(name)

    elems.push({
      avatarColour: colour,
      avatarURL: stringToInitialsLimitTwo(name),
      darkText: !isDarkColour(colour),
      id: faker.datatype.uuid(),
      level: faker.datatype.number({ min: 1, max: 4 }),
      name: name,
      people: people
    })
  }

  return elems && elems.length ? elems.sort((a, z) => a.name.localeCompare(z.name)) : []
}

export const objectives = (generate = 3) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    const createdOn = faker.date.recent(generate * 6)
    const endDate = faker.date.soon(generate * 3)

    elems.push({
      createdOn: createdOn,
      currentProgressPercentage: faker.datatype.number({ min: 0, max: 100 }),
      endDate: endDate,
      id: g,
      lastProgressUpdateDate: faker.date.between(createdOn, endDate),
      personAvatarURL: LOGGED_IN_USER.avatarURL,
      personFullName: LOGGED_IN_USER.fullName,
      personRole: LOGGED_IN_USER.role,
      title: faker.lorem.sentence()
    })
  }

  return elems && elems.length
    ? elems.sort((a, z) => new Date(a.endDate).getTime() - new Date(z.endDate).getTime())
    : []
}

export const people = (generate = 150) => {
  const elems = []

  for (let g = 1; g <= generate; g++) {
    const fullName = faker.fake('{{name.firstName}} {{name.lastName}}')
    const colour = stringToColour(fullName)

    let managerId = faker.datatype.number({ min: 1, max: generate })

    if (managerId === g) {
      managerId = managerId > 2 ? managerId - 1 : 1
    }

    elems.push({
      avatar: stringToInitials(fullName),
      colour: colour,
      dark: isDarkColour(colour),
      dateOfBirth: dateRandom(),
      department: faker.name.jobArea(),
      description: faker.lorem.sentence(),
      fullName: fullName,
      id: g,
      managerId: managerId,
      role: faker.name.jobTitle(),
      startDate: dateRandom('2010-01-01', '2020-12-31'),
      tag: faker.helpers.slugify(fullName).toLocaleLowerCase()
    })
  }

  return elems && elems.length ? elems.sort((a, z) => a.fullName.localeCompare(z.fullName)) : []
}
