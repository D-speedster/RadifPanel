// Persian to English transliteration and slug generator
// Converts Persian/Arabic letters and digits to Latin equivalents and produces a URL-safe slug

const faToEnMap: Record<string, string> = {
  'ا': 'a', 'آ': 'a', 'أ': 'a', 'إ': 'e', 'ء': '', 'ئ': 'i', 'ؤ': 'o',
  'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's',
  'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh',
  'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh',
  'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z',
  'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q',
  'ک': 'k', 'گ': 'g', 'ك': 'k', // Arabic kaf
  'ل': 'l', 'م': 'm', 'ن': 'n',
  'و': 'o', 'ه': 'h', 'ی': 'y', 'ي': 'y', 'ۀ': 'e', 'ة': 'h',
  '‌': '-', // ZWNJ -> hyphen separator
}

const faDigitsMap: Record<string, string> = {
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
}

// Remove Arabic diacritics and combining marks
const removeDiacritics = (s: string) => s.replace(/[\u064B-\u0652]/g, '')

export function faToEnSlug(input: string): string {
  if (!input) return ''
  let s = input.normalize('NFKD')

  // Replace Persian/Arabic digits
  s = s.replace(/[۰-۹]/g, (d) => faDigitsMap[d] || '')

  // Replace Persian/Arabic letters
  s = s.replace(/[اآأإءئؤبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیيكۀة‌]/g, (ch) => faToEnMap[ch] ?? '')

  // Remove remaining diacritics
  s = removeDiacritics(s)

  // Replace any non-alphanumeric with hyphen
  s = s.replace(/[^a-zA-Z0-9]+/g, '-')

  // Collapse multiple hyphens and trim
  s = s.replace(/^-+|-+$/g, '').replace(/-+/g, '-')

  return s.toLowerCase()
}

export function slugify(input: string): string {
  if (!input) return ''
  // Basic ASCII slugify for non-Persian input
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
    .toLowerCase()
}