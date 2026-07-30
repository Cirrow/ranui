<script lang="ts">
  import { Child } from '$lib/child.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';

  let { child }: { child: Child } = $props();

  let amountToSpend = $state<number | ''>('');
  let errorMessage = $state<string>('');

  function handleSubmit() {
    errorMessage = '';
    const numAmount = Number(amountToSpend);

    const result = child.deductAllowance(numAmount);
    if (!result.success) {
      errorMessage = result.message;
    } else {
      amountToSpend = '';
    }
  }
</script>

<Card.Root class="w-full max-w-sm">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-xl font-bold">{child.name}</Card.Title>

        {#if child.receivesBonus}
            <Badge variant="default" class="bg-emerald-600">Bonus Eligible</Badge>
        {:else}
            <Badge variant="destructive">No Bonus</Badge>
        {/if}
    </Card.Header>

    <Card.Content class="space-y-4 pt-4">
        <div>
            <p class="text-xs uppercase tracking-wider text-muted-foreground">Remaining Allowance</p>
            <p class="text-3xl font-extrabold">${child.balance.toFixed(2)}</p>
        </div>

        <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-2">
            <div class="flex gap-2">
                <Input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Amount ($)"
                bind:value={amountToSpend}
                />
                <Button type="submit">Deduct</Button>
            </div>

            {#if errorMessage}
                <p class="text-xs font-medium text-destructive">{errorMessage}</p>
            {/if}
        </form>
    </Card.Content>
</Card.Root>
