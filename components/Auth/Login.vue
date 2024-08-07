<script setup lang="ts">
import { useForm } from 'vee-validate';
import { RegisterSchema, LoginSchema } from '~/validations/auth.validation';
import { AccountTypeEnum } from '~/utils/enums';
import { toast } from '../ui/toast';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const { loading, authUser } = storeToRefs(authStore);
const { onClose, onOpen } = useLogin();

const isOpen = computed(() => Boolean(route.query.auth));
const isRegister = computed(() => route.query.auth === 'register');
const formSchema = computed(() =>
  isRegister.value ? RegisterSchema : LoginSchema,
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (formValue) => {
  if (isRegister.value) {
    const input = {
      email: formValue.email,
      password: formValue.password,
      accountType: AccountTypeEnum.Local,
      fullName: (formValue as any).name,
    };

    await authStore.register(input);
  } else {
    await authStore.login({
      authKey: formValue.email,
      password: formValue.password,
    });
  }

  // check login/register success
  if (authUser.value) {
    const { auth, ...rest } = route.query;

    router.replace({ query: rest });

    toast({
      description: `Welcome back, ${authUser.value?.user.fullName}!`,
      class: 'bg-green-600 text-white border-green-600',
      duration: 1000,
    });
  }
});
</script>

<template>
  <AppModal
    v-if="isOpen"
    :is-open="isOpen"
    :title="isRegister ? 'Welcome to Airbnb' : 'Welcome back'"
    :description="isRegister ? 'Create an account' : 'Login to your account'"
    @close="onClose"
  >
    <form @submit="onSubmit">
      <!-- Inputs -->
      <div class="space-y-4">
        <FormField
          v-if="isRegister"
          v-slot="{ componentField }"
          name="name"
          class="transition-all duration-700"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Eg: minh chiu"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="email"
          :validate-on-blur="!isFieldDirty"
        >
          {{ authUser }}
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Eg: minh@gmail.com"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="password"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your password"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage />

            <span
              v-if="!isRegister"
              class="mt-4 cursor-pointer text-xs font-light transition hover:text-primary hover:underline"
            >
              Forgot your password?
            </span>
          </FormItem>
        </FormField>
      </div>

      <!-- Other -->
      <div class="flex flex-col gap-2 py-6">
        <div class="flex w-full flex-row items-center gap-4">
          <Button
            type="submit"
            class="user-select-none w-full"
            :disabled="loading"
          >
            <Icon
              v-if="loading"
              name="lucide:loader"
              class="mr-2 h-4 w-4 animate-spin"
            />
            {{ isRegister ? 'Register' : 'Login' }}
          </Button>
        </div>

        <div class="mt-3 flex flex-col gap-4">
          <hr />

          <div class="d-flex space-x-3">
            <Button variant="outline">
              <Icon
                name="lucide:facebook"
                class="mr-2 h-4 w-4"
                color="#4285F4"
              />
              Continue with Facebook
            </Button>

            <Button variant="outline">
              <Icon name="lucide:chrome" class="mr-2 h-4 w-4" color="#d9463e" />
              Continue with Google
            </Button>
          </div>

          <div class="mt-4 text-center font-light">
            <p v-if="isRegister">
              Already have an account?
              <strong
                class="cursor-pointer text-primary hover:underline"
                @click="onOpen('login')"
                >Login</strong
              >
            </p>

            <p v-else>
              Need an account?
              <strong
                class="cursor-pointer text-primary hover:underline"
                @click="onOpen('register')"
                >Register</strong
              >
            </p>
          </div>
        </div>
      </div>
    </form>
  </AppModal>
</template>
