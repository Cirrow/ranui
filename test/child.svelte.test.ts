import { describe, it, expect } from 'vitest';
import { Child } from '../src/lib/child.svelte';

const ERR_INVALID_FORMATTING_MSG = 'Please enter a valid amount with up to 2 decimal places (e.g. 12.50).';
const ERR_REQUIRE_POSITIVE_MSG = 'Please enter a valid amount greater than $0.';
const SUCCESS_MSG = 'Expense recorded successfully!';
const OVERSPEND_MSG = (bal: number) =>
    `Transaction declined: Exceeds remaining balance ($${bal.toFixed(2)}).`;

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
            expect(child.deductAllowance('50')).toEqual({ success: true, message: SUCCESS_MSG });
            expect(child.balance).toBe(250);
        });

        it('deducts the exact remaining balance', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance('300').success).toBe(true);
            expect(child.balance).toBe(0);
        });

        it('deducts the smallest allowed amount', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance('0.01').success).toBe(true);
            expect(child.balance).toBeCloseTo(299.99);
        });

        it('supports sequential deductions', () => {
            const child = new Child('Tia');
            child.deductAllowance('10');
            expect(child.balance).toBe(290);
            child.deductAllowance('20');
            expect(child.balance).toBe(270);
        });

        it('handles floating point accumulation', () => {
            const child = new Child('Tia');
            child.deductAllowance('0.1');
            child.deductAllowance('0.2');
            expect(child.balance).toBeCloseTo(299.7);
        });
    });

    // Deduct invalid inputs.
    // Rejects negative numbers, zero, letters, empty strings, and amounts
    // with more than two decimal places (i.e. not a whole number of cents).
    describe('deductAllowance — invalid inputs', () => {
        it.each([
            ['-20', 'a negative number', ERR_INVALID_FORMATTING_MSG],
            ['0', 'zero', ERR_REQUIRE_POSITIVE_MSG],
            ['abc', 'letters ("abc" → NaN)', ERR_INVALID_FORMATTING_MSG],
            ['', 'an empty string (→ 0)', ERR_INVALID_FORMATTING_MSG],
            ['1.000000001', 'a fraction of a cent above whole dollars', ERR_INVALID_FORMATTING_MSG],
            ['0.000000001', 'a fraction of a cent below one cent', ERR_INVALID_FORMATTING_MSG],
            ['Infinity', 'the string "Infinity" (fails format)', ERR_INVALID_FORMATTING_MSG]
        ])('rejects %s (%s)', (input, label, expectedMsg) => {
            const child = new Child('Tia');
            const result = child.deductAllowance(input);
            expect(result.success).toBe(false);
            expect(result.message).toBe(expectedMsg);
            expect(child.balance).toBe(300);
        });
    });

    // Input coercion from a non-string value (e.g. a number from a number input) must be coerced safely instead of the old .trim() call throwing an error.
    // Surrounding whitespace is trimmed before validation
    describe('deductAllowance — input coercion', () => {
        //accept numeric values
        it('accepts a numeric value (coerced to string)', () => {
            const child = new Child('Tia');
            const result = child.deductAllowance(50 as unknown as string);
            expect(result.success).toBe(true);
            expect(child.balance).toBe(250);
        });

        // trim surrounding whitespace
        it('trims surrounding whitespace', () => {
            const child = new Child('Tia');
            expect(child.deductAllowance(' 50 ').success).toBe(true);
            expect(child.balance).toBe(250);
        });
    });

    // Prevent overspend
    // Any number over the balance is rejected, and when balance is zero any deduction is rejected.
    describe('deductAllowance — overspend protection', () => {
        it('rejects an amount just over the balance', () => {
            const child = new Child('Tia');
            const result = child.deductAllowance('300.01');
            expect(result.success).toBe(false);
            expect(result.message).toBe(OVERSPEND_MSG(300));
            expect(child.balance).toBe(300);
        });

        it('rejects any deduction once balance is zero', () => {
            const child = new Child('Tia');
            child.deductAllowance('300');
            const result = child.deductAllowance('1');
            expect(result.success).toBe(false);
            expect(result.message).toBe(OVERSPEND_MSG(0));
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
