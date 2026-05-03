// Simple rule-based NLP for extracting expenses
// e.g. "Spent 500 on pizza" -> amount: 500, category: Food

const extractExpense = (text) => {
  const result = { amount: null, category: 'Others', description: text };
  
  // Extract number (first match)
  const amountMatch = text.match(/\d+(\.\d{1,2})?/);
  if (amountMatch) {
    result.amount = parseFloat(amountMatch[0]);
  }

  // Basic keyword mapping
  const lowerText = text.toLowerCase();
  if (lowerText.includes('pizza') || lowerText.includes('food') || lowerText.includes('burger') || lowerText.includes('lunch') || lowerText.includes('dinner')) {
    result.category = 'Food';
  } else if (lowerText.includes('coffee') || lowerText.includes('cappuccino') || lowerText.includes('latte')) {
    result.category = 'Coffee';
  } else if (lowerText.includes('tea') || lowerText.includes('chai')) {
    result.category = 'Tea';
  } else if (lowerText.includes('cab') || lowerText.includes('uber') || lowerText.includes('ola') || lowerText.includes('taxi')) {
    result.category = 'Cab';
  } else if (lowerText.includes('travel') || lowerText.includes('trip') || lowerText.includes('train') || lowerText.includes('flight')) {
    result.category = 'Travel';
  } else if (lowerText.includes('shopping') || lowerText.includes('clothes') || lowerText.includes('amazon') || lowerText.includes('flipkart') || lowerText.includes('shoes')) {
    result.category = 'Shopping';
  } else if (lowerText.includes('rent') || lowerText.includes('apartment') || lowerText.includes('house')) {
    result.category = 'Rent';
  } else if (lowerText.includes('bill') || lowerText.includes('electricity') || lowerText.includes('water') || lowerText.includes('recharge')) {
    result.category = 'Bills';
  } else if (lowerText.includes('entertainment') || lowerText.includes('movie') || lowerText.includes('concert') || lowerText.includes('netflix') || lowerText.includes('game')) {
    result.category = 'Entertainment';
  } else if (lowerText.includes('medicine') || lowerText.includes('doctor') || lowerText.includes('hospital') || lowerText.includes('health')) {
    result.category = 'Health';
  }

  return result;
};

module.exports = { extractExpense };
