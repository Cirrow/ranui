# Ranui family task for Te Kura

The web app for the Ranui family task 3.7

## Development
To run the dev server, install the required node packages with
```
npm install
```

then run
```
npm run dev
```

### File structure
Perhaps the files that are of interest are:
- `src/lib/child.svelte.ts` includes the OOP methods and the underlying mechanism of the child functionalities.
- `src/components/child.svelte` includes the svelte component that uses the `child.svelte.ts` function.
- `src/routes/+page.svelte` includes the svelte page structure that instantiates and uses the `child.svelte` components with a loop.



## Changelog
To view the full changelog from v1, read the [CHANGELOG](https://github.com/Cirrow/ranui/blob/main/CHANGELOG.md).
