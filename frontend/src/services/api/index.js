import clienteApi from "./axios";

export const authService = {
  login: (datos) => clienteApi.post("/auth/login", datos),
  logout: () => clienteApi.post("/auth/logout"),
  me: () => clienteApi.get("/auth/me"),
  profile: (datos) => clienteApi.put("/auth/profile", datos)
};

export const dashboardService = {
  stats: () => clienteApi.get("/dashboard")
};

export const userService = {
  list: (params) => clienteApi.get("/users", { params }),
  create: (datos) => clienteApi.post("/users", datos),
  detail: (id) => clienteApi.get(`/users/${id}`),
  update: (id, datos) => clienteApi.put(`/users/${id}`, datos),
  remove: (id) => clienteApi.delete(`/users/${id}`)
};

export const permissionService = {
  list: (params) => clienteApi.get("/permission-requests", { params }),
  create: (datos) => clienteApi.post("/permission-requests", datos),
  detail: (id) => clienteApi.get(`/permission-requests/${id}`),
  approve: (id) => clienteApi.patch(`/permission-requests/${id}/approve`),
  reject: (id) => clienteApi.patch(`/permission-requests/${id}/reject`)
};

export const vacationService = {
  list: () => clienteApi.get("/vacations"),
  create: (datos) => clienteApi.post("/vacations", datos),
  balance: () => clienteApi.get("/vacations/my/balance")
};

export const biometricService = {
  records: () => clienteApi.get("/biometric/records"),
  checkin: (datos) => clienteApi.post("/biometric/records", datos),
  report: () => clienteApi.get("/biometric/report")
};
