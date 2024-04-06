export const calculateNewRank = ({
  isBonusPoints,
  currentRank,
  opponentRank,
  win,
  draw,
}: {
  currentRank: number;
  opponentRank: number;
  win: boolean;
  isBonusPoints: boolean;
  draw?: boolean;
}) => {
  const bonusPoints = isBonusPoints ? 5 : 0;
  const difference = currentRank - opponentRank;

  if (draw) {
    if (difference < -200) {
      return currentRank + 10;
    }

    if (difference < -150) {
      return currentRank + 8;
    }

    if (difference < -100) {
      return currentRank + 5;
    }

    if (difference < -50) {
      return currentRank + 3;
    }

    if (difference < -25) {
      return currentRank + 2;
    }

    // Even with opponent
    if (difference <= 25) {
      return currentRank;
    }

    // Getting better than opponent
    if (difference < 50) {
      return currentRank - 2;
    }

    if (difference < 100) {
      return currentRank - 3;
    }

    if (difference < 150) {
      return currentRank - 5;
    }

    if (difference < 200) {
      return currentRank - 8;
    }

    if (difference >= 201) {
      return currentRank - 10;
    }
  }

  // Much worse than opponent
  if (difference < -200) {
    return win ? currentRank + (35 + bonusPoints) : currentRank - 2;
  }

  if (difference < -150) {
    return win ? currentRank + (28 + bonusPoints) : currentRank - 5;
  }

  if (difference < -100) {
    return win ? currentRank + (23 + bonusPoints) : currentRank - 7;
  }

  if (difference < -50) {
    return win ? currentRank + (20 + bonusPoints) : currentRank - 10;
  }

  if (difference < -25) {
    return win ? currentRank + (17 + bonusPoints) : currentRank - 13;
  }

  // Even with opponent
  if (difference <= 25) {
    return win ? currentRank + (15 + bonusPoints) : currentRank - 15;
  }

  // Getting better than opponent
  if (difference < 50) {
    return win ? currentRank + (13 + bonusPoints) : currentRank - 17;
  }

  if (difference < 100) {
    return win ? currentRank + (10 + bonusPoints) : currentRank - 20;
  }

  if (difference < 150) {
    return win ? currentRank + (7 + bonusPoints) : currentRank - 23;
  }

  if (difference < 200) {
    return win ? currentRank + (5 + bonusPoints) : currentRank - 28;
  }

  if (difference >= 201) {
    return win ? currentRank + (2 + bonusPoints) : currentRank - 35;
  }
};
