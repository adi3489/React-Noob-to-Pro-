//how we created nested structure div under div heading
const parent = React.createElement(
  "div",
  { id: "parent" },
  React.createElement(
    "div",
    { id: "parent" },
    React.createElement("h1", {}, "i am h1 tag")
  )
);
// const heading = React.createElement("h1", { id: "heading" }, "Hello world");
//it is an object
console.log(parent);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent); //render take heading object and converted
//into h1 that reactdom can understand
