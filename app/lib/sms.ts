function normalizeIndianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const localNumber = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(localNumber) ? `91${localNumber}` : null;
}

export async function sendPaymentConfirmationSms(phone: string, orderId: string) {
  const recipient = normalizeIndianPhone(phone);
  const apiUrl = process.env.SMS_API_URL;
  const apiKey = process.env.SMS_API_KEY;

  if (!recipient || !apiUrl || !apiKey || !process.env.SMS_SENDER_ID || !process.env.SMS_TEMPLATE_ID) {
    return { sent: false, configured: false };
  }

  const message = `Payment successful! Your order #${orderId} at Piyush's Bakery has been confirmed and is now being prepared. Thank you!`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      to: recipient,
      senderId: process.env.SMS_SENDER_ID,
      templateId: process.env.SMS_TEMPLATE_ID,
      message,
    }),
  });

  return { sent: response.ok, configured: true };
}
