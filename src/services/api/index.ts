import { create } from "domain";

const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoint = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
  },
  users: {
    account: `${API}/${VERSION}/users/account`,
    create: `${API}/${VERSION}/users`,
    chats: (id:string) => `${API}/${VERSION}/users/chat/${id}`,
  },
  dreams: {
    create: `${API}/${VERSION}/dreams`,
    get: `${API}/${VERSION}/dreams`,
    getOne: (id: string) => `${API}/${VERSION}/dreams/${id}`
  },
  favorites: {
    create: `${API}/${VERSION}/favorite`,
    delete: (id: string) => `${API}/${VERSION}/favorite/${id}`
  },
  comments: {
    create: `${API}/${VERSION}/comments`,
    edit: (id: string) => `${API}/${VERSION}/comments/${id}`,
    delete: (id: string) => `${API}/${VERSION}/comments/${id}`
  },
  chats: {
    getAll: `${API}/${VERSION}/chats`,
    create: `${API}/${VERSION}/chats`,
    getOne: (id: string) => `${API}/${VERSION}/chats/${id}`
  },
  messages: {
    create: `${API}/${VERSION}/message`,
  }
}

export default endPoint;
