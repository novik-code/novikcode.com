-- DensFlow Orders — tracks PayU payments for lifetime licenses
CREATE TABLE IF NOT EXISTS densflow_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES densflow_leads(id) ON DELETE SET NULL,
    payu_order_id TEXT,
    ext_order_id TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled', 'refunded')),
    amount INTEGER NOT NULL DEFAULT 999900, -- 9999.00 PLN in grosze
    currency TEXT NOT NULL DEFAULT 'PLN',
    buyer_email TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT,
    payu_status TEXT, -- raw PayU status: PENDING, WAITING_FOR_CONFIRMATION, COMPLETED, CANCELED
    payu_payload JSONB, -- last webhook payload
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for webhook lookups
CREATE INDEX IF NOT EXISTS idx_densflow_orders_ext_order_id ON densflow_orders(ext_order_id);
CREATE INDEX IF NOT EXISTS idx_densflow_orders_payu_order_id ON densflow_orders(payu_order_id);

-- RLS
ALTER TABLE densflow_orders ENABLE ROW LEVEL SECURITY;
