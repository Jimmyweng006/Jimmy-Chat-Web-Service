<template>
    <div class="login-container">
        <div class="login-content">
            <h1 class="login-title">Log In</h1>
            <form class="login-form" @submit.prevent="logIn">
                <div class="input-wrapper">
                    <input type="text" placeholder="Username" v-model="username" />
                </div>
                <div class="input-wrapper">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>
                <button type="submit" class="login-button">Log In</button>
            </form>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p class="login-message">Welcome to the chat application. Please login your account before starting a chat.</p>
        </div>
    </div>
</template>
  
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // 用於存儲錯誤訊息
    };
  },
  methods: {
    async logIn() {
      const data = {
        Username: this.username,
        Password: this.password,
      };

      try {
        const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/logIn`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const respBody = await response.json();

        if (!response.ok) {
          // 設置錯誤訊息
          this.errorMessage = respBody.error || 'Login failed';
          return;
        }

        // console.log('Login successful:', respBody);
        
        // 處理登錄成功的情況
        this.errorMessage = 'Login successful'; // 清除錯誤訊息
        
        // 存儲 token 並跳轉到 /chat
        localStorage.setItem('token', respBody.token);
        localStorage.setItem('username', this.username);
        this.$router.push('/chat');
      } catch (err) {
        console.error('Request failed:', err);
        this.errorMessage = 'An error occurred while attempting to log in';
      }
    },
  },
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f7f7;
}

.login-content {
    padding: 2rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-title {
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

.login-button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 0.375rem;
    background-color: #5c6bc0;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}

.login-button:hover {
    background-color: #3f51b5;
}

.login-message {
    margin-top: 1rem;
    color: #666;
    font-size: 0.875rem;
}

.error-message {
    color: red;
    margin-top: 1rem;
}
</style>