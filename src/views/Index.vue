<template>
    <div class="index-container">
        <h1>Welcome to Chat App</h1>
        <div class="navigation-buttons">
            <router-link to="/signin" class="button">Sign In</router-link>
            <router-link to="/login" class="button">Log In</router-link>
            <router-link to="/chat" class="button">Chat</router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "IndexPage"
};
</script>

<style scoped>

.index-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 設定高度為視窗高度，防止滾動 */
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    color: white;
    text-align: center;
}

.navigation-buttons {
    margin-top: 20px;
}

.button {
    display: inline-block;
    margin: 0 10px;
    padding: 10px 20px;
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: rgba(255, 255, 255, 0.4);
}
</style>
  