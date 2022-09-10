<template>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
	<router-view></router-view>
	<router-link to="/">Go to Home</router-link> |
	<router-link to="/about">Go to About</router-link>
</template>

<style lang="less">
	@import "~/styles/style.less";
</style>
