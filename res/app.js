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

// 陀螺仪背景效果
function initGyroscope() {
  const orbs = document.querySelectorAll('.bg-orb');
  
  if (!('DeviceOrientationEvent' in window)) return;
  
  // iOS 13+ 需要请求权限
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.addEventListener('click', function requestGyro() {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            enableGyroscope(orbs);
          }
        })
        .catch(console.error);
      document.body.removeEventListener('click', requestGyro);
    }, { once: true });
  } else {
    enableGyroscope(orbs);
  }
}

function enableGyroscope(orbs) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  window.addEventListener('deviceorientation', (e) => {
    const beta = e.beta || 0;
    const gamma = e.gamma || 0;
    
    targetX = Math.max(-20, Math.min(20, gamma));
    targetY = Math.max(-20, Math.min(20, beta - 45));
  });
  
  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    
    orbs.forEach((orb, index) => {
      const factor = 1 + index * 0.4;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// 鼠标移动效果 (桌面端)
function initMouseEffect() {
  if ('ontouchstart' in window) return;
  
  const orbs = document.querySelectorAll('.bg-orb');
  
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    targetX = ((e.clientX - centerX) / centerX) * 20;
    targetY = ((e.clientY - centerY) / centerY) * 20;
  });
  
  function animate() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    
    orbs.forEach((orb, index) => {
      const factor = 1 + index * 0.4;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
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

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = card.title;

    const description = document.createElement("div");
    description.className = "card-description";
    description.textContent = card.description;

    leftSide.appendChild(icon);
    leftSide.appendChild(title);
    leftSide.appendChild(description);

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
  initGyroscope();
  initMouseEffect();
});
