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
	// @ts-ignore
	import { useObjectStore } from "~/stores/index.ts";
	import { defineComponent } from "vue";
	import { mapStores } from "pinia";
	import { Logger } from "~/plugins/logger";
	import mixins from '~/plugins/mixins';
	import _ from 'lodash'

	export default defineComponent({
		mixins: [mixins],
		mounted() {
			Logger.log( _.trim(' Lodash Works Fine! '))
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
<style lang="less">
@import '~/styles/style.less';
</style>
