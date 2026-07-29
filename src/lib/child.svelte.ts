const INITIAL_BALANCE = 300;

export class Child {
    name: string;
    balance = $state(300);

    constructor(name: string) {
      this.name = name;
      this.balance = INITIAL_BALANCE;
    }

    get receivesBonus(): boolean {
      return this.balance > 50;
    }

    deductAllowance(amount: number): { success: boolean; message: string } {
      if (isNaN(amount) || amount <= 0) {
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
