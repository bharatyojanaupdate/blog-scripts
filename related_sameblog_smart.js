(function () {
  const titleStyle = "font-size:20px;color:#2c3e50;margin-bottom:10px;";
  const listStyle = "list-style-type:📌;padding-left:20px;font-size:16px;line-height:1.5;";
  const containerStyle = "background:#f9f9f9;border-left:4px solid #007bff;padding:15px;margin:30px 0;border-radius:8px;";

  const showRelated = (posts) => {
    const box = document.createElement("div");
    box.style = containerStyle;
    box.innerHTML = `<div style="${titleStyle}">📚 People Also Read</div><ul style="${listStyle}">
      ${posts.map(p => `<li><a href="${p.link}" style="color:#007bff;text-decoration:none;">${p.title}</a></li>`).join("")}
    </ul>`;
    
    const target = document.querySelector(".post-body") || document.querySelector(".entry-content") || document.querySelector("article");
    if (target) target.appendChild(box);
  };

  const fetchPosts = async () => {
    const blogURL = location.origin;
    const feedURL = `${blogURL}/feeds/posts/default?alt=json&max-results=6`;

    try {
      const res = await fetch(feedURL);
      const json = await res.json();
      const entries = json.feed.entry || [];

      const currentURL = location.href;
      const posts = entries
        .filter(entry => !currentURL.includes(entry.link[4].href)) // exclude current post
        .slice(0, 3)
        .map(entry => ({
          title: entry.title.$t,
          link: entry.link.find(l => l.rel === "alternate").href
        }));

      showRelated(posts);
    } catch (e) {
      console.warn("Related posts fetch error:", e);
    }
  };

  fetchPosts();
})();
