<template>
    <header class="container mx-auto mb-8">
        <div class="h-16 flex justify-between items-center">
            <h1 class="text-2xl font-medium">CheckList App</h1>
            <div v-if="!isLogged" class="flex justify-end items-center gap-x-4">
                <UButton variant="link" to="/auth/register">Register</UButton>
                <UButton to="/auth/login">Login</UButton>
            </div>     
            <div v-if="isLogged">
                <UButton class="text-red-500" variant="link" @click="logout">Logout</UButton>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const {isLogged, logout } = useToken()
</script>