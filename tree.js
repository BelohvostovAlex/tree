document.addEventListener("DOMContentLoaded", () => {
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      throw new Error(error);
    }
  };

  const createTree = async () => {
    const data = await getData("./example.json");
    objProps(data);
  };

  const isObject = (val) => {
    return typeof val === "object";
  };

  const objProps = (obj) => {
    for (let value of Object.values(obj)) {
      if (isObject(value)) {
        if (value.hasOwnProperty("name")) {
          const li = document.createElement("li");
          li.textContent = value.name;
          document.body.append(li);
        }
        objProps(value);
      }
    }
  };

  createTree();
});
