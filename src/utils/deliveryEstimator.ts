/**
 * Delivery ETA Estimator
 * Rules:
 * - Base time: 10-15 mins
 * - +1 min per 3 cart items
 * - +2-5 min random delay
 */

export const calculateDeliveryTime = (itemCount: number): number => {
  // Base time: random between 10-15 minutes
  const baseTime = Math.floor(Math.random() * 6) + 10;
  
  // Additional time based on items: +1 min per 3 items
  const itemTime = Math.floor(itemCount / 3);
  
  // Random delay: 2-5 minutes
  const randomDelay = Math.floor(Math.random() * 4) + 2;
  
  return baseTime + itemTime + randomDelay;
};

export const formatDeliveryTime = (minutes: number): string => {
  return `Delivery in ${minutes} mins`;
};

export const getDeliveryETA = (itemCount: number): string => {
  const minutes = calculateDeliveryTime(itemCount);
  return formatDeliveryTime(minutes);
};
