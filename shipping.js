function normalizeCep(cep) {
  return String(cep || "").replace(/\D/g, "");
}

function calculateFreight(cep) {
  const digits = normalizeCep(cep);

  if (digits.length !== 8) {
    return 18;
  }

  if (["0", "1", "2", "3"].includes(digits[0])) {
    return 15;
  }

  if (["4", "5"].includes(digits[0])) {
    return 20;
  }

  if (["6", "7"].includes(digits[0])) {
    return 25;
  }

  return 30;
}

if (typeof window !== "undefined") {
  window.normalizeCep = normalizeCep;
  window.calculateFreight = calculateFreight;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    normalizeCep,
    calculateFreight
  };
}
