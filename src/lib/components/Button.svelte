<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cva } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'class'> {
		color?: 'primary';
		children: Snippet;
	}

	let { color = 'primary', children, ...rest }: Props = $props();

	const buttonClasses = cva([`w-full flex flex-col items-center justify-center rounded-lg`], {
		variants: {
			color: {
				primary: 'bg-primary-500'
			}
		}
	});
</script>

<button class={buttonClasses({ color })} {...rest}>
	{@render children()}
</button>
