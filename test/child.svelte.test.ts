import { describe, it, expect } from 'vitest';
import { Child } from '../src/lib/child.svelte';

const ERR_REQUIRE_POSITIVE_MSG = 'Please enter a valid amount greater than $0.';
const SUCCESS_MSG = 'Expense recorded successfully!';

// Test initial construction of the child class with valid name and initial balance.
// Bonus must be elligible.
describe('Child', () => {
    describe('constructor', () => {
        it('sets name and initial balance', () => {
            const child = new Child('Nikau');
            expect(child.name).toBe('Nikau');
            expect(child.balance).toBe(300);
        });

        it('is bonus eligible at initial balance', () => {
            expect(new Child('Hana').receivesBonus).toBe(true);
        });
    });

    // Test for success when deducting a valid number from balance
    // Normal valid amount, exact remaining balance, smallest possible amount, sequential deductions at once,
    // and floating point accumulation
    describe('deductAllowance — valid amounts', () => {
        it('deducts a valid amount', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance(50)).toEqual({ success: true, message: SUCCESS_MSG });
            expect(child.balance).toBe(250);
        });

        it('deducts the exact remaining balance', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance(300).success).toBe(true);
            expect(child.balance).toBe(0);
        });

        it('deducts the smallest allowed amount', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance(0.01).success).toBe(true);
            expect(child.balance).toBeCloseTo(299.99);
        });

        it('supports sequential deductions', () => {
            const child = new Child('Tia');
            child.deductAllowance(10);
            expect(child.balance).toBe(290);
            child.deductAllowance(20);
            expect(child.balance).toBe(270);
        });

        it('handles floating point accumulation', () => {
            const child = new Child('Tia');
            child.deductAllowance(0.1);
            child.deductAllowance(0.2);
            expect(child.balance).toBeCloseTo(299.7);
        });
    });

    // Deduct invalid inputs.
    // It shoudl reject negative number, zero, JS Number(NaN), NaN directly, undefined, null, a NaN as number, and infinity.
    describe('deductAllowance — invalid inputs', () => {
        it.each([
            [-20, 'a negative number'],
            [0, 'zero'],
            [Number('abc'), 'letters ("abc" → NaN)'],
            [NaN, 'NaN directly'],
            [undefined, 'undefined (NaN)'],
            [null, 'null (→ 0)'],
            ['' as unknown as number, 'an empty string (→ 0)']
        ])('rejects %s (%s)', (input, label) => {
            const child = new Child('Tia');
            const result = child.deductAllowance(input as unknown as number);
            expect(result.success).toBe(false);
            expect(result.message).toBe(ERR_REQUIRE_POSITIVE_MSG);
            expect(child.balance).toBe(300);
        });

        it('rejects Infinity as exceeding the balance', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance(Infinity)).toEqual({
                success: false,
                message: 'Transaction declined: Exceeds remaining balance ($300.00).'
            });
            expect(child.balance).toBe(300);
        });
    });

    // Prevent overspend
    // Any number over the balance is rejected, and when balance is zero any deduction is rejected.
    describe('deductAllowance — overspend protection', () => {
        it('rejects an amount just over the balance', () => {
            const child = new Child('Tia');
            const result = child.deductAllowance(300.01);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Transaction declined: Exceeds remaining balance ($300.00).');
            expect(child.balance).toBe(300);
        });

        it('rejects any deduction once balance is zero', () => {
            const child = new Child('Tia');
            child.deductAllowance(300);
            const result = child.deductAllowance(1);
            expect(result.success).toBe(false);
            expect(result.message).toBe('Transaction declined: Exceeds remaining balance ($0.00).');
            expect(child.balance).toBe(0);
        });
    });

    // BOnus boundary
    // Exact value and 0 is rejected, while anything over the boundary is accepted.
    describe('receivesBonus — boundary', () => {
        it.each([
            [50, false],
            [50.01, true],
            [51, true],
            [0, false]
        ])('returns %s at balance %s', (balance, expected) => {
            const child = new Child('Tia');
            child.balance = balance;
            expect(child.receivesBonus).toBe(expected);
        });
    });
});
