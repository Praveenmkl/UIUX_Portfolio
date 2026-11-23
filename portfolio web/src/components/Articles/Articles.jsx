import { useState } from "react";
import "./Articles.css";

const ARTICLES_CONTENT = {
  eyebrow: "Articles",
  title: "Thoughts on interface craft and usability.",
  lead: "Notes on visual hierarchy, product UX, and designing trustworthy digital experiences.",
  emptyState: {
    eyebrow: "Articles",
    title: "Coming soon.",
    description:
      "Writing on UI/UX craft and product design will be shared here shortly.",
  },
  articles: [],
};

/**
 * Dedicated Articles route page showing minimal typography until essays are published.
 */
export default function Articles() {
  const [expandedId, setExpandedId] = useState(
    ARTICLES_CONTENT.articles[0]?.id ?? null
  );

  function handleToggle(articleId) {
    setExpandedId((current) => (current === articleId ? null : articleId));
  }

  const hasArticles = ARTICLES_CONTENT.articles.length > 0;

  return (
    <section
      className={`shell page-section${hasArticles ? "" : " page-section--empty"}`}
      aria-labelledby="articles-heading"
    >
      <div className="page-divider" aria-hidden="true" />

      {hasArticles ? (
        <>
          <header className="page-header">
            <p className="page-eyebrow">{ARTICLES_CONTENT.eyebrow}</p>
            <h1 className="page-title" id="articles-heading">
              {ARTICLES_CONTENT.title}
            </h1>
            <p className="page-lead">{ARTICLES_CONTENT.lead}</p>
          </header>

          <div className="articles-list">
            {ARTICLES_CONTENT.articles.map((article) => {
              const isOpen = expandedId === article.id;

              return (
                <article key={article.id} className="article-card">
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-readtime">{article.readTime}</span>
                  </div>

                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-excerpt">{article.excerpt}</p>

                  {isOpen && <p className="article-body">{article.body}</p>}

                  <button
                    type="button"
                    className="article-toggle"
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(article.id)}
                  >
                    {isOpen ? "Show Less" : "Read Note"}
                  </button>
                </article>
              );
            })}
          </div>
        </>
      ) : (
        <div className="page-empty-wrap">
          <div className="page-empty">
            <p className="page-empty-eyebrow">
              {ARTICLES_CONTENT.emptyState.eyebrow}
            </p>
            <h1 className="page-empty-title" id="articles-heading">
              {ARTICLES_CONTENT.emptyState.title}
            </h1>
            <p className="page-empty-copy">
              {ARTICLES_CONTENT.emptyState.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
