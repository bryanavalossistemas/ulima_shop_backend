PGDMP  /                    |            ulima_store    16.3    16.3 +               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    40996    ulima_store    DATABASE     ~   CREATE DATABASE ulima_store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE ulima_store;
                postgres    false            �            1259    42150    DetailOrder    TABLE     �   CREATE TABLE public."DetailOrder" (
    id integer NOT NULL,
    quantity integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer,
    "orderId" integer
);
 !   DROP TABLE public."DetailOrder";
       public         heap    postgres    false            �            1259    42149    DetailOrder_id_seq    SEQUENCE     �   CREATE SEQUENCE public."DetailOrder_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."DetailOrder_id_seq";
       public          postgres    false    224                       0    0    DetailOrder_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."DetailOrder_id_seq" OWNED BY public."DetailOrder".id;
          public          postgres    false    223            �            1259    42113    Order    TABLE     �  CREATE TABLE public."Order" (
    id integer NOT NULL,
    district character varying(255),
    city character varying(255),
    country character varying(255),
    "cardNumber" character varying(255),
    "nameOnCard" character varying(255),
    "paymentMethod" character varying(255),
    expiration character varying(255),
    "shippingMethod" character varying(255),
    ccv character varying(255),
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    "firstDirection" character varying(255),
    "secondDirection" character varying(255)
);
    DROP TABLE public."Order";
       public         heap    postgres    false            �            1259    42112    Order_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Order_id_seq";
       public          postgres    false    218                       0    0    Order_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;
          public          postgres    false    217            �            1259    42136    Product    TABLE     �  CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    feature character varying(255),
    brand character varying(255),
    type character varying(255),
    image character varying(255),
    active boolean,
    price double precision,
    stock integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "serieId" integer
);
    DROP TABLE public."Product";
       public         heap    postgres    false            �            1259    42135    Product_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Product_id_seq";
       public          postgres    false    222                       0    0    Product_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;
          public          postgres    false    221            �            1259    42127    Serie    TABLE     
  CREATE TABLE public."Serie" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    image character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Serie";
       public         heap    postgres    false            �            1259    42126    Serie_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Serie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Serie_id_seq";
       public          postgres    false    220                       0    0    Serie_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Serie_id_seq" OWNED BY public."Serie".id;
          public          postgres    false    219            �            1259    42103    User    TABLE     �  CREATE TABLE public."User" (
    id integer NOT NULL,
    "firstName" character varying(255),
    "lastName" character varying(255),
    email character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'Usuario'::character varying,
    active boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    42102    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    216                       0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            j           2604    42153    DetailOrder id    DEFAULT     t   ALTER TABLE ONLY public."DetailOrder" ALTER COLUMN id SET DEFAULT nextval('public."DetailOrder_id_seq"'::regclass);
 ?   ALTER TABLE public."DetailOrder" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    224    224            g           2604    42116    Order id    DEFAULT     h   ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);
 9   ALTER TABLE public."Order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            i           2604    42139 
   Product id    DEFAULT     l   ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);
 ;   ALTER TABLE public."Product" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            h           2604    42130    Serie id    DEFAULT     h   ALTER TABLE ONLY public."Serie" ALTER COLUMN id SET DEFAULT nextval('public."Serie_id_seq"'::regclass);
 9   ALTER TABLE public."Serie" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            d           2604    42106    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    42150    DetailOrder 
   TABLE DATA           g   COPY public."DetailOrder" (id, quantity, "createdAt", "updatedAt", "productId", "orderId") FROM stdin;
    public          postgres    false    224   35                 0    42113    Order 
   TABLE DATA           �   COPY public."Order" (id, district, city, country, "cardNumber", "nameOnCard", "paymentMethod", expiration, "shippingMethod", ccv, status, "createdAt", "updatedAt", "userId", "firstDirection", "secondDirection") FROM stdin;
    public          postgres    false    218   �5                 0    42136    Product 
   TABLE DATA           �   COPY public."Product" (id, name, description, feature, brand, type, image, active, price, stock, "createdAt", "updatedAt", "serieId") FROM stdin;
    public          postgres    false    222   �6                 0    42127    Serie 
   TABLE DATA           Y   COPY public."Serie" (id, name, description, image, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   �7       	          0    42103    User 
   TABLE DATA           v   COPY public."User" (id, "firstName", "lastName", email, password, role, active, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   @9                  0    0    DetailOrder_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."DetailOrder_id_seq"', 6, true);
          public          postgres    false    223                       0    0    Order_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Order_id_seq"', 4, true);
          public          postgres    false    217                       0    0    Product_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Product_id_seq"', 3, true);
          public          postgres    false    221                        0    0    Serie_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Serie_id_seq"', 6, true);
          public          postgres    false    219            !           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 1, true);
          public          postgres    false    215            t           2606    42155    DetailOrder DetailOrder_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."DetailOrder"
    ADD CONSTRAINT "DetailOrder_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."DetailOrder" DROP CONSTRAINT "DetailOrder_pkey";
       public            postgres    false    224            n           2606    42120    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            postgres    false    218            r           2606    42143    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            postgres    false    222            p           2606    42134    Serie Serie_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Serie"
    ADD CONSTRAINT "Serie_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Serie" DROP CONSTRAINT "Serie_pkey";
       public            postgres    false    220            l           2606    42111    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    216            w           2606    42839 $   DetailOrder DetailOrder_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DetailOrder"
    ADD CONSTRAINT "DetailOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."DetailOrder" DROP CONSTRAINT "DetailOrder_orderId_fkey";
       public          postgres    false    4718    218    224            x           2606    42834 &   DetailOrder DetailOrder_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."DetailOrder"
    ADD CONSTRAINT "DetailOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 T   ALTER TABLE ONLY public."DetailOrder" DROP CONSTRAINT "DetailOrder_productId_fkey";
       public          postgres    false    4722    224    222            u           2606    42824    Order Order_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_userId_fkey";
       public          postgres    false    4716    216    218            v           2606    42829    Product Product_serieId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES public."Serie"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_serieId_fkey";
       public          postgres    false    222    220    4720               r   x�}���0��g���p�Sf��s�RU))n^��'iS�Z߀F�g��>O�@`���V���c+�[�I���d�4~�����{"� [OL��O��{��;Y<~K��f>o7B�         �   x�}�MN�0���S���8N ��-*u���S�H�+��b��1UJD�f1?Oz�F��# <=�sH9K��>`,�l�F��R\c'G%��i��Xp�#�k�����Ҵs)~}��%Z���U'������9S�΅�W0������gj��s�y�e��4�e��+��s��n�i:T�bݍF����+��ft.�ȗs�Z����T����K�vp?�AȻ��'
