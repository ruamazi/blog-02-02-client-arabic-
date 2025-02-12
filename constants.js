const apiKey = import.meta.env.VITE_API_KEY;

export const options = {
 headers: {
  "x-rapidapi-key": apiKey,
  "x-rapidapi-host": "arabic-news-api.p.rapidapi.com",
 },
};

export const rtNewsURL = "https://arabic-news-api.p.rapidapi.com/rtarabic";
export const rtArticleURL =
 "https://arabic-news-api.p.rapidapi.com/rtarabic/article?url=";

export const BLOG_NAME = "مدونة ميرن ستاك";
