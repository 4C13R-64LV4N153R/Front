<template>
  <div class="login-container">
    <div class="login-header">
      <div class="logo">
        <img src="../assets/images/logo.jpg" alt="logo" />
      </div>
      <h2>Nom du bar</h2>
    </div>
    <div class="login-form">
      <div class="input-group">
        <input type="text" v-model="email" placeholder="Email" />
      </div>
      <div class="input-group">
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const login = async () => {
      console.log('Logging in with', email.value, password.value)
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        })

        const data = await response.json()
        if (data.token) {
          localStorage.setItem('token', data.token)
          await router.push('/')
        } else {
          console.error('No token received:', data)
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }

    return {
      email,
      password,
      login
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.logo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.login-header h2 {
  margin: 0;
}

.login-form {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #ff5042;
}
</style>
