import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { field } from './utils';

export const app = new Elysia().use(staticPlugin());

app.get('/', (context) => (context.set.redirect = '/public/index.html'));

app.post('/messages', (context) => {
    return `<p>${(context.body as field).field}</p>`;
});
