function endPoint(path) {
  return `${process.env.REACT_APP_API_END_POINT}${path}`;
}

function authHeader(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function signUp({ username, password }) {
  try {
    const res = await fetch(endPoint("/signup"), {
      method: "POST",
      body: { username, password },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signIn({ username, password }) {
  try {
    const res = await fetch(endPoint("/signin"), {
      method: "POST",
      body: { username, password },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getContacts({ token }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: authHeader(token),
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createContact({ name, phone, token }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: authHeader(token),
      method: "POST",
      body: { name, phone },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
