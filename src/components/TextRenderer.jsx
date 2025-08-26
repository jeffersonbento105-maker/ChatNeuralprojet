import React from "react";
import RecipeRenderer from "./RecipeRenderer";
import { stripSimpleMarkdown, parseSimpleMarkdownToNodes } from "../utils/textUtils";

function TextRenderer({ data }) {
  if (!data) return null;

  // Render recipe specially if it matches recipe keys
  if (data.ingredients && data.steps) {
    return <RecipeRenderer recipe={data} />;
  }

  return (
    <div className="text-block">
      {data.title && (
        <h2 className="title" data-testid="text-title">
          {stripSimpleMarkdown(data.title)}
        </h2>
      )}
      
      {data.author && (
        <div className="author" data-testid="text-author">
          por {stripSimpleMarkdown(data.author)}
        </div>
      )}
      
      <div className="content" data-testid="text-content">
        {Array.isArray(data.content)
          ? data.content.map((p, idx) => (
              <p key={idx}>{stripSimpleMarkdown(p)}</p>
            ))
          : parseSimpleMarkdownToNodes(String(data.content)).map((node, idx) => {
              if (node.type === 'h') {
                return (
                  <h3 key={idx}>
                    {stripSimpleMarkdown(node.content)}
                  </h3>
                );
              }
              if (node.type === 'ul') {
                return (
                  <ul key={idx}>
                    {node.items.map((item, i) => (
                      <li key={i}>{stripSimpleMarkdown(item)}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx}>
                  {stripSimpleMarkdown(node.content)}
                </p>
              );
            })}
      </div>
    </div>
  );
}

export default TextRenderer;