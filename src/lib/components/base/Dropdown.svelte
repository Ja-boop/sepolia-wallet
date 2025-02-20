<script lang="ts">
	import ArrowIcon from '$lib/icons/ArrowIcon.svelte';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		label: string;
		labelIcon: Snippet;
		items: Snippet;
	}

	const { label, labelIcon, items }: Props = $props();
	let isOpen = $state(false);
</script>

<div class="relative w-fit">
	<button class="flex cursor-pointer flex-row" onclick={() => (isOpen = !isOpen)}>
		{label}
		{@render labelIcon()}
		<ArrowIcon direction={isOpen ? 'up' : 'down'} />
	</button>

	{#if isOpen}
		<ul transition:slide class="absolute flex w-auto flex-col">
			{@render items()}
		</ul>
	{/if}
</div>
