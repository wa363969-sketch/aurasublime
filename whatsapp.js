import { BRAND } from '../config/constants';
import { formatPKR } from './currency';

/**
 * WhatsApp Business integration helpers
 */

export function getCleanWhatsAppNumber(number) {
  const raw = number || BRAND.whatsappNumber;
  return raw.replace(/[^0-9]/g, '');
}

export function createWhatsAppUrl(message, customPhone = null) {
  const phone = getCleanWhatsAppNumber(customPhone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encodedText}`;
}

export function generateProductInquiry(product, selectedSize = '100ml') {
  const sizeObj = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const price = sizeObj ? sizeObj.price : product.price;

  return `Hello AURA SUBLIME Concierge,\n\nI am interested in learning more about:\n*${product.name}*\n• Size: ${selectedSize}\n• Price: ${formatPKR(price)}\n• Collection: ${product.collection.toUpperCase()}\n\nCould you please share details on availability, batch longevity, and expedited delivery? Thank you!`;
}

export function generateCartInquiry(cartItems, total) {
  const itemList = cartItems
    .map((item, idx) => `${idx + 1}. ${item.name} (${item.selectedSize}) x ${item.quantity} - ${formatPKR(item.price * item.quantity)}`)
    .join('\n');

  return `Hello AURA SUBLIME Concierge,\n\nI have selected the following items in my shopping bag:\n\n${itemList}\n\n*Total Order Value:* ${formatPKR(total)}\n\nI would like assistance completing my order via WhatsApp.`;
}

export function generateOrderSupportMessage(orderNumber, customerName) {
  return `Hello AURA SUBLIME Concierge,\n\nI need assistance regarding my recent order:\n• Order Reference: *${orderNumber}*\n• Customer Name: ${customerName}\n\nCould you please update me on dispatch status and tracking details? Thank you!`;
}
