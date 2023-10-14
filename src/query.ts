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

export interface CustomFormData {
    author: string;
}

export interface QueryPrefix {
    au: string;
}

export const query_prefix = {
    author: 'all',
};

const QUERY_URL = 'http://export.arxiv.org/api/query';

export function queryMaker(formData: CustomFormData): URL {
    let query: URL = new URL(QUERY_URL);
    let search_query = searchQueryMaker(formData);
    query.searchParams.append('search_query', search_query);
    return query;
}

function searchQueryMaker(formData: CustomFormData): string {
    let search_query: string = '';
    search_query += `${query_prefix.author}:${formData.author}`;
    return search_query;
}
