export const SITE = "https://www.kaamkar.com";

export const SOCIAL = {
  youtube: "https://www.youtube.com/@sykkmeuzzik546",
  x: "https://x.com/kaamkarpk",
  instagram: "https://www.instagram.com/kaamkar.pk",
  facebook: "https://www.facebook.com/kaamkarpk",
  linkedin: "https://www.linkedin.com/company/kaamkar",
};

export function jobSlug(title: string, city: string) {
  return `${title}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
