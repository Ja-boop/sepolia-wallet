<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { ...rest }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
	{...rest}
	xmlns="http://www.w3.org/2000/svg"
	height="24px"
	viewBox="0 -960 960 960"
	width="24px"
	fill="white"
	><path
		d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
	/></svg
>
