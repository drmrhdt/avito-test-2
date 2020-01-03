export async function getImages() {
  let response = await fetch(
    "https://boiling-refuge-66454.herokuapp.com/images",
    { method: "GET" }
  );
  response = await response.json();
  return response;
}

export async function getImage(id) {
  let response = await fetch(
    `https://boiling-refuge-66454.herokuapp.com/images/${id}`,
    { method: "GET" }
  );
  response = await response.json();
  return response;
}

export async function addComment(id, data) {
  let response = await fetch(
    `https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );
  if (response.ok) {
    console.log(response);
    // response = await response.json();
  } else {
    console.log(response.error);
  }
}
