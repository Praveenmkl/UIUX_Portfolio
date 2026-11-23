const PROJECT_ASSET_MODULES = import.meta.glob("../assets/**/*.webp", {
  eager: true,
  import: "default",
});

const RESUME_ASSET_MODULES = import.meta.glob("../assets/**/*.{pdf,doc,docx}", {
  eager: true,
  import: "default",
});

function findMatchingAssetEntries(keyword) {
  const needle = keyword.toLowerCase();
  return Object.entries(PROJECT_ASSET_MODULES)
    .filter(([assetPath]) => assetPath.toLowerCase().includes(needle))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));
}

function isThumbnailPath(assetPath) {
  const lower = assetPath.toLowerCase();
  return (
    lower.includes("thumb") ||
    lower.includes("thamb") ||
    lower.includes("cover")
  );
}

function pickThumbnailEntry(matches) {
  return (
    matches.find(([assetPath]) => isThumbnailPath(assetPath)) ??
    matches.find(([assetPath]) => !/\d+\.[a-z]+$/i.test(assetPath)) ??
    matches[0]
  );
}

function isResumeAssetPath(assetPath) {
  const lower = assetPath.toLowerCase();
  return lower.includes("resume") || lower.includes("cv");
}

/**
 * Resolve a single image URL by keyword from src/assets without failing builds when absent.
 */
export function resolveAssetByKeyword(keyword) {
  return pickThumbnailEntry(findMatchingAssetEntries(keyword))?.[1] ?? null;
}

/**
 * Resolve the bundled resume document URL and download filename from src/assets without failing if absent.
 */
export function resolveResumeAsset() {
  const docEntries = Object.entries(RESUME_ASSET_MODULES);
  const matchedEntry =
    docEntries.find(([assetPath]) => isResumeAssetPath(assetPath)) ??
    docEntries[0] ??
    Object.entries(PROJECT_ASSET_MODULES).find(([assetPath]) =>
      isResumeAssetPath(assetPath)
    );

  if (!matchedEntry) {
    return null;
  }

  const [assetPath, url] = matchedEntry;
  return {
    url,
    fileName: assetPath.split("/").pop() || "Praveen_Kalansooriya_Resume.pdf",
  };
}
