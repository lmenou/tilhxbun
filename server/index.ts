import { serve, file } from "bun";
import path from "path";

const BASE_PATH: string = "../client";
const CLIENT_DIR: Record<string, string> = {
  ".html": BASE_PATH,
  ".css": BASE_PATH,
  ".js": path.join(BASE_PATH, "javascript"),
  ".ico": path.join(BASE_PATH, "assets"),
};

const file_serving = (fileName: string) => {
  let dotoffset: number = fileName.toString().lastIndexOf(".");
  const extension = fileName.slice(dotoffset);
  return path.join(CLIENT_DIR[extension] + fileName);
};

serve({
  async fetch(req) {
    let fileName = new URL(req.url).pathname;
    if (fileName == "/") {
      fileName = fileName + "index.html";
    }
    const relativeFileName: string = file_serving(fileName);
    console.log(relativeFileName);
    return new Response(file(relativeFileName));
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
