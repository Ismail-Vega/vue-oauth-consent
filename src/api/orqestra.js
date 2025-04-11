import qs from "qs";
import router from "../router";
import { v4 as uuidv4 } from "uuid";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";

// This data is sensitive and should be handle through env variables or another secure way
const CLIENT_ID = "8f9a0002-ae0f-4412-ac4c-902f1e88e5ff";
const API_URL = "https://dev-api.orqestra.io";

async function getClientId() {
  return new Promise((resolve, reject) => {
    const client_id = CLIENT_ID; // Example client_id. This should be requested to an endpoint like: `${API_URL}/api/client`

    if (client_id) {
      resolve(client_id);
    } else {
      reject("Client ID not available");
    }
  });
}

async function login() {
  const state = uuidv4(); // "-G2EoDooYcrJ5p8EF1AM677T8BvnSMxQMU4HtUjoQ4Y";

  const client_id = await getClientId();
  const code_verifier = generateCodeVerifier(64);
  const code_challenge = await generateCodeChallenge(code_verifier); // "BSupaW6JDyiPDgU4HM8wkLj94DELW0BvsxPAoO2d5XA";

  sessionStorage.setItem("pkce_state", state);
  sessionStorage.setItem("pkce_verifier", code_verifier);

  const queryString = qs.stringify({
    client_id,
    response_type: "code",
    code_challenge,
    code_challenge_method: "S256",
    redirect_uri:
      "https://zapier.com/dashboard/auth/oauth/return/App222291CLIAPI/",
    scope: "conversion",
    state,
  });

  router.push(`/oauth/authorize?${queryString}`);
}

export default {
  login,
  getClientId,
};
