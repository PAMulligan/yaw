// server
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.dev.vars' });

const { string: stgSubmitUrl, string: stgCheckStatusUrl, string: stgSecret } = process.env;

export async function stgSubmit<T>(keyphrase: string) {
    if (stgSubmitUrl && stgSecret) {
        const response = await fetch(stgSubmitUrl, {
                method: 'POST',
                body: JSON.stringify({ content: keyphrase }),
                headers: {
                    'apy-token': stgSecret,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            }
        )

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json() as T;
    };
}

export async function stgCheckStatus<T>(jobId: string) {
    if (stgCheckStatusUrl && jobId && stgSecret) {
        const response = await fetch(stgCheckStatusUrl + jobId, {
            method: 'GET',
            headers: {
                'apy-token': stgSecret,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return await response.json() as T;
    }
}