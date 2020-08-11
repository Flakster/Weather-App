const createMainBox = () => {
  const mainBox = document.createElement('div');
  mainBox.classList.add('mainBox','bg-warning','m-auto');
  const container = document.getElementById('container');
  container.appendChild(mainBox);
}

export default createMainBox;