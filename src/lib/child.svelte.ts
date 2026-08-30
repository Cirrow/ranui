// Balance each child gets
const INITIAL_BALANCE = 300;
const BONUS_BOUNDARY = 50;


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
    // exclusive inequality that follows the prompt
    get receivesBonus(): boolean {
        return this.balance > BONUS_BOUNDARY;
    }

    /// Deduct certain amount from balance
    // returns an object with a boolean success indicator and a string error/success message.
    // Receive HTML string as user input, convert into number for numerical calculations
    deductAllowance(amountInput: string): { success: boolean; message: string } {
        //remove surrounding whitespace
        const trimmed = String(amountInput).trim();

        // Only allow digits, with an optional decimal point and up to 2 decimal places
        if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
            return { success: false, message: "Please enter a valid amount with up to 2 decimal places (e.g. 12.50)." };
        }

        const amount = Number(trimmed);
        //minimum input error catch
        if (amount < 0.01) {
            return { success: false, message: "Please enter a valid amount greater than $0." };
        }
        // catch for overspending errors
        // protects against negative balance
        if (amount > this.balance) {
            return {
                success: false,
                message: `Transaction declined: Exceeds remaining balance ($${this.balance.toFixed(2)}).`
            };
        }
        // deduct and return
        this.balance -= amount;
        return { success: true, message: "Expense recorded successfully!" };
    }
}
