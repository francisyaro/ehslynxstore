-- CREATE DATABASE TABLES FOR EHS LYNX AFRIK Supabase PostgreSQL Schema

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- CATALOG TABLES
-- =========================================================================

-- Brands
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    logo TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(100) NOT NULL,
    manufacturer_reference VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'actif' CHECK (status IN ('actif', 'inactif')),
    availability_status VARCHAR(50) DEFAULT 'disponible' CHECK (availability_status IN ('disponible', 'sur_commande', 'bientot')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dynamic Specifications
CREATE TABLE product_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    group_name VARCHAR(255) NOT NULL,
    spec_key VARCHAR(255) NOT NULL,
    spec_value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- QUOTE REQUESTS TABLES
-- =========================================================================

-- Table containing the Sequence for RFQ Numbers to ensure they are sequential
CREATE SEQUENCE rfq_number_seq START 1;

-- Quote Requests Main Table
CREATE TABLE quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference VARCHAR(50) NOT NULL UNIQUE,
    contact_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    delivery_location TEXT,
    desired_delivery_date DATE,
    preferred_contact_channel VARCHAR(50) CHECK (preferred_contact_channel IN ('formulaire', 'whatsapp', 'email')),
    general_comment TEXT,
    status VARCHAR(50) DEFAULT 'nouvelle' CHECK (status IN (
        'brouillon', 'nouvelle', 'en_qualification', 'informations_requises', 
        'affectee', 'consultation_fournisseur', 'offre_en_preparation', 
        'devis_transmis', 'relance_en_cours', 'acceptee', 'refusee', 
        'convertie_en_commande', 'cloturee', 'annulee'
    )),
    assigned_to VARCHAR(255),
    estimated_value DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'XOF',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Quote items list containing product snapshots (commercial protection)
CREATE TABLE quote_request_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_brand VARCHAR(100) NOT NULL,
    product_model VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    configuration VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Timeline activities logs
CREATE TABLE quote_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_request_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE NOT NULL,
    action VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,
    actor VARCHAR(255) NOT NULL DEFAULT 'Système',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- AUTOGENERATING THE CUSTOM REFERENCE (RFQ-YYYY-NNNNNN)
-- =========================================================================

CREATE OR REPLACE FUNCTION generate_rfq_reference()
RETURNS TRIGGER AS $$
DECLARE
    current_year INTEGER;
    next_seq INTEGER;
    formatted_ref VARCHAR(50);
BEGIN
    current_year := EXTRACT(YEAR FROM CURRENT_TIMESTAMP)::INTEGER;
    SELECT nextval('rfq_number_seq') INTO next_seq;
    formatted_ref := 'RFQ-' || current_year || '-' || LTRIM(TO_CHAR(next_seq, '000000'));
    NEW.reference := formatted_ref;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger executing before inserting a new RFQ row
CREATE TRIGGER tr_generate_rfq_reference
BEFORE INSERT ON quote_requests
FOR EACH ROW
WHEN (NEW.reference IS NULL OR NEW.reference = '')
EXECUTE FUNCTION generate_rfq_reference();

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_request_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_activity_logs ENABLE ROW LEVEL SECURITY;

-- 1. Catalog Read Access (Public)
CREATE POLICY "Public Read Access on Brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Products" ON products FOR SELECT USING (status = 'actif');
CREATE POLICY "Public Read Access on Specifications" ON product_specifications FOR SELECT USING (true);

-- 2. Quote Insertion (Public)
CREATE POLICY "Anonymous Insertion on Quote Requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anonymous Insertion on Quote Items" ON quote_request_items FOR INSERT WITH CHECK (true);

-- 3. Customer Own Data View (Filtered by Email)
CREATE POLICY "Client read their own quotes" ON quote_requests FOR SELECT 
    USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR email = current_user);

-- 4. Admin Management Full Access
-- (Assuming 'sales_agent' or 'admin' roles configured in user metadata)
CREATE POLICY "Admin full access on Quote Requests" ON quote_requests FOR ALL 
    USING (coalesce(current_setting('request.jwt.claims', true)::json->>'role', '') IN ('admin', 'sales_agent', 'sales_manager'));

CREATE POLICY "Admin full access on Quote Items" ON quote_request_items FOR ALL 
    USING (true);

CREATE POLICY "Admin full access on Activity Logs" ON quote_activity_logs FOR ALL 
    USING (true);
