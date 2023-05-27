const highestLuckBoost = (luckBoost) => {
  return luckBoost.sort((a, b) => b - a)[0];
};

export default highestLuckBoost;
