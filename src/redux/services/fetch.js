function endPoint(path) {
  return `${process.env.REACT_APP_API_END_POINT}${path}`;
}

function authHeader(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}

export async function checkAuthStatusRequest({ accessToken, refreshToken }) {
  try {
    const responseForAccessToken = await fetch(endPoint("/auth"), {
      headers: authHeader(accessToken),
    });
    const { status } = responseForAccessToken;
    if (status === 401) {
      const responseForRefreshToken = await fetch(endPoint("/refresh"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const { message } = await responseForRefreshToken.json();
      const {
        accessToken: updatedAccessToken,
        refreshToken: updatedRefreshToken,
      } = message;
      return {
        status: responseForRefreshToken.status,
        updatedAccessToken,
        updatedRefreshToken,
      };
    } else {
      return { status };
    }
  } catch (error) {
    console.log(error);
  }
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

export async function getContacts({ accessToken }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: authHeader(accessToken),
    });
    const { message } = await res.json();
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function createContact({ name, phone, accessToken }) {
  try {
    const res = await fetch(endPoint("/contacts"), {
      headers: {
        "Content-Type": "application/json",
        ...authHeader(accessToken),
      },
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

export async function updateContact({
  _id,
  name,
  phone,
  photograph,
  accessToken,
}) {
  try {
    const res = await fetch(endPoint(`/contacts/${_id}`), {
      headers: {
        "Content-Type": "application/json",
        ...authHeader(accessToken),
      },
      method: "PUT",
      body: JSON.stringify({ name, phone }),
    });
    const { message } = await res.json();
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteContact({ _id, accessToken }) {
  try {
    const res = await fetch(endPoint(`/contacts/${_id}`), {
      headers: {
        "Content-Type": "application/json",
        ...authHeader(accessToken),
      },
      method: "DELETE",
    });
    const { message } = await res.json();
    console.log(message);
    return message;
  } catch (error) {
    console.log(error);
  }
}
