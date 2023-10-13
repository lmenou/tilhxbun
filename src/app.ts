/*
 * This file is part of the webarx web application server
 * Copyright (C) 2023 lmenou
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { XMLParser } from 'fast-xml-parser';

import { CustomFormData } from './query';
import { queryMaker } from './query';

export const app = new Elysia().use(staticPlugin());

app.get('/', (context) => (context.set.redirect = '/public/index.html'));

app.post('/query', (context) => {
    const query: URL = queryMaker(context.body as CustomFormData);
    console.log(query);
    fetch(query)
        .then((response) => response.text())
        .then((data) => {
            const parser = new XMLParser();
            let result = parser.parse(data);
        });
    return `<p>${(context.body as CustomFormData).author}</p>`;
});
