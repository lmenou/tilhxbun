import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { Field } from './utils';
import { query_prefix } from './utils';
import { XMLParser } from 'fast-xml-parser';

const QUERY_URL = new URL('http://export.arxiv.org/api/query');

function build(field: Field): string {
    const query: string = `${query_prefix.author}:${field.author}`;
    return query;
}

export const app = new Elysia().use(staticPlugin());

app.get('/', (context) => (context.set.redirect = '/public/index.html'));

app.post('/arxiv_query', (context) => {
    let query = QUERY_URL;
    let res = build(context.body as Field);
    query.searchParams.append('search_query', res);
    query.searchParams.append('start', '0');
    query.searchParams.append('max_result', '10');
    fetch(query)
        .then((response) => response.text())
        .then((data) => {
            const parser = new XMLParser();
            let jObj = parser.parse(data);
            console.log(jObj);
        });
    return `<p>${(context.body as Field).author}</p>`;
});
