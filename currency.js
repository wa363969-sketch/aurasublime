/**
 * Currency and formatting utilities for Pakistani Rupee (PKR)
 */

export function formatPKR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs. 0';
  }
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
}

export function calculateDiscountPercent(originalPrice, salePrice) {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function generateOrderNumber() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `AS-${randomNum}`;
}

export function isValidPakistaniPhone(phone) {
  if (!phone) return false;
  // Cleans spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Matches: 03001234567, +923001234567, 923001234567, 03XXXXXXXXX
  const regex = /^(?:\+92|92|0)?3\d{9}$/;
  return regex.test(cleaned);
}

export function formatPakistaniPhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // normalize to 03XX-XXXXXXX
  if (cleaned.startsWith('923') && cleaned.length === 12) {
    return `0${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  }
  if (cleaned.startsWith('03') && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  }
  return phone;
}
