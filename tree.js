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
  searchNames(data);
  console.log(Object.values(data.searchProjects.items));
};

createTree();

const searchNames = (data) => {
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const li = document.createElement("li");
      if (item.hasOwnProperty("name")) {
        li.textContent = item.name;
        document.body.append(li);
      }
      searchNames(item);
    });
  } else {
    for (let subData of Object.values(data)) {
      if (typeof subData === "object") {
        if (subData.hasOwnProperty("name")) {
          const li = document.createElement("li");
          li.textContent = subData.name;
          document.body.append(li);
        }
        searchNames(subData);
      } else {
        continue;
      }
    }
  }
};
