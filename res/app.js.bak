document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");

  cards.forEach(card => {
    // 创建卡片容器
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    // 左侧内容：图标 + 标题 + 描述
    const leftSide = document.createElement("div");
    leftSide.className = "card-left clickable";
    leftSide.addEventListener("click", () => window.location.href = card.link);

    // 图标区域
    const icon = document.createElement("div");
    icon.className = "card-icon clickable";

    if (card.iconUrl) {
      const img = document.createElement("img");
      img.src = card.iconUrl;
      img.alt = "图标";
      img.onclick = (e) => {
        e.stopPropagation(); // 防止多次触发
        window.location.href = card.link;
      };
      icon.appendChild(img);
    }

    // 标题
    const title = document.createElement("div");
    title.className = "card-title clickable";
    title.textContent = card.title;
    title.onclick = () => window.location.href = card.link;

    // 描述
    const description = document.createElement("div");
    description.className = "card-description";
    description.textContent = card.description;

    leftSide.appendChild(icon);
    leftSide.appendChild(title);
    leftSide.appendChild(description);

    // 右侧按钮
    const rightSide = document.createElement("div");
    rightSide.className = "card-right";

    const button = document.createElement("button");
    button.className = "card-button";
    button.textContent = "点击跳转";
    button.onclick = () => window.location.href = card.link;

    rightSide.appendChild(button);

    // 组合卡片
    cardElement.appendChild(leftSide);
    cardElement.appendChild(rightSide);

    // 添加到页面
    container.appendChild(cardElement);
  });
});