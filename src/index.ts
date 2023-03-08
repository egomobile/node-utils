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

type TickFunc<TResult> = (resolve: (result: TResult | PromiseLike<TResult>) => void, reject: (reason?: any) => void) => void;

/**
 * Executes an actions in background.
 *
 * @param {Function} action The action to invoke.
 * @param {any[]} [args] One or more arguments for the action.
 *
 * @returns {Promise<TResult>} The promise with the result of the action.
 */
export function tick<TResult extends any = any>(
    action: (...args: any[]) => TResult | PromiseLike<TResult>,
    ...args: any[]
): Promise<TResult> {
    if (typeof action !== "function") {
        throw new TypeError("func is no function");
    }

    let tickFunc: TickFunc<TResult>;
    if (action.constructor.name === "AsyncFunction") {
        tickFunc = (resolve, reject) => {
            try {
                (action(...args) as any)
                    .then(resolve)
                    .catch(reject);
            }
            catch (ex) {
                reject(ex);
            }
        };
    }
    else {
        tickFunc = (resolve, reject) => {
            try {
                resolve(action(...args) as any);
            }
            catch (ex) {
                reject(ex);
            }
        };
    }

    return new Promise<TResult>((resolve, reject) => {
        try {
            process.nextTick(() => {
                tickFunc(resolve, reject);
            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}

export * from "./io";
export * from "./utils";
