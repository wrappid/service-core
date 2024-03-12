export const  extractUrl = (str:string) =>{
  // Regular expression to match "https://" or "http://" followed by anything
  const urlRegex = /(https?:\/\/)(.+)/;
  
  // Use match() to find the first occurrence of the pattern
  const match = str.match(urlRegex);
  
  // If a match is found, return the full URL
  if (match) {
    return match[0]; // Return the entire matched group (including protocol)
  }
  
  // If no match is found, return an empty string
  return "";
};