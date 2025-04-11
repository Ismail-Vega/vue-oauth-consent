<template>
    <div class="flex justify-center">
        <div class="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
            <h2 class="text-2xl font-bold mb-2">Log in to your account</h2>
            <p class="text-gray-600 mb-4">Welcome back!</p>

            <button @click="login" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Continue with Orqestra
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login",
    methods: mapActions(["login"]),
};
</script>
