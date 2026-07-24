class Child {
    name: string;
    balance: number;

    constructor(name: string, initialBalance: number = 300) {
        this.name = name;
        this.balance = initialBalance;
    }

    // Derived property: automatically checks if balance > 50
    get receivesBonus(): boolean {
        return this.balance > 50;
    }
}
