<template>
	<v-container class="centrar">
		<v-card elevation="4" rounded="lg" min-width="400">
			<img src="../assets/dev.svg" height="20" class="mt-8 ml-16 mb-4" />
			<p class="px-4">Login</p>
			<br />
			<v-card-text class="px-10">
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-row align="center" dense>
						<v-col cols="12">
							<v-text-field
								v-model="email"
								:rules="emailRules"
								label="Email"
								required
								prepend-inner-icon="mdi-email-outline"
								variant="outlined"
							></v-text-field>
							<v-text-field
								v-model="password"
								:rules="passwordRules"
								:type="showHidePassLogin ? 'text' : 'password'"
								label="Password"
								required
								prepend-inner-icon="mdi-lock"
								:append-inner-icon="showHidePassLogin ? 'mdi-eye' : 'mdi-eye-off'"
								@click:appendInner="showHidePassLogin = !showHidePassLogin"
								variant="outlined"
							></v-text-field>
						</v-col>
					</v-row>
				</v-form>
				<v-btn
					class="mt-2 white-text"
					color="blue"
					variant="flat"
					rounded="xs"
					block
					@click="loginUser()"
					>Login</v-btn
				>
				<p class="text-center mt-6 mb-6 text-grey text-caption">
					or continue with these social profile
				</p>
				<v-row justify="center" class="mb-4">
					<v-icon
						@click="socialLogin('google')"
						size="x-large"
						class="ma-2"
						color="red"
						rounded="lg"
						>mdi-google</v-icon
					>
					<v-icon
						@click="socialLogin('facebook')"
						size="x-large"
						class="ma-2"
						color="blue"
						>mdi-facebook</v-icon
					>
					<v-icon
						@click="socialLogin('twitter')"
						size="x-large"
						class="ma-2"
						color="indigo"
						>mdi-twitter</v-icon
					>
					<v-icon @click="socialLogin('github')" size="x-large" class="ma-2" color="black"
						>mdi-github</v-icon
					>
				</v-row>
				<v-row justify="center" class="mb-2">
					<p class="text-caption">Don't hace an account yet?</p>
					&nbsp
					<RouterLink to="register" class="text-caption"> Register</RouterLink>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue'
	import axios from 'axios'
	import { useRouter, useRoute } from 'vue-router'
	import { useUserStore } from '@/store/userStore'
	const router = useRouter()
	const useStore = useUserStore()
	const valid = ref(true)
	const email = ref('julio.c.ud@gmail.com')
	const password = ref('123123')
	const showHidePassLogin = ref(false)

	const socialLogin = async (provider) => {
		await useStore.socialLogin(provider)
	}
	const loginUser = async () => {
		await useStore.loginUser(email.value, password.value)
	}

	const emailRules = reactive([
		(v) => !!v || 'E-mail requerido',
		(v) => /.+@.+/.test(v) || 'El formato de E-Mail es incorrecto',
	])
	const passwordRules = [
		(v) => !!v || 'Contraseña requerida',
		(v) => v.length >= 6 || 'La contraseña debe de ser mininmo de 6 caracteres',
	]
</script>

<style scoped>
	.centrar {
		min-height: 100vh;
		max-width: 450px;
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		justify-content: center;
	}
</style>