ث`�}��B         "  x���Mn�0�9h0cc����RЍkb
j�r�R)R"UYD���4#}@>6^�yӓrfT���J'լ��f�d/�&a�]���r����ip"�ykJ��գo��nI��-�� {����^Ϩd��{�P@	Y*XI;B�_���7�r���%3�uXʲ]�� b�k5�Q������]���3b�O����؝~�p� �N��3��P���3V�,a��m�+��P��TNp��,�a�p�?�ş���ጝwiQ^�eF�F$�x���{S��3����J�d         K  x��ӻn�  ��9<E^ ���sߠk|	�����y�f�*[B]���_���glw&��.6������i+�Bas�sk�+l���j����m��AGdm:4�7�[�HAa���=If|���]����Μ(���児3���q��覥-}���q�e�u6��sZQ���f��ئe-{��$ȹE=���uSj�[�sZY1
	��.�i�A����s�mu��B�f��sڢ���e��Ħ�x�Vrd��3)>&Y��y-��EV���ܴ�o�*�Z�e?�4����~�Y�Ӫכ #eF�K� ~ C:m      	   s   x�3�t*�L��t,K��/�Lq��������b��������\΂������#����Ģ�|�4N##]3]CCCS+cK+c=sC]Sd)#C+C#+c=KsS�W� �C"f     