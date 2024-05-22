<template>
    <div class="h-screen w-full flex flex-col justify-center">
        <div class="flex justify-center items-center">
            <UCard class="w-80">
                <template #header>
                    <h1 class="text-lg">Register</h1>
                </template>
                <UForm :schema="schema" :state="model" class="space-y-4" @submit="onSubmit">
                    <UFormGroup label="Username" name="username">
                        <UInput v-model="model.username" />
                    </UFormGroup>

                    <UFormGroup label="Email" name="email">
                        <UInput v-model="model.email" />
                    </UFormGroup>
                    
                    <UFormGroup label="Password" name="password">
                        <UInput v-model="model.password" type="password" />
                    </UFormGroup>
                    
                    <UButton :loading="pending" type="submit">Login</UButton>
                </UForm>
                <p class="text-gray-500 mt-8">have an acount? <NuxtLink to="/auth/login">login</NuxtLink></p>
            </UCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const config = useRuntimeConfig()
const toast = useToast()
const {model, pending, schema, register} = useRegister()

definePageMeta({
    layout: 'blank'
})

type Schema = InferType<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
    register()
}
</script>