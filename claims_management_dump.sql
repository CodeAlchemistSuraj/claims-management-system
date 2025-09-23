--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: generate_claim_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_claim_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.claim_id := 'CLM' || EXTRACT(YEAR FROM CURRENT_DATE) || LPAD(NEXTVAL('claim_id_seq')::TEXT, 3, '0');
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_claim_id() OWNER TO postgres;

--
-- Name: generate_employee_code(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_employee_code() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Generate random 4 digits and ensure it starts with 1010
    NEW.employee_code := '1010' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM users WHERE employee_code = NEW.employee_code) LOOP
        NEW.employee_code := '1010' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    END LOOP;
    
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.generate_employee_code() OWNER TO postgres;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bill_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill_details (
    id integer NOT NULL,
    claim_id integer NOT NULL,
    bill_type character varying(50) NOT NULL,
    invoice_no character varying(50) NOT NULL,
    bill_date date NOT NULL,
    bill_amount numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bill_details OWNER TO postgres;

--
-- Name: bill_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bill_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_details_id_seq OWNER TO postgres;

--
-- Name: bill_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bill_details_id_seq OWNED BY public.bill_details.id;


--
-- Name: bill_line_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bill_line_item (
    id bigint NOT NULL,
    bill_type character varying(255),
    invoice_no character varying(255),
    date date,
    amount double precision,
    claim_id bigint
);


ALTER TABLE public.bill_line_item OWNER TO postgres;

--
-- Name: bill_line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bill_line_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bill_line_item_id_seq OWNER TO postgres;

--
-- Name: bill_line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bill_line_item_id_seq OWNED BY public.bill_line_item.id;


--
-- Name: claim; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.claim (
    id bigint NOT NULL,
    sr_no integer,
    claim_count integer,
    year integer,
    patient_name character varying(255),
    hospital_name character varying(255),
    covered_in character varying(255),
    disease_name character varying(255),
    date_of_admission date,
    date_of_discharge date,
    number_of_days_stay integer,
    claim_amount double precision,
    room_rent_amount double precision,
    non_payable_amount double precision,
    payable_amount double precision,
    user_id bigint,
    status character varying(50) DEFAULT 'SUBMITTED'::character varying,
    approver_username character varying(255),
    approval_date timestamp without time zone
);


ALTER TABLE public.claim OWNER TO postgres;

--
-- Name: claim_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.claim_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.claim_id_seq OWNER TO postgres;

--
-- Name: claim_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.claim_id_seq OWNED BY public.claim.id;


--
-- Name: claims; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.claims (
    id bigint NOT NULL,
    sr_no integer NOT NULL,
    claim_id character varying(20) NOT NULL,
    user_id character varying(10),
    year integer NOT NULL,
    patient_type character varying(20) NOT NULL,
    hospital_name character varying(255) NOT NULL,
    coverage_type character varying(50) NOT NULL,
    disease_name character varying(255) NOT NULL,
    date_of_admission date NOT NULL,
    date_of_discharge date NOT NULL,
    days_stay integer NOT NULL,
    claim_amount numeric(12,2) NOT NULL,
    room_rent_amount numeric(12,2) NOT NULL,
    non_payable_amount numeric(12,2) NOT NULL,
    payable_amount numeric(12,2) NOT NULL,
    status character varying(20) DEFAULT 'Pending'::character varying,
    approver_username character varying(255),
    approval_date timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.claims OWNER TO postgres;

--
-- Name: claims_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.claims_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.claims_id_seq OWNER TO postgres;

--
-- Name: claims_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.claims_id_seq OWNED BY public.claims.id;


--
-- Name: employee_code_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employee_code_seq
    START WITH 1010000
    INCREMENT BY 1
    MINVALUE 1010000
    MAXVALUE 10109999
    CACHE 1;


ALTER SEQUENCE public.employee_code_seq OWNER TO postgres;

--
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO postgres;

--
-- Name: user_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_sessions (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    session_token character varying(255) NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_sessions OWNER TO postgres;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_sessions_id_seq OWNER TO postgres;

--
-- Name: user_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_sessions_id_seq OWNED BY public.user_sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    type character varying(20) NOT NULL,
    dob date NOT NULL,
    spouse_name character varying(100),
    spouse_dob date,
    start_date date NOT NULL,
    end_date date,
    is_alive boolean DEFAULT true,
    expiry_date date,
    lifetime_used numeric(10,2) DEFAULT 0.00,
    annual_used numeric(10,2) DEFAULT 0.00,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    employee_code character varying(10),
    role character varying(20) DEFAULT 'USER'::character varying,
    department character varying(100)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: bill_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_details ALTER COLUMN id SET DEFAULT nextval('public.bill_details_id_seq'::regclass);


--
-- Name: bill_line_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_line_item ALTER COLUMN id SET DEFAULT nextval('public.bill_line_item_id_seq'::regclass);


--
-- Name: claim id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claim ALTER COLUMN id SET DEFAULT nextval('public.claim_id_seq'::regclass);


--
-- Name: claims id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claims ALTER COLUMN id SET DEFAULT nextval('public.claims_id_seq'::regclass);


--
-- Name: user_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions ALTER COLUMN id SET DEFAULT nextval('public.user_sessions_id_seq'::regclass);


--
-- Data for Name: bill_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill_details (id, claim_id, bill_type, invoice_no, bill_date, bill_amount, created_at) FROM stdin;
\.


--
-- Data for Name: bill_line_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bill_line_item (id, bill_type, invoice_no, date, amount, claim_id) FROM stdin;
1	Consultation	INV-001	2024-01-15	1500	7
2	Medicines	INV-002	2024-01-16	2500	7
3	Room Rent	INV-003	2024-01-17	5000	7
4	Lab Tests	INV-004	2024-02-10	1800	8
5	Surgery	INV-005	2024-02-11	15000	8
\.


--
-- Data for Name: claim; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.claim (id, sr_no, claim_count, year, patient_name, hospital_name, covered_in, disease_name, date_of_admission, date_of_discharge, number_of_days_stay, claim_amount, room_rent_amount, non_payable_amount, payable_amount, user_id, status, approver_username, approval_date) FROM stdin;
7	1	1	2024	John Smith	General Hospital	\N	\N	\N	\N	\N	5000	\N	\N	4500	123456	APPROVED	\N	\N
8	2	2	2024	John Smith	City Hospital	\N	\N	\N	\N	\N	3000	\N	\N	2800	123456	SUBMITTED	\N	\N
\.


--
-- Data for Name: claims; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.claims (id, sr_no, claim_id, user_id, year, patient_type, hospital_name, coverage_type, disease_name, date_of_admission, date_of_discharge, days_stay, claim_amount, room_rent_amount, non_payable_amount, payable_amount, status, approver_username, approval_date, created_at, updated_at) FROM stdin;
1	1	CLM2025004	123456	2025	Self	Apollo Hospital	CGHS	Cardiac Surgery	2025-01-10	2025-01-15	5	100000.00	10000.00	5000.00	95000.00	Approved	\N	\N	2025-09-23 23:25:33.096476	2025-09-23 23:25:33.096476
2	2	CLM2025005	123456	2025	Spouse	Max Hospital	CGHS	Arthroscopy	2025-02-01	2025-02-03	2	50000.00	5000.00	2000.00	48000.00	Pending	\N	\N	2025-09-23 23:25:33.096476	2025-09-23 23:25:33.096476
3	3	CLM2025006	789012	2025	Self	Fortis Hospital	CGHS	Fever	2025-03-05	2025-03-07	2	25000.00	3000.00	1000.00	24000.00	Approved	\N	\N	2025-09-23 23:25:33.096476	2025-09-23 23:25:33.096476
\.


--
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) FROM stdin;
1	1	<< Flyway Baseline >>	BASELINE	<< Flyway Baseline >>	\N	null	2025-09-08 17:42:15.03583	0	t
2	2	add claim status	SQL	V2__add_claim_status.sql	893656684	postgres	2025-09-08 17:51:19.319829	44	t
\.


--
-- Data for Name: user_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_sessions (id, user_id, session_token, expires_at, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, type, dob, spouse_name, spouse_dob, start_date, end_date, is_alive, expiry_date, lifetime_used, annual_used, username, password, created_at, updated_at, employee_code, role, department) FROM stdin;
789012	Alice Doe	member	1985-11-25	\N	\N	2010-03-10	\N	t	2030-11-25	5000.00	200.00	alice.doe	$2a$08$fX9gpEWVIFgvQCYOnP.siefL8.zwVvGbP/H3XzqC8kyqmdfCZgSWG	2025-09-22 11:48:59.090963	2025-09-22 11:48:59.090963	10109504	USER	IT
123456	John Smith	pensioner	1960-05-15	Jane Smith	1962-09-20	2000-01-01	\N	t	2050-12-31	15000.00	500.00	john.smith	$2a$10$.PLopWsV/11JY2B0GwkbS.5OaHfLUrDdviY1CrGWutCfNO8Nc1unK	2025-09-22 11:48:59.090963	2025-09-22 11:48:59.090963	10106663	ADMIN	Retired
\.


--
-- Name: bill_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bill_details_id_seq', 24, true);


--
-- Name: bill_line_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bill_line_item_id_seq', 5, true);


--
-- Name: claim_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.claim_id_seq', 8, true);


--
-- Name: claims_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.claims_id_seq', 3, true);


--
-- Name: employee_code_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employee_code_seq', 1010000, false);


--
-- Name: user_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sessions_id_seq', 1, false);


--
-- Name: bill_details bill_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_details
    ADD CONSTRAINT bill_details_pkey PRIMARY KEY (id);


--
-- Name: bill_line_item bill_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_line_item
    ADD CONSTRAINT bill_line_item_pkey PRIMARY KEY (id);


--
-- Name: claim claim_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_pkey PRIMARY KEY (id);


--
-- Name: claims claims_claim_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT claims_claim_id_key UNIQUE (claim_id);


--
-- Name: claims claims_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (id);


--
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- Name: user_sessions idx_session_token; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT idx_session_token UNIQUE (session_token);


--
-- Name: user_sessions user_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_employee_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_employee_code_key UNIQUE (employee_code);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- Name: idx_bill_claim; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bill_claim ON public.bill_details USING btree (claim_id);


--
-- Name: claims generate_claim_id_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER generate_claim_id_trigger BEFORE INSERT ON public.claims FOR EACH ROW EXECUTE FUNCTION public.generate_claim_id();


--
-- Name: users generate_employee_code_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER generate_employee_code_trigger BEFORE INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.generate_employee_code();


--
-- Name: bill_line_item bill_line_item_claim_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bill_line_item
    ADD CONSTRAINT bill_line_item_claim_id_fkey FOREIGN KEY (claim_id) REFERENCES public.claim(id);


--
-- Name: claim claim_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.claim
    ADD CONSTRAINT claim_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_sessions user_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_sessions
    ADD CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

