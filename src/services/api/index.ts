const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoint = {
  auth: {
    login: `${API}/${VERSION}/auth/login`,
  },
  users: {
    account: `${API}/${VERSION}/users/account`,
    create: `${API}/${VERSION}/users`,
  },
  dreams: {
    create: `${API}/${VERSION}/dreams/`,
    get: `${API}/${VERSION}/dreams/`,
    getOne: (id: string) => `${API}/${VERSION}/dreams/${id}`
  }
}

export default endPoint;
