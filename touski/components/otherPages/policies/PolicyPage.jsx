import Footer8 from "@/components/footers/Footer8";
import Header1 from "@/components/headers/Header1";
import React from "react";

function renderSection(section) {
  return (
    <div key={section.title} className="mb-5">
      <h2 className="h4 mb-3">{section.title}</h2>

      {Array.isArray(section.paragraphs)
        ? section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-3">
              {paragraph}
            </p>
          ))
        : null}

      {Array.isArray(section.items) && section.items.length > 0 ? (
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function PolicyPage({ content }) {
  return (
    <>
      <Header1 />
      <main className="page-wrapper" style={{ position: "relative", zIndex: 1 }}>
        <section className="container mw-930 pt-4">
          <h1 className="page-title mb-4">{content.title}</h1>

          {content.intro.map((paragraph) => (
            <p key={paragraph} className="mb-3">
              {paragraph}
            </p>
          ))}

          {content.sections.map((section) => renderSection(section))}

          <p className="text-muted small">{content.updatedAt}</p>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer8 />
    </>
  );
}
