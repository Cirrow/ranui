<script lang="ts">
    import { Child } from '$lib/child.svelte';
    import * as Card from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Input } from '$lib/components/ui/input';
    import { Button } from '$lib/components/ui/button';

    // svelte props
    let { child }: { child: Child } = $props();

    // Initialise state variables
    let amountToSpend = $state<number | ''>('');
    let errorMessage = $state<string>('');
    let successMessage = $state<string>('');

    function handleSubmit() {
        // Initialise error message
        errorMessage = '';
        //HTML input String -> JS number
        const numAmount = Number(amountToSpend);

        const result = child.deductAllowance(numAmount);
        if (!result.success) {
            errorMessage = result.message;
        } else {
            // Could not deduct, feedback as error to user
            amountToSpend = '';
            successMessage = result.message
        }
    }
</script>

<!-- HTML to display information -->
<Card.Root class="w-full max-w-sm">
    <!-- Header to display heading -->
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-xl font-bold">{child.name}</Card.Title>

        <!-- Display bonus status as badge -->
        {#if child.receivesBonus}
            <Badge variant="default" class="bg-emerald-600">Bonus Eligible</Badge>
        {:else}
            <Badge variant="destructive">No Bonus</Badge>
        {/if}

    </Card.Header>

    <!-- content for the children card-->
    <Card.Content class="space-y-4 pt-4">
        <div>
            <p class="text-xs uppercase tracking-wider text-muted-foreground">Remaining Allowance</p>
            <p class="text-3xl font-extrabold">${child.balance.toFixed(2)}</p>
        </div>

        <!-- HTML form to run the handleSubmit function -->
        <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-2">
            <div class="flex gap-2">
                <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Amount ($)"
                    bind:value={amountToSpend}
                />
                <!-- New Zealand Dollar operates on a cent scale -->
                <Button type="submit">Deduct</Button>
            </div>

            <!-- Display outcome -->
            {#if errorMessage}
                <p class="text-xs font-medium text-destructive">{errorMessage}</p>
            {:else if successMessage}
                <p class="text-xs font-medium text-emerald-500">{successMessage}</p>
            {/if}

        </form>
    </Card.Content>
</Card.Root>
