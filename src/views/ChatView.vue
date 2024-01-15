<template>
    <div class="chat-container">
        <div class="chat-messages">
            <!-- 消息列表 -->
            <div v-for="message in messages" :key="message.id" class="message" :class="{ 'outgoing': message.isOutgoing }">
                <div class="message-content">
                    <span v-if="!message.isOutgoing" class="message-sender">{{ message.sender }}:</span>
                    {{ message.text }}
                </div>
            </div>
        </div>
        <div class="message-input">
            <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            newMessage: '',
            messages: [],
            ws: null,
        };
    },
    mounted() {
        this.connectToWebSocket();
        this.fetchChatHistory(); // 在組件掛載時調用
    },
    methods: {
        sendMessage() {
            if (!this.newMessage.trim()) return; // 防止發送空白消息

            // 檢查 WebSocket 連接是否開啟
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                // 將消息物件轉換為 JSON 字串並發送
                this.ws.send(this.newMessage);

                // 將消息添加到 messages 陣列以更新 UI
                const message = {
                    id: this.messages.length + 1,
                    text: this.newMessage,
                    isOutgoing: true,
                };
                this.messages.push(message);

                // 清空輸入框
                this.newMessage = '';
            } else {
                console.error('WebSocket is not connected.');
            }
        },
        connectToWebSocket() {
            const token = localStorage.getItem('token'); // 從 localStorage 獲取 JWT
            if (token) {
                this.ws = new WebSocket(`${process.env.VUE_APP_WEB_SOCKET_ENDPOINT}/chat?token=` + encodeURIComponent(token));

                this.ws.onopen = () => {
                    console.log('Connected to the websocket server');
                    // 這裡可以發送一些初始化消息，例如:
                    // this.ws.send(JSON.stringify({ type: 'init', data: 'Hello server' }));
                };

                this.ws.onmessage = (event) => {
                    console.log('Message from server', event.data);
                    try {
                        const receivedMessage = JSON.parse(event.data);

                        const message = {
                            id: this.messages.length + 1,
                            text: receivedMessage.Content,
                            sender: receivedMessage.Sender,
                            isOutgoing: false,
                        };
                        this.messages.push(message);
                    } catch (error) {
                        console.error('Error parsing message:', error);
                    }
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error', error);
                    // 處理錯誤
                };

                this.ws.onclose = () => {
                    console.log('Disconnected from the websocket server');
                    // 處理斷開連接
                };
            } else {
                console.error('No token found');
            }
        },
        fetchChatHistory() {
            fetch(`${process.env.VUE_APP_API_ENDPOINT}/chat/messages`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.handleChatHistory(data);
                })
                .catch(error => {
                    console.error('Fetching chat history failed:', error);
                });
        },
        handleChatHistory(responseData) {
            if (responseData && Array.isArray(responseData.data)) {
                responseData.data.forEach(historyMessage => {
                    const message = {
                        id: this.messages.length + 1,
                        text: historyMessage.Content,
                        sender: historyMessage.Sender,
                        isOutgoing: historyMessage.Sender == localStorage.getItem('username'),
                    };
                    this.messages.push(message);
                });
            }
        },
    },
    beforeUnmount() {
        if (this.ws) {
            this.ws.close(); // 在組件銷毀前關閉 WebSocket 連接
        }
    }
};
</script>
  
<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 20px);
    width: calc(100vw - 20px);
    margin: 0;
    padding: 10px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
}

.chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.message {
    display: flex;
    /* 確保消息本身也是 flex 容器 */
    margin-bottom: 10px;
    background-color: transparent;
    /* 將背景設為透明 */
    align-items: center;
    /* 垂直居中 */
    justify-content: flex-start;
    /* 默認靠左對齊 */
}

.message-content {
    max-width: 70%;
    word-wrap: break-word;
    padding: 10px;
    background-color: #e7e7e7;
    /* 非發送者的消息背景色 */
    border-radius: 8px;
}

.message-sender {
    font-weight: bold;
    /* Optional: makes the sender's name bold */
}

.outgoing .message-content {
    background-color: #b2f7ef;
    /* 發送者的消息背景色 */
    margin-left: auto;
    /* 將發送者的消息推向右側 */
    margin-right: 0;
    /* 確保右邊距為0 */
}

.message-input {
    flex: 0 0 8%;
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
}

input[type="text"] {
    flex-grow: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    background-color: #5c6bc0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #3f51b5;
}
</style>