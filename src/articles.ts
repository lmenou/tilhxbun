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

const ejs = require('ejs');
const path = require('path');

const prefix = import.meta.dir;

export interface Author {
    name: string;
}

export interface Article {
    updated: string;
    published: string;
    title: string;
    summary: string;
    author: Author[];
}

export function articles_list(articles: any) {
    const articles_list = { articles: articles.feed.entry };
    const html = ejs.renderFile(
        path.join(prefix, 'views', 'articles.ejs'),
        articles_list
    );
    return html;
}

export function storeArticles(articles: any) {
    const items = articles.feed.entry;
    let store: Article[] = [];
    for (const item of items) {
        const article: Article = {
            updated: item.updated,
            published: item.published,
            title: item.title,
            summary: item.summary,
            author: item.author,
        };
        store.push(article);
    }
    return store;
}
