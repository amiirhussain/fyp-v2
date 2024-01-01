export const calculateMatchingPercentage = (user1, user2) => {
  const weights = {
    gender: 15,
    bloodGroup: 10,
    cleanliness: 8,
    socialHabits: 7,
    workOrStudyHours: 15,
    foodPreferences: 9,
    hobbies: 6,
    personalityTraits: 8,
    sleepHabits: 15,
    petPreferences: 5,
    budget: 15,
  };

  let totalWeight = 0;
  let weightedSum = 0;

  for (const attribute in weights) {
    if (user1[attribute] !== undefined && user2[attribute] !== undefined) {
      const weight = weights[attribute];
      const user1Value = user1[attribute];
      const user2Value = user2[attribute];

      const attributeMatch =
        attribute === 'hobbies'
          ? calculateHobbiesMatch(user1Value, user2Value)
          : user1Value === user2Value
          ? 1
          : 0;

      totalWeight += weight;
      weightedSum += weight * attributeMatch;
    }
  }

  const matchingPercentage = (weightedSum / totalWeight) * 100;

  return matchingPercentage.toFixed(2);
};

export const calculateHobbiesMatch = (hobbies1, hobbies2) => {
  const commonHobbiesCount = hobbies1.filter((hobby) =>
    hobbies2.includes(hobby),
  ).length;
  const maxHobbiesCount = Math.max(hobbies1.length, hobbies2.length);

  return commonHobbiesCount / maxHobbiesCount;
};
