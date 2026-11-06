/**
 * Pure calculation logic for the Business Impact Calculator.
 * Decoupled from UI components for testability.
 */

export function calculateImpact({ sqft = 10000, employees = 50, meetingRooms = 4, automationLevel = 'balanced' }) {
  const parseNum = (val, fallback, min) => {
    const num = Number(val);
    if (isNaN(num)) return fallback;
    return Math.max(min, num);
  };

  const safeSqft = parseNum(sqft, 10000, 500);
  const safeEmployees = parseNum(employees, 50, 1);
  const safeRooms = parseNum(meetingRooms, 4, 1);

  // Multipliers based on automation tier
  const levelMultipliers = {
    essential: { energyRate: 0.22, prodHoursSavedPerYear: 35, acousticScore: '+24%', label: 'Essential Smart Integration' },
    balanced: { energyRate: 0.36, prodHoursSavedPerYear: 65, acousticScore: '+38%', label: 'Executive Acoustic & Automation Suite' },
    autonomous: { energyRate: 0.48, prodHoursSavedPerYear: 95, acousticScore: '+52%', label: 'Full Enterprise Spatial Intelligence' },
  };

  const tier = levelMultipliers[automationLevel] || levelMultipliers.balanced;

  // Commercial utility average: ~$2.40 / sq ft / year
  const baselineEnergyCost = safeSqft * 2.40;
  const energySavingsDollars = Math.round(baselineEnergyCost * tier.energyRate);

  // Space recovery & meeting room utilization savings
  const roomOptimizationValue = Math.round(safeRooms * 4200 * (tier.energyRate * 1.5));

  // Employee cognitive focus / less noise distraction value (conservatively estimated at $35/hr value)
  const productivityGainsDollars = Math.round(safeEmployees * tier.prodHoursSavedPerYear * 35);

  const totalEstimatedAnnualSavings = energySavingsDollars + roomOptimizationValue + productivityGainsDollars;

  return {
    safeSqft,
    safeEmployees,
    safeRooms,
    automationLevel,
    tierName: tier.label,
    energySavingsDollars,
    energyReductionPercent: Math.round(tier.energyRate * 100),
    roomOptimizationValue,
    productivityGainsDollars,
    totalEstimatedAnnualSavings,
    acousticPrivacyGain: tier.acousticScore,
    recommendedPackage: tier.label,
  };
}
