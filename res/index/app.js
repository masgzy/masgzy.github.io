// 页面加载动画
function hideLoader() {
  const loader = document.querySelector('.page-loader');
  const container = document.querySelector('.container');
  
  if (loader) {
    loader.classList.add('hidden');
  }
  if (container) {
    container.classList.add('visible');
  }
}

// 渲染卡片
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.style.animationDelay = `${index * 0.05 + 0.1}s`;

    const leftSide = document.createElement("a");
    leftSide.className = "card-left";
    leftSide.href = card.link;

    const icon = document.createElement("div");
    icon.className = "card-icon";

    if (card.iconUrl) {
      const img = document.createElement("img");
      img.src = card.iconUrl;
      img.alt = "";
      img.draggable = false;
      icon.appendChild(img);
    } else if (card.iconSvg) {
      icon.innerHTML = card.iconSvg;
    }

    const textContainer = document.createElement("div");
    textContainer.className = "card-text";
    
    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = card.title;

    const description = document.createElement("div");
    description.className = "card-description";
    description.textContent = card.description;

    textContainer.appendChild(title);
    textContainer.appendChild(description);

    leftSide.appendChild(icon);
    leftSide.appendChild(textContainer);

    let imageElement = null;
    if (card.imageUrl) {
      imageElement = document.createElement("a");
      imageElement.className = "card-image-link";
      imageElement.href = card.link;
      const img = document.createElement("img");
      img.className = "card-image";
      img.src = card.imageUrl;
      img.alt = "";
      img.draggable = false;
      imageElement.appendChild(img);
    }

    const button = document.createElement("a");
    button.className = "card-button";
    button.href = card.link;
    button.textContent = "前往";

    cardElement.appendChild(leftSide);
    if (imageElement) {
      cardElement.appendChild(imageElement);
    }
    cardElement.appendChild(button);

    container.appendChild(cardElement);
  });

  setTimeout(hideLoader, 300);
  initBackgroundEffects();
});