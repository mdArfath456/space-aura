import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateImpact } from './calculatorLogic.js';
import { buildWhatsAppUrl } from '../services/whatsappService.js';

test('calculateImpact computes expected savings and metrics for balanced tier', () => {
  const result = calculateImpact({
    sqft: 10000,
    employees: 50,
    meetingRooms: 4,
    automationLevel: 'balanced',
  });

  assert.equal(result.energyReductionPercent, 36);
  assert.equal(result.safeSqft, 10000);
  assert.equal(result.safeEmployees, 50);
  assert.equal(result.safeRooms, 4);
  assert.ok(result.totalEstimatedAnnualSavings > 50000);
  assert.ok(result.energySavingsDollars > 0);
  assert.ok(result.productivityGainsDollars > 0);
});

test('calculateImpact handles edge and fallback inputs without crashing', () => {
  const result = calculateImpact({
    sqft: -100,
    employees: 0,
    meetingRooms: 'invalid',
    automationLevel: 'unknown',
  });

  assert.equal(result.safeSqft, 500); // clamped minimum
  assert.equal(result.safeEmployees, 1);
  assert.equal(result.safeRooms, 4); // fallback default for invalid string
  assert.equal(result.automationLevel, 'unknown');
  assert.ok(result.totalEstimatedAnnualSavings > 0);
});

test('buildWhatsAppUrl cleans phone number and encodes special characters', () => {
  const phone = '+1 (555) 892-8721';
  const message = 'Hello AuraSpace Systems! We need details on "AuraPod Pro".';
  const url = buildWhatsAppUrl(phone, message);

  assert.ok(url.startsWith('https://wa.me/15558928721?text='));
  assert.ok(url.includes('Hello%20AuraSpace%20Systems'));
  assert.ok(!url.includes('+'));
  assert.ok(!url.includes('('));
});
