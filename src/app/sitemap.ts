import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const projects = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...projects];
}
