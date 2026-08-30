<script lang="ts">
    import { Child } from "$lib/child.svelte";
    import ChildCard from "../components/child.svelte";

    // Instantiate the objects for the Ranui children
    // able to be extended should more children be required to track
    const children = $state([
        new Child('Nikau'),
        new Child('Hana'),
        new Child('Tia')
    ]);
</script>

<!-- Main frontend -->
<main class="container mx-auto py-10 space-y-6">
    <header>
        <h1 class="text-3xl font-extrabold">Ranui Family Clothing Allowance</h1>
        <p class="text-muted-foreground">Track annual allowances and bonus activity eligibility.</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Recursively render each child component -->
        {#each children as child (child.name)}
            <ChildCard {child} />
        {/each}
    </div>
</main>
