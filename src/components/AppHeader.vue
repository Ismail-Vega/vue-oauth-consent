<template>
  <div class="bg-gray-900 text-white flex items-center justify-between p-4">
    <h3 class="text-xl font-semibold">Zapier</h3>

    <div>
      <span v-if="!isLoggedIn" class="flex items-center gap-2 text-red-500">
        <i class="fas fa-exclamation-triangle"></i> Not Connected
      </span>
      <span v-else class="flex items-center gap-2 text-green-500">
        <i class="fas fa-user-circle"></i> Connected
      </span>
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: mapGetters(["isLoggedIn"]),
};
</script>
