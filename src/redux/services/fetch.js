export async function signUp({ username, password }) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_END_POINT}/signup`, {
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
