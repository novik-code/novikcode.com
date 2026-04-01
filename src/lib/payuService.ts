/**
 * PayU REST API v2.1 — Simplified service for DensFlow landing page.
 *
 * Authentication: OAuth2 client_credentials → Bearer token
 * Sandbox:    https://secure.snd.payu.com
 * Production: https://secure.payu.com
 */

import { createHash } from 'crypto';

export interface PayUConfig {
    posId: string;
    clientId: string;
    clientSecret: string;
    secondKey: string;
    sandbox: boolean;
}

function getBaseUrl(sandbox: boolean): string {
    return sandbox ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';
}

export function getPayUConfig(): PayUConfig {
    const posId = process.env.PAYU_POS_ID;
    const clientId = process.env.PAYU_CLIENT_ID;
    const clientSecret = process.env.PAYU_CLIENT_SECRET;
    const secondKey = process.env.PAYU_SECOND_KEY;
    const sandbox = process.env.PAYU_SANDBOX === 'true';

    if (!posId || !clientId || !clientSecret || !secondKey) {
        throw new Error('PayU credentials not configured (PAYU_POS_ID, PAYU_CLIENT_ID, PAYU_CLIENT_SECRET, PAYU_SECOND_KEY)');
    }

    return { posId, clientId, clientSecret, secondKey, sandbox };
}

/**
 * Get OAuth2 Bearer token from PayU.
 */
async function getToken(config: PayUConfig): Promise<string> {
    const baseUrl = getBaseUrl(config.sandbox);
    const res = await fetch(`${baseUrl}/pl/standard/user/oauth/authorize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: config.clientId,
            client_secret: config.clientSecret,
        }),
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`PayU OAuth failed: ${err}`);
    }
    const data = await res.json();
    return data.access_token;
}

/**
 * Verify PayU webhook signature.
 * PayU sends OpenPayU-Signature header: sender=checkout;signature=HASH;algorithm=MD5
 */
export function verifyPayUSignature(body: string, header: string, secondKey: string): boolean {
    const signatureMatch = header.match(/signature=([^;]+)/);
    if (!signatureMatch) return false;
    const receivedSig = signatureMatch[1];
    const expectedSig = createHash('md5').update(body + secondKey).digest('hex');
    return receivedSig === expectedSig;
}

interface CreateOrderParams {
    orderId: string;      // our internal order ID
    description: string;
    amount: number;       // in grosze (999900 = 9999.00 PLN)
    buyerEmail: string;
    buyerFirstName: string;
    buyerLastName: string;
    buyerPhone: string;
    continueUrl: string;  // redirect after payment
    notifyUrl: string;    // webhook URL
}

interface PayUOrderResult {
    redirectUri: string;
    orderId: string;
    extOrderId: string;
}

/**
 * Create a PayU order and return the redirect URL for the buyer.
 */
export async function createPayUOrder(params: CreateOrderParams): Promise<PayUOrderResult> {
    const config = getPayUConfig();
    const token = await getToken(config);
    const baseUrl = getBaseUrl(config.sandbox);

    const orderBody = {
        notifyUrl: params.notifyUrl,
        continueUrl: params.continueUrl,
        customerIp: '127.0.0.1', // Required by PayU but not critical for checkout
        merchantPosId: config.posId,
        description: params.description,
        currencyCode: 'PLN',
        totalAmount: String(params.amount),
        extOrderId: params.orderId,
        buyer: {
            email: params.buyerEmail,
            firstName: params.buyerFirstName,
            lastName: params.buyerLastName,
            phone: params.buyerPhone,
            language: 'pl',
        },
        products: [
            {
                name: 'DensFlow.Ai — Licencja Dożywotnia',
                unitPrice: String(params.amount),
                quantity: '1',
            },
        ],
    };

    const res = await fetch(`${baseUrl}/api/v2_1/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderBody),
        redirect: 'manual', // PayU returns 302 redirect
    });

    // PayU returns 302 with Location header containing the redirectUri
    if (res.status === 302) {
        const location = res.headers.get('location');
        if (!location) throw new Error('PayU returned 302 but no Location header');

        // Parse orderId from the redirect URL
        const payuOrderId = new URL(location).searchParams.get('orderId') || '';

        return {
            redirectUri: location,
            orderId: payuOrderId,
            extOrderId: params.orderId,
        };
    }

    // If not 302, PayU returned a JSON response (likely success with redirect in body)
    if (res.ok || res.status === 201) {
        const data = await res.json();
        return {
            redirectUri: data.redirectUri,
            orderId: data.orderId,
            extOrderId: params.orderId,
        };
    }

    const errText = await res.text();
    throw new Error(`PayU create order failed (${res.status}): ${errText}`);
}
