<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { ...rest }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	{...rest}
	xmlns="http://www.w3.org/2000/svg"
	height="20px"
	viewBox="0 -960 960 960"
	width="20px"
	fill="black"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg
>
