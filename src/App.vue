<template>
	<router-view />
</template>

<script setup>
	import { useUserStore } from '@/store/userStore'
	import { ref, onMounted } from 'vue'

	const useStore = useUserStore()

	onMounted(async () => {
		await useStore.getSession()
		useStore.checkAuth()
	})
</script>
