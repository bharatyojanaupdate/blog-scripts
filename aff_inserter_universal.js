(function () {
  const affLinks = [
    { title: "🚀 Boost Your Income!", url: "https://example.com/1" },
    { title: "📘 Get Free Digital Tools", url: "https://example.com/2" },
    { title: "🎓 Learn AI & Earn", url: "https://example.com/3" }
  ];
  const pick = () => affLinks.splice(Math.floor(Math.random() * affLinks.length), 1)[0];
  const createBox = data => {
    const box = document.createElement("div");
    box.innerHTML = `<div style="margin:20px;padding:16px;border:2px dashed #f90;background:#fffbe6;text-align:center;border-radius:8px;"><strong style="font-size:18px;color:#b35400;">${data.title}</strong><br><a href="${data.url}" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 20px;background:#b35400;color:#fff;border-radius:30px;text-decoration:none;">👉 Grab Now</a></div>`;
    return box;
  };
  function inject() {
    const content = document.querySelector(".post-body, .entry-content, article, .mobile-post");
    if (!content || content.innerText.length < 50) return;
    const data = pick();
    const box = createBox(data);
    content.parentNode.insertBefore(box, content.nextSibling);
  }
  let attempts = 0;
  const timer = setInterval(() => {
    const c = document.querySelector(".post-body, .entry-content, article, .mobile-post");
    if (c && c.innerText.length > 50) {
      clearInterval(timer);
      inject();
    } else if (++attempts > 10) clearInterval(timer);
  }, 600);
})();
