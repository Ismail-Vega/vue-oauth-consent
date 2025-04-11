<template>
    <div class="container mx-auto p-6 max-w-md">

        <div v-if="loading" class="flex flex-col items-center justify-center h-64">
            <i class="fas fa-circle-notch fa-spin text-4xl text-gray-600 mb-2"></i>
            <p class="text-gray-600">Loading client information...</p>
        </div>

        <template v-else-if="clientInfo && !error">
            <h1 class="flex font-bold justify-center mb-4 text-3xl">
                {{ clientInfo.display_description }}
            </h1>

            <div class="shadow-lg p-6 rounded-lg">
                <h2 class="font-bold text-gray-700">
                    {{ clientInfo.previous_consented === false
                        ? `Connect your ${clientInfo.name} account to Orqestra`
                        : `Sign in to ${clientInfo.name} with Orqestra` }}
                </h2>

                <div class="flex items-center gap-4 my-4">
                    <img alt="Orqestra Logo" src="/orqestra-icon.png" class="w-12 h-9" />
                    <i class="fas fa-exchange-alt text-lg"></i>
                    <img :src="clientInfo.logo_uri" :alt="`${clientInfo.name} Logo`" class="h-9 w-12" />
                </div>

                <hr class="my-4 border-gray-300" />

                <div>
                    <b class="text-gray-600">Your account details will be used to:</b>
                    <div v-for="scope in clientInfo.scope_description" :key="scope"
                        class="flex items-center mt-2 text-gray-700">
                        <i class="fas fa-lock-open mr-2"></i>
                        <p>{{ scope }}</p>
                    </div>
                </div>

                <hr class="my-4 border-gray-300" />

                <div class="flex gap-4 justify-center">
                    <button @click="cancel" class="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg">
                        Cancel
                    </button>

                    <button @click="authorize" :disabled="authorizing"
                        class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg flex items-center justify-center w-32 h-10">

                        <template v-if="authorizing">
                            <i class="fas fa-circle-notch fa-spin"></i>
                        </template>
                        <template v-else>
                            Authorize
                        </template>

                    </button>
                </div>
            </div>
        </template>

        <div v-else class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <strong class="font-bold">Error:</strong>
            <p>
                {{ error || 'We couldn’t load the client information. Please try again later or contact support.' }}
            </p>
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOAuth } from '../../composables/useOAuth';

export default {
    name: 'ConsentScreen',
    setup() {
        const { clientInfo, loading, error, fetchClientInfo, authorizeClient } = useOAuth();
        const route = useRoute();
        const router = useRouter();
        const authorizing = ref(false);
        const query = new URLSearchParams(window.location.search);
        const state = query.get("state");
        const redirect_uri = query.get("redirect_uri");

        onMounted(() => {
            const { client_id, scope } = route.query;

            if (client_id && scope) {
                fetchClientInfo({ client_id, scope });
            } else {
                error.value = 'Missing required query parameters';
            }
        });

        const authorize = async () => {
            authorizing.value = true;
            error.value = null;

            try {
                const data = await authorizeClient(route.query);

                if (data.code) {
                    const redirectUrl = `${redirect_uri}?code=${data.code}&state=${state}`;
                    window.location.href = redirectUrl;
                    // After redirecting the user we must make an `Access Token Request + code_verifier` to validate the code challenge
                } else {
                    error.value = 'Invalid authorization response';
                }
            } catch (err) {
                error.value = err.response?.data?.message || err.message || 'Authorization request failed';
            } finally {
                authorizing.value = false;
            }
        };

        const cancel = () => {
            router.replace('/');
        };

        return {
            clientInfo,
            loading,
            error,
            authorizing,
            authorize,
            cancel,
        };
    },
};
</script>