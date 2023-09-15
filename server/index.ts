import { serve, file } from 'bun';
import path from 'path';

serve({
  fetch(req) {
      if(req.url.endsWith("/") == true) {
          const header = new Headers();
          header.append("Content-Type", "text/html");
          const dest = path.join(import.meta.dir, '/', '..', 'client', 'index.html');
          const resp = new Response(file(dest), { headers: header });
          return resp;
      } else {
          return new Response('404!')
      }
  },
});
