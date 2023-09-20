import path from 'path';

const BASE_PATH: string = '../client';
const CLIENT_DIR: Record<string, string> = {
    '.html': BASE_PATH,
    '.css': BASE_PATH,
    '.js': path.join(BASE_PATH, 'javascript'),
    '.ico': path.join(BASE_PATH, 'assets'),
};

export const files = (fileName: string) => {
    let dotoffset: number = fileName.toString().lastIndexOf('.');
    const extension = fileName.slice(dotoffset);
    return path.join(CLIENT_DIR[extension] + fileName);
};
