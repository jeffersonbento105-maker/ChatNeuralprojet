/**
 * Text processing utilities for cleaning and parsing simple markdown
 */

/**
 * Remove simple markdown formatting (**, *) and trim whitespace
 * @param {string} text - Text to clean
 * @returns {string} - Cleaned text
 */
export function stripSimpleMarkdown(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/\*\*/g, "").replace(/\*/g, "").trim();
}

/**
 * Parse simple markdown-like text into structured nodes
 * Recognizes headings (#), lists (- ), and paragraphs
 * @param {string} text - Text to parse
 * @returns {Array} - Array of parsed nodes
 */
export function parseSimpleMarkdownToNodes(text) {
  if (typeof text !== 'string') return [];
  
  const lines = text.split(/\n+/).map(l => l.trim());
  const nodes = [];
  let currentList = null;

  for (const line of lines) {
    if (!line) continue;
    
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const content = line.replace(/^#+\s*/, '');
      
      if (currentList) {
        nodes.push({ type: 'ul', items: currentList });
        currentList = null;
      }
      
      nodes.push({ type: 'h', level, content });
    } else if (line.startsWith('- ')) {
      const item = line.replace(/^-\s*/, '');
      
      if (!currentList) currentList = [];
      currentList.push(item);
    } else {
      if (currentList) {
        nodes.push({ type: 'ul', items: currentList });
        currentList = null;
      }
      
      nodes.push({ type: 'p', content: line });
    }
  }
  
  if (currentList) {
    nodes.push({ type: 'ul', items: currentList });
  }
  
  return nodes;
}