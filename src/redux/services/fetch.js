function endPoint(path) {
  return `${process.env.REACT_APP_API_END_POINT}${path}`;
}

function authHeader(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function signUp({ email, password }) {
  try {
    const res = await fetch(endPoint("/signup"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const { message } = await res.json();
    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function signIn({ email, password }) {
  try {
    const res = await fetch(endPoint("/signin"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const { message } = await res.json();
    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function getContacts({ token }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: authHeader(token),
    });
    const { message } = await res.json();
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function createContact({ name, phone, token }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: { "Content-Type": "application/json", ...authHeader(token) },
      method: "POST",
      body: JSON.stringify({ name, phone }),
    });
    const { message } = await res.json();
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
}
