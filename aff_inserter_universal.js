(function () {
  const affLinks = [
    { title: "🚀 Boost Your Income!", url: "https://example.com/1" },
    { title: "🎓 Learn AI & Earn", url: "https://example.com/2" },
    { title: "📦 Get Free Blogging Tools", url: "https://example.com/3" },
    { title: "💼 Start Your Affiliate Career", url: "https://example.com/4" },
    { title: "📲 Download Govt Kit", url: "https://example.com/5" }
  ];

  const pickRandom = () => affLinks.splice(Math.floor(Math.random() * affLinks.length), 1)[0];

  const createBox = (data) => {
    const box = document.createElement("div");
    box.innerHTML = `
      <div style="margin:20px 0;padding:16px;border:2px dashed #f90;background:#fff8f0;border-radius:10px;text-align:center;box-shadow:0 2px 5px rgba(0,0,0,0.08);">
        <strong style="font-size:18px;color:#d35400;">${data.title}</strong><br>
        <a href="${data.url}" target="_blank" style="display:inline-block;margin-top:12px;padding:10px 22px;background:#d35400;color:#fff;border-radius:30px;text-decoration:none;font-weight:bold;">👉 Grab Now</a>
      </div>`;
    return box;
  };

  function injectToParagraphs() {
    const article = document.querySelector("article");
    if (!article) return console.warn("❌ No article element found.");

    const ps = article.querySelectorAll("p");
    if (ps.length < 5) return console.warn("❌ Not enough <p> tags to inject.");

    const insertPositions = [2, Math.floor(ps.length / 2), ps.length - 2];
    let injected = 0;

    insertPositions.forEach(pos => {
      if (ps[pos]) {
        const box = createBox(pickRandom());
        ps[pos].insertAdjacentElement("afterend", box);
        injected++;
      }
    });

    console.log(`✅ Injected ${injected} affiliate box(es).`);
  }

  // Wait for Blogger post to render fully
  let tries = 0;
  const maxTries = 10;
  const waitLoop = setInterval(() => {
    const ready = document.querySelectorAll("article p").length >= 5;
    if (ready || tries > maxTries) {
      clearInterval(waitLoop);
      injectToParagraphs();
    }
    tries++;
  }, 600);
})();
