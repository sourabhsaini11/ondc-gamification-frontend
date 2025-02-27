import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://gamafication-node-backend-dev.thewitslab.com/api/v1',
})

export default instance
