import { expect } from '@playwright/test';

function uniqueEmail(prefix = 'trainee') {
  const rnd = Math.random().toString(36).slice(2, 8);
  return `${prefix}.${Date.now()}.${rnd}@example.com`;
}

module.exports={uniqueEmail};