const URL = "./example.json";

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
    Object.values(obj).forEach((value) => {
      if (isObject(value)) {
        if (value.hasOwnProperty("name")) {
          const li = document.createElement("li");
          li.textContent = value.name;
          document.body.append(li);
        }
        objProps(value);
      }
    });
  };

  const createElement = ({ tag, name = "" }) => {
    const result = document.createElement(tag);
    result.textContent = name;

    return result;
  };

  const hasChildren = (children) => !!children.length;
  const getParent = (el) => el.folders || el.folder || el.child;
  const getChildren = (el) =>
    el.items || el.children?.items || el.children?.items || [];
  const getName = (el) => el.name || el.folder?.name || el.child?.name;

  const getTree = (data) => {
    const result = data.map((el) => {
      const name = getName(el);
      const ul = createElement({ tag: "ul" });
      const li = createElement({ tag: "li", name });

      const children = getChildren(getParent(el));
      ul.append(li);

      if (hasChildren(children)) {
        const nestedList = getTree(children);

        ul.append(...nestedList);
      }

      return ul;
    });

    return result;
  };

  const createTreeDev = async () => {
    const data = await getData(URL);

    const result = getTree(data.searchProjects.items);

    document.body.append(...result);
  };

  createTreeDev();
});
