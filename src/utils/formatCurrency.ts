export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

export const formatPrice = (amount: number): string => {
  return `₹${Math.floor(amount)}`;
};
