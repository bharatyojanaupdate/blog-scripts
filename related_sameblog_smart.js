(function () {
  const getSlug = () => {
    const m = window.location.pathname.match(/\/(\d{4}\/\d{2}\/[^.]+)\.html/);
    return m ? m[1] : "";
  };
  const inject = posts => {
    if (!posts || posts.length === 0) return;
    const container = document.createElement("div");
    container.style = "margin:30px 0;padding:20px;background:#f9f9f9;border-left:4px solid #007bff;border-radius:8px;";
    container.innerHTML = "<h3 style='margin:0 0 10px;'>📚 People Also Read</h3><ul style='list-style:none;padding-left:0;'>";
    posts.slice(0, 5).forEach(p => {
      const li = document.createElement("li");
      li.style = "margin:8px 0;";
      li.innerHTML = `<a href="${p.link}" style="color:#007bff;text-decoration:none;">📌 ${p.title}</a>`;
      container.querySelector("ul").appendChild(li);
    });
    const content = document.querySelector(".post-body, .entry-content, article, .mobile-post");
    content && content.parentNode.insertBefore(container, content.nextSibling);
  };
  const slug = getSlug();
  const domain = location.origin;
  const url = `${domain}/feeds/posts/default?alt=json&max-results=20`;
  fetch(url).then(r => r.json()).then(json => {
    const en = json.feed.entry || [];
    const posts = en.map(e => ({
      title: e.title.$t,
      link: e.link.find(l => l.rel === "alternate").href.split('?')[0]
    })).filter(p => !p.link.includes(slug));
    inject(posts.sort(() => 0.5 - Math.random()));
  }).catch(e => console.warn("Related fetch error:", e));
})();
