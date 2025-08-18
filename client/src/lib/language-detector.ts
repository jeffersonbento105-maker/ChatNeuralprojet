export function detectLanguage(text: string): 'pt' | 'en' {
  const ptWords = [
    'o', 'a', 'e', 'é', 'da', 'do', 'que', 'não', 'como', 'para', 'com', 'uma', 'por', 
    'ser', 'ter', 'está', 'muito', 'mais', 'todo', 'quando', 'onde', 'porque', 'desde',
    'sobre', 'entre', 'durante', 'através', 'dentro', 'fora'
  ];
  
  const enWords = [
    'the', 'and', 'is', 'to', 'of', 'a', 'in', 'that', 'have', 'for', 'not', 'with', 
    'you', 'this', 'but', 'his', 'from', 'they', 'she', 'or', 'an', 'were', 'been', 
    'their', 'what', 'your', 'when', 'him', 'my', 'has', 'had'
  ];
  
  const words = text.toLowerCase().split(/\s+/);
  let ptScore = 0;
  let enScore = 0;
  
  words.forEach(word => {
    if (ptWords.includes(word)) ptScore++;
    if (enWords.includes(word)) enScore++;
  });
  
  return ptScore > enScore ? 'pt' : 'en';
}
