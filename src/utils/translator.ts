export async function translateText(text: string, targetLang: "vi" | "uk"): Promise<string> {
  if (!text) return "";

  // 1. UK English Rules (Local Replacement)
  if (targetLang === "uk") {
    // Basic UK spelling adjustments (add more if needed)
    return text.replace(/Gray/g, "Grey").replace(/gray/g, "grey").replace(/Color/g, "Colour").replace(/color/g, "colour");
  }

  // 2. Vietnamese Translation (MyMemory API -> Fallback Dictionary)
  if (targetLang === "vi") {
    let result = text.toLowerCase();
    
    try {
      const transRes = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`
      );
      if (transRes.ok) {
        const transData = await transRes.json();
        if (transData?.responseData?.translatedText) {
          result = transData.responseData.translatedText;
          // Dọn dẹp các thẻ rác định dạng (như <bpt...>, <ept...>) hoặc dấu | đuôi mà API có thể lẫn vào
          result = result.replace(/<[^>]+>/g, "").replace(/\|+$/, "").trim();
          return result.charAt(0).toUpperCase() + result.slice(1);
        }
      }
    } catch (err) {
      console.error("Translation API failed", err);
    }

    // Fallback dictionary for basic terms if API fails or quota exceeded
    const dictVI: Record<string, string> = {
      dark: "sẫm", light: "sáng", deep: "đậm", pale: "nhạt",
      red: "đỏ", blue: "xanh dương", green: "xanh lá", yellow: "vàng",
      black: "đen", white: "trắng", gray: "xám", grey: "xám",
      brown: "nâu", orange: "cam", pink: "hồng", purple: "tím",
      silver: "bạc", gold: "vàng kim", navy: "xanh navy", olive: "xanh olive",
      maroon: "đỏ thẫm", teal: "xanh mòng két", beige: "màu be", cream: "kem",
      peach: "hồng đào", cyan: "xanh lơ", bronze: "đồng", wood: "vân gỗ",
      rose: "hồng phấn", magenta: "đỏ vân anh", lavender: "tím oải hương", coral: "san hô",
      slate: "xám đá", rust: "đỏ gỉ", mint: "xanh bạc hà"
    };

    Object.keys(dictVI).forEach((key) => {
      result = result.replace(new RegExp(`\\b${key}\\b`, "g"), dictVI[key]);
    });

    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return text;
}
