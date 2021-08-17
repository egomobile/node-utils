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

import fs from 'fs';
import path from 'path';
import { readStream } from '..';

const testFile = path.join(__dirname, 'test.txt');

describe('readStream function', () => {
    it('should read the whole data from test.txt as buffer', async () => {
        const stat = await fs.promises.stat(testFile);
        const stream = fs.createReadStream(testFile);

        const data = await readStream(stream);

        expect(Buffer.isBuffer(data)).toBe(true);
        expect(data.length).toBe(stat.size);
    });
});
