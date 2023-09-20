import { serve, file } from 'bun';
import { files } from './files/files';

serve({
    async fetch(req) {
        if (req.method == 'GET') {
            let fileName = new URL(req.url).pathname;
            if (fileName == '/') {
                fileName = fileName + 'index.html';
            }
            const relativeFileName: string = files(fileName);
            return new Response(file(relativeFileName));
        }

        if (req.method == 'POST') {
            const result = await req.formData();
            return new Response([`<p>${result.get("q")}</p>`]);
        }

        return new Response(null);
    },
    error() {
        return new Response(null, { status: 404 });
    },
});
