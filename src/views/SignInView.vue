<template>
  <div class="signIn-container">
    <div class="signIn-content">
      <h1 class="signIn-title">SignIn</h1>
      <form class="signIn-form" @submit.prevent="signIn">
        <div class="input-wrapper">
          <input type="text" placeholder="Username" v-model="username" />
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <button type="submit" class="signIn-button">Sign In</button>
      </form>
      <p class="signIn-message">Welcome to the chat application. Please sign in to continue.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async signIn() {
      const data = {
        Username: this.username,
        Password: this.password,
      };

      try {
        console.log('start sending request');
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/signIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Server response was not ok');
        }

        const respBody = await response.json();
        console.log('respBody:', respBody);
        // 根據需要進行後續處理，例如導航到其他頁面或顯示錯誤消息
      } catch (err) {
        console.error('Request failed:', err);
        // 處理錯誤情況
      }
    },
  },
};
</script>

<style scoped>
.signIn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.signIn-content {
  padding: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.signIn-title {
  margin-bottom: 1rem;
  color: #333;
}

.input-wrapper {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.375rem;
  box-sizing: border-box;
}

.signIn-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #5c6bc0;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.signIn-button:hover {
  background-color: #3f51b5;
}

.signIn-message {
  margin-top: 1rem;
  color: #666;
  font-size: 0.875rem;
}
</style>