/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const FREE_SHIPPING_THRESHOLD = 50;
export const STANDARD_SHIPPING_COST = 6;

export function formatPrice(amount: number): string {
  if (Number.isInteger(amount)) {
    return `$${amount}`;
  }
  return `$${amount.toFixed(2)}`;
}
