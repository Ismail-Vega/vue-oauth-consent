import { ref } from "vue";
import axios from "axios";
import qs from "qs";

// This data is sensitive and should be handle through env variables or another secure way
const API_URL = "https://dev-api.orqestra.io/oauth";
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ldGZvcnVtK29saXZAZ21haWwuY29tIiwiaWQiOjc1LCJwcm92aWRlciI6Im5vbmUifQ.hBu6-PxvoyoHUorzCs6xkP2A1ZgmcZ8QzRTKepq0iIY";

export function useOAuth() {
  const clientInfo = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchClientInfo = async ({ client_id, scope }) => {
    loading.value = true;

    try {
      const res = await axios.get(`${API_URL}/scopes`, {
        headers: {
          Authorization: AUTH_TOKEN,
        },
        params: {
          client_id,
          scope,
        },
      });

      clientInfo.value = res.data.data;
    } catch (err) {
      error.value = "Failed to load client information";
    } finally {
      loading.value = false;
    }
  };

  const authorizeClient = async (queryParams) => {
    const response = await axios.post(
      `${API_URL}/authorize?${qs.stringify(queryParams)}`,
      {},
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }
    );
    return response.data;
  };

  return {
    clientInfo,
    loading,
    error,
    fetchClientInfo,
    authorizeClient,
  };
}
