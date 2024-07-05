export function createUser(useData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(useData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("trying to login ");
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();

        console.log("checkAuth -> ", error);
        reject(error);
      }
    } catch (error) {
      console.log("checkAuth -> ", error);
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    resolve({ data: "Sign-out Successfully" });
  });
}

export function restPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();

        console.log("checkAuth -> ", error);
        reject(error);
      }
    } catch (error) {
      console.log("checkAuth -> ", error);
      reject(error);
    }
  });
}

export function restPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();

        console.log("checkAuth -> ", error);
        reject(error);
      }
    } catch (error) {
      console.log("checkAuth -> ", error);
      reject(error);
    }
  });
}
