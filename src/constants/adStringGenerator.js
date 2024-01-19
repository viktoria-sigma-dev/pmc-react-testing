export const CHOICE_STATUS = {
  optOut: 0,
  notOptOut: 1,
  notExpressed: 2,
}

export const BINARY_CONFIG = {
  version: 6,
  timestamp: 32,
  globalIBAChoiceStatus: 4,
  participants: {
    arrayLength: 12,
    participantId: 12,
    choiceStatus: 4,
  },
  categories: {
    arrayLength: 12,
    categoryId: 12,
    categoryPreference: 4,
  }
};
