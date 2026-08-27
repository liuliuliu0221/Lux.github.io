import type { NextConfig } from "next";

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isGitHubProjectPage =
  Boolean(githubOwner && githubRepository) &&
  githubRepository.toLowerCase() !== `${githubOwner.toLowerCase()}.github.io`;
const publicBasePath = isGitHubProjectPage ? `/${githubRepository}` : "";

process.env.NEXT_PUBLIC_BASE_PATH = publicBasePath;
if (githubOwner && githubRepository) {
  process.env.NEXT_PUBLIC_SITE_URL ??= `https://${githubOwner}.github.io${publicBasePath}`;
}

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: publicBasePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default nextConfig;
