(function () {
  const affLinks = [
    { title: "🚀 Boost Your Income!", url: "https://example.com/1" },
    { title: "📘 Claim Free Digital Tools", url: "https://example.com/2" },
    { title: "🎓 Learn AI & Earn", url: "https://example.com/3" }
  ];

  const pick = () => affLinks.splice(Math.floor(Math.random() * affLinks.length), 1)[0];

  const createBox = data => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="margin:20px auto;padding:16px;border:2px dashed #f90;background:#fffbe6;border-radius:8px;text-align:center;">
        <strong style="font-size:18px;color:#b35400;">${data.title}</strong><br>
        <a href="${data.url}" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 22px;background:#b35400;color:#fff;border-radius:30px;text-decoration:none;">👉 Grab Now</a>
      </div>`;
    return el;
  };

  function inject() {
    const containers = document.querySelectorAll('.card, .post-body, article');
    const areas = Array.from(containers).filter(c => c.innerText.trim().length > 50);
    if (areas.length < 1) return;

    const pos = Math.floor(areas.length / 2);
    const box = createBox(pick());
    areas[pos].insertAdjacentElement('afterend', box);
    console.log("✅ Affiliate box inserted at universal position");
  }

  let tries = 0;
  const wait = setInterval(() => {
    const content = document.querySelector('.card, .post-body, article');
    if (content && content.innerText.length > 50) {
      clearInterval(wait);
      inject();
    } else if (++tries > 10) clearInterval(wait);
  }, 700);
})();