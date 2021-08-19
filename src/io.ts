// This file is part of the @egomobile/node-utils distribution.
// Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
//
// @egomobile/node-utils is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, version 3.
//
// @egomobile/node-utils is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

/**
 * Reads all remaining data from a stream and returns it as one buffer.
 *
 * @param {NodeJS.ReadableStream} stream The stream.
 * @param {BufferEncoding} [encoding] The custom encoding, if each chunk is a string.
 *
 * @example
 * ```
 * import fs from 'fs';
 *
 * const stream = fs.createReadStream('/path/to/my/file.json');
 *
 * const allData: Buffer = await readStream(stream);
 * ```
 *
 * @returns {Promise<Buffer>} The promise with the buffer.
 */
export function readStream(stream: NodeJS.ReadableStream, encoding: BufferEncoding = 'utf8'): Promise<Buffer> {
    const allChunks: Buffer[] = [];

    return new Promise<Buffer>((resolve, reject) => {
        stream.once('error', reject);

        stream.on('data', (chunk: Buffer) => {
            try {
                allChunks.push(chunk);
            } catch (error) {
                reject(error);
            }
        });

        stream.once('end', () => {
            try {
                resolve(Buffer.concat(allChunks));
            } catch (error) {
                reject(error);
            }
        });
    });
}
