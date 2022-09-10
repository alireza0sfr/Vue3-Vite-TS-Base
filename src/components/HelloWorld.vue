<template>
	<h1>{{ msg }}</h1>

	<div class="card">
		<p>
			Testing Localizations: {{ $t('works-fine') }}
		</p>
		<p>
			Testing Store: {{ objectStore.object.message }}
		</p>
		<p>
			Testing Mixins: {{ mixinsMessage }}
		</p>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	// @ts-ignore
	import { useObjectStore } from "~/stores/index.ts";
	import { mapStores } from "pinia";
	// @ts-ignore
	import { Logger } from "~/plugins/logger.ts";
	// @ts-ignore
	import mixins from "~/plugins/mixins.ts";

	export default defineComponent({
		mixins: [mixins],
		mounted() {
			Logger.log("Logger Works Fine!");
		},
		name: "HelloWorld",
		props: {
			msg: String,
		},
		computed: {
			...mapStores(useObjectStore),
		},
	});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
