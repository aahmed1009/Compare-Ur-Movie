const autoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;
  const drowpdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");
  const input = root.querySelector("input");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    if (!items.length) {
      drowpdown.classList.remove("is-active");
      return;
    }

    drowpdown.classList.add("is-active");
    for (let item of items) {
      const anchorElement = document.createElement("a");

      anchorElement.classList.add("dropdown-item");
      anchorElement.innerHTML = renderOption(item);
      anchorElement.addEventListener("click", () => {
        drowpdown.classList.remove("is-active");
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.appendChild(anchorElement);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      drowpdown.classList.remove("is-active");
    }
  });
};
