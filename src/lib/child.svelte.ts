// Balance each child gets
const INITIAL_BALANCE = 300;

export class Child {
    name: string;
    balance = $state(300);

    constructor(name: string) {
        this.name = name;
        this.balance = INITIAL_BALANCE;
    }

    /// Is the child elligible for bonus?
    get receivesBonus(): boolean {
        return this.balance > 50;
    }

    /// Deduct certain amount from balance
    deductAllowance(amount: number): { success: boolean; message: string } {

        if (isNaN(amount) || amount <= 0) {
            // Input to deduct is invalid (NaN) or 0 or negative
            return { success: false, message: "Please enter a valid amount greater than $0." };
        }

        if (amount > this.balance) {
            // overspend prevention
            return {
                success: false,
                message: `Transaction declined: Exceeds remaining balance ($${this.balance.toFixed(2)}).`
            };
        }

        this.balance -= amount;
        return { success: true, message: "Expense recorded successfully!" };

    }
}
