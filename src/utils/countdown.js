const calculateRemainingTime = (targetTime) => {
    const now = new Date().getTime();
    const distance = targetTime - now;

    const total = distance <= 0 ? 0 : distance;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { total, days, hours, minutes, seconds };
}

module.exports = {
    calculateRemainingTime,
};