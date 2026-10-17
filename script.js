/*
  c2rt personal Bloxd.io website
  Customize the values in SITE_CONFIG below, then commit changes to GitHub.
*/
const SITE_CONFIG = {
  about: "A little corner of the internet for my Bloxd.io, Brawl Stars, and eFootball journey, with cool texture packs and things about me.",
  packs: [
    {
      name: "Cosmic Rift",
      category: "PvP",
      description: "My main pack.",
      downloadUrl: """
    },
    {
      name: "Default 2 Edit",
      category: "Edit",
      description: "A default-style edit, with minimal edits",
      downloadUrl: """
    }
  ],
  socials: [
   { label: "YouTube", url: "https://youtube.com/@cart_exists" }
  ]
};

const aboutText = document.querySelector("#aboutText");
const aboutEditForm = document.querySelector("#aboutEditForm");
const aboutInput = document.querySelector("#aboutInput");
const editAboutBtn = document.querySelector("#editAboutBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const toast = document.querySelector("#toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
}

// Populate editable content from the config.
aboutText.textContent = SITE_CONFIG.about;

editAboutBtn.addEventListener("click", () => {
  aboutInput.value = aboutText.textContent;
  aboutEditForm.classList.remove("hidden");
  editAboutBtn.classList.add("hidden");
  aboutInput.focus();
});

cancelEditBtn.addEventListener("click", () => {
  aboutEditForm.classList.add("hidden");
  editAboutBtn.classList.remove("hidden");
});

aboutEditForm.addEventListener("submit", event => {
  event.preventDefault();
  const newText = aboutInput.value.trim();
  if (!newText) {
    showToast("Please enter some text first.");
    return;
  }
  aboutText.textContent = newText;
  aboutEditForm.classList.add("hidden");
  editAboutBtn.classList.remove("hidden");
  showToast("Updated for this browser session.");
});

// Copy username and other small details.
document.querySelectorAll("[data-copy]").forEach(button => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied ${value}`);
    } catch {
      showToast(`Username: ${value}`);
    }
  });
});

// Pack search and category filters.
const packCards = [...document.querySelectorAll(".pack-card")];
const packSearch = document.querySelector("#packSearch");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const noPacks = document.querySelector("#noPacks");
let activeFilter = "all";

function filterPacks() {
  const query = packSearch.value.trim().toLowerCase();
  let visibleCount = 0;
  packCards.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(query) ||
      card.textContent.toLowerCase().includes(query);
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const visible = matchesText && matchesCategory;
    card.classList.toggle("hidden", !visible);
    if (visible) visibleCount++;
  });
  noPacks.classList.toggle("hidden", visibleCount > 0);
}

packSearch.addEventListener("input", filterPacks);
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    filterPacks();
  });
});

// Pack buttons use configured download links. Empty links show a helpful message.
document.querySelectorAll(".pack-link").forEach(link => {
  link.addEventListener("click", event => {
    const packName = link.dataset.pack;
    const pack = SITE_CONFIG.packs.find(item => item.name === packName);
    if (!pack || !pack.downloadUrl) {
      event.preventDefault();
      showToast(`Add a download URL for ${packName} in script.js.`);
    } else {
      link.href = pack.downloadUrl;
      link.setAttribute("download", "");
    }
  });
});

// Build social links from SITE_CONFIG. Only use links you want public.
const socialContainer = document.querySelector("#socialLinks");
if (SITE_CONFIG.socials.length) {
  socialContainer.replaceChildren();
  SITE_CONFIG.socials.forEach(social => {
    try {
      const parsed = new URL(social.url);
      if (!["https:", "http:"].includes(parsed.protocol)) return;
      const link = document.createElement("a");
      link.className = "social-link";
      link.href = parsed.href;
      link.textContent = social.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      socialContainer.append(link);
    } catch {
      // Ignore incomplete or invalid URLs.
    }
  });
  if (!socialContainer.children.length) {
    socialContainer.innerHTML = '<span class="social-placeholder">Add valid public links in script.js</span>';
  }
}

// Mobile navigation.
const menuToggle = document.querySelector("#menuToggle");
const mobileNav = document.querySelector("#mobileNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});
mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Highlight the current navigation section while scrolling.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav .nav-link")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach(section => observer.observe(section));
}
