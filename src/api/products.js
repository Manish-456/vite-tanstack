const URL = "http://localhost:3000/products";

export const fetchProducts = async ({pageParam = 1}) => {
    console.log(pageParam)
  const response = await fetch(`${URL}?_limit=4&_page=${pageParam}`);
  return response.json();
};

export const addProducts = async (product) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
};

export const updateProduct = async({id, product}) => {
    const response = await fetch(`${URL}/${id}`, {
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(product)
    });
    return response.json();
}

export const deleteProduct = async (id) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
