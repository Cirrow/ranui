// Balance each child gets
const INITIAL_BALANCE = 300;


export class Child {
    // Each child has a name and their balance
    name: string;
    balance = $state(300);

    // construct child class with name and initial balance
    constructor(name: string) {
        this.name = name;
        this.balance = INITIAL_BALANCE;
    }

    /// Is the child elligible for bonus?
    // returns boolean after inequality calculation
    get receivesBonus(): boolean {
        return this.balance > 50;
    }

    /// Deduct certain amount from balance
    // returns an object with a boolean success indicator and a string error/success message.
    // Receive HTML string, convert into number
    deductAllowance(amountInput: string): { success: boolean; message: string } {
        const amount = Number(amountInput);
        if (Number.isNaN(amount) || amount <= 0) {
            return { success: false, message: "Please enter a valid amount greater than $0." };
        }
        if (amount > this.balance) {
            return {
                success: false,
                message: `Transaction declined: Exceeds remaining balance ($${this.balance.toFixed(2)}).`
            };
        }
        this.balance -= amount;
        return { success: true, message: "Expense recorded successfully!" };
    }
}
