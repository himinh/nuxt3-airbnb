export default defineNuxtConfig({
	devtools: { enabled: true },

	modules: [
		'@nuxtjs/eslint-module',
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'nuxt-typed-router',
		'@pinia/nuxt',
		'nuxt-icon',
		'nuxt3-leaflet',
		'@vueuse/nuxt',
		'@samk-dev/nuxt-vcalendar',
	],

	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},

	components: [
		{
			path: '~/components/ui',
			extensions: ['.vue'],
			prefix: '',
		},
		{
			path: '~/components/shared',
			extensions: ['.vue'],
			prefix: '',
		},
		{
			path: '~/components',
			extensions: ['.vue'],
			prefix: '',
		},
	],

	// ssr config
	ssr: false,

	// runtime config
	runtimeConfig: {
		app: {},
		openaiKey: '',
		replicateKey: '',
		appUrl: '',
		public: {
			apiBase: '',
		},
	},

	// ts
	typescript: {
		strict: true,
		shim: false,
	},
});
