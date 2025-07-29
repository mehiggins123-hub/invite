let selectedDoll = "";

const scenes = {
  scene1: document.getElementById("scene1"),
  scene2: document.getElementById("scene2"),
  scene3: document.getElementById("scene3")
};

function showScene(id) {
  Object.values(scenes).forEach(scene => scene.classList.remove("active"));
  scenes[id].classList.add("active");
}

// Scene 1 → Select Doll
document.querySelectorAll(".doll-icon").forEach(icon => {
  icon.addEventListener("click", () => {
    selectedDoll = icon.dataset.doll;
    document.getElementById("baseDoll").src = `images/dolls/${selectedDoll}`;
    showScene("scene2");
  });
});

// Scene 2 → Dress-Up
document.querySelectorAll(".clothing-item").forEach(item => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    const src = item.src;

    if (type === "tops") {
      document.getElementById("topsLayer").src = src;
    } else if (type === "bottoms") {
      document.getElementById("bottomsLayer").src = src;
    } else if (type === "shoes") {
      document.getElementById("shoesLayer").src = src;
    }
  });
});

const items = {
  tops: [
    "images/clothes/tops/full/top1.png",
    "images/clothes/tops/full/top2.png",
    "images/clothes/tops/full/top3.png",
    "images/clothes/tops/full/top4.png"
  ],
  bottoms: [
    "images/clothes/bottoms/full/bottom1.png",
    "images/clothes/bottoms/full/bottom2.png",
    "images/clothes/bottoms/full/bottom3.png",
    "images/clothes/bottoms/full/bottom4.png"
  ],
  shoes: [
    "images/clothes/shoes/full/shoe1.png",
    "images/clothes/shoes/full/shoe2.png",
    "images/clothes/shoes/full/shoe3.png"
  ]
};

const indices = {
  tops: 0,
  bottoms: 0,
  shoes: 0
};

// Arrow click navigation
document.querySelectorAll(".arrow").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.type;
    const direction = button.classList.contains("left") ? -1 : 1;

    indices[type] = (indices[type] + direction + items[type].length) % items[type].length;

    const previewImg = document.getElementById(`${type}Preview`);
    const newFullSrc = items[type][indices[type]];
    const previewName = newFullSrc.split('/').pop().replace('.png', '_preview.png');

    previewImg.src = `images/clothes/${type}/previews/${previewName}`;
    previewImg.dataset.full = newFullSrc;
  });
});


// Dressing the doll
document.querySelectorAll(".shelf-item").forEach(img => {
  img.addEventListener("click", () => {
    const type = img.dataset.type;
    const fullSrc = img.dataset.full;

    if (type === "tops") {
      document.getElementById("topsLayer").src = fullSrc;
    } else if (type === "bottoms") {
      document.getElementById("bottomsLayer").src = fullSrc;
    } else if (type === "shoes") {
      document.getElementById("shoesLayer").src = fullSrc;
    }
  });
});



// Done button → Go to Scene 3
document.getElementById("doneBtn").addEventListener("click", () => {
  document.getElementById("finalDoll").src = document.getElementById("baseDoll").src;
  document.getElementById("finalTops").src = document.getElementById("topsLayer").src;
  document.getElementById("finalBottoms").src = document.getElementById("bottomsLayer").src;
  document.getElementById("finalShoes").src = document.getElementById("shoesLayer").src;
  showScene("scene3");
});

// Restart → Go to Scene 1
document.querySelector(".restart-btn").addEventListener("click", () => {
  // Reset selected doll
  selectedDoll = "";

  // Clear dress-up layers
  document.getElementById("baseDoll").src = "";
  document.getElementById("topsLayer").src = "";
  document.getElementById("bottomsLayer").src = "";
  document.getElementById("shoesLayer").src = "";

  // Clear final scene images
  document.getElementById("finalDoll").src = "";
  document.getElementById("finalTops").src = "";
  document.getElementById("finalBottoms").src = "";
  document.getElementById("finalShoes").src = "";

  // Reset clothing indices to 0 (optional but probably helpful)
  indices.tops = 0;
  indices.bottoms = 0;
  indices.shoes = 0;

  // Reset the previews back to the first items
  document.getElementById("topsPreview").src = "images/clothes/tops/previews/top1_preview.png";
  document.getElementById("topsPreview").dataset.full = items.tops[0];

  document.getElementById("bottomsPreview").src = "images/clothes/bottoms/previews/bottom1_preview.png";
  document.getElementById("bottomsPreview").dataset.full = items.bottoms[0];

  document.getElementById("shoesPreview").src = "images/clothes/shoes/previews/shoe1_preview.png";
  document.getElementById("shoesPreview").dataset.full = items.shoes[0];

  // Show Scene 1 using your function (this toggles .active classes)
  showScene("scene1");
});



// Start at scene 1
showScene("scene1");
document.querySelector('.print-btn').addEventListener('click', () => {
  const printLayout = document.getElementById('print-layout');
  const printDollContainer = document.getElementById('print-doll-container');
  const doll = document.querySelector('.doll'); // adjust selector if needed

  // Clear previous content
  printDollContainer.innerHTML = "";

  // Clone doll base
  const dollClone = doll.cloneNode(true);
  dollClone.classList.add('print-doll');

  // Clone clothing layers
  const clothingLayers = document.querySelectorAll('.doll .clothing-item'); // adjust class if needed
  clothingLayers.forEach(item => {
    const clone = item.cloneNode(true);
    printDollContainer.appendChild(clone);
  });

  printDollContainer.appendChild(dollClone);

  // Show print layout
  printLayout.style.display = 'block';

  // Wait a tick to ensure layout renders
  setTimeout(() => {
    window.print();

    // Hide print layout again after print
    printLayout.style.display = 'none';
  }, 100);
});
