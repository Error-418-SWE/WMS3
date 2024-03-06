-- Elimina il database se esiste già
--DROP DATABASE IF EXISTS error418_DB;

-- Creazione del database
--CREATE DATABASE error418_DB WITH TEMPLATE = template0 ENCODING = 'UTF8';

--ALTER DATABASE error418_DB OWNER TO db_user;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;


-- Connessione al database appena creato
--\c error418_DB;


-- tabella category
CREATE TABLE public.category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

--ALTER TABLE public.category OWNER TO db_user;



-- tabella product
CREATE TABLE public.product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    weight REAL,
    width REAL NOT NULL,
    length REAL NOT NULL,
    height REAL NOT NULL
);

--ALTER TABLE public.product OWNER TO db_user;

-- tabella zone
CREATE TABLE public.zone (
    id SERIAL PRIMARY KEY,
    xCoordinate REAL NOT NULL,
    yCoordinate REAL NOT NULL,
    length REAL NOT NULL,
    orientation BOOLEAN NOT NULL
);

--ALTER TABLE public.zone OWNER TO db_user;


-- tabella column
CREATE TABLE public.zone_column (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
	column_order INTEGER NOT NULL,
    width REAL NOT NULL
);

--ALTER TABLE public.zone_column OWNER TO db_user;


-- tabella level
CREATE TABLE public.level (
    id SERIAL PRIMARY KEY,
    zone_id INTEGER REFERENCES public.zone(id) NOT NULL,
    level_order INTEGER NOT NULL,
    height REAL NOT NULL
);

--ALTER TABLE public.level OWNER TO db_user;


-- tabella bin
CREATE TABLE public.bin (
    id SERIAL PRIMARY KEY,
    level_id INTEGER REFERENCES public.level(id) NOT NULL,
    column_id INTEGER REFERENCES public.zone_column(id) NOT NULL,
    product_id INTEGER REFERENCES public.product(id)
);

--ALTER TABLE public.bin OWNER TO db_user;


-- table categorize
CREATE TABLE public.categorize (
category_id INTEGER REFERENCES public.category(id),
product_id INTEGER REFERENCES public.product(id),
PRIMARY KEY (category_id, product_id)
);

--ALTER TABLE public.categorize OWNER TO db_user;

-- insert prodotti
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Smartphone Samsung Galaxy S21', 0.2, 7.1, 15.8, 0.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Portatile Dell XPS 13', 1.2, 11.6, 7.8, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Stampante HP LaserJet Pro M404dn', 8.0, 15.0, 14.5, 8.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Mouse Logitech MX Master 3', 0.1, 3.4, 5.0, 1.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tastiera meccanica Corsair K95 RGB Platinum', 1.3, 18.3, 6.7, 1.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuffie Sony WH-1000XM4', 0.3, 7.7, 6.7, 2.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Smart TV LG OLED65CXPUA 65 pollici', 23.0, 57.0, 32.7, 9.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fotocamera Canon EOS R5', 0.7, 5.4, 3.9, 3.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Aspirapolvere Dyson V11 Absolute', 6.7, 9.8, 10.3, 5.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Forno a microonde Panasonic NN-SN67KS', 11.2, 20.7, 16.5, 12.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Smartwatch Apple Watch Series 6', 0.1, 3.3, 4.0, 1.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tablet Apple iPad Pro 12.9', 0.7, 8.4, 11.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Stampante Epson EcoTank ET-4760', 9.5, 16.4, 19.8, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Monitor gaming ASUS ROG Swift PG279Q', 7.0, 24.4, 14.5, 2.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante Bluetooth JBL Charge 4', 0.9, 8.6, 8.5, 21.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Console Sony PlayStation 5', 4.5, 39.0, 10.4, 26.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lettore eBook Kindle Paperwhite', 0.3, 6.6, 4.6, 0.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Videocamera di sorveglianza Arlo Pro 3', 0.3, 3.1, 1.9, 2.8);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina fotografica istantanea Fujifilm Instax Mini 11', 0.3, 4.2, 4.8, 2.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Robotic vacuum cleaner iRobot Roomba 960', 8.6, 13.8, 13.8, 3.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Drone DJI Mavic Air 2', 0.6, 7.2, 9.8, 3.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Stereo Bluetooth Bose SoundLink Revolve', 0.7, 3.6, 3.6, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Action camera GoPro Hero9 Black', 0.3, 2.8, 1.9, 1.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Proiettore Epson Home Cinema 3800', 15.2, 20.5, 17.7, 6.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuffie gaming SteelSeries Arctis 7', 0.4, 7.8, 7.4, 3.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè Nespresso VertuoPlus', 5.8, 8.3, 11.9, 11.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecamera per videoconferenza Logitech Brio', 0.1, 10.1, 2.2, 2.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Monitor LG UltraFine 4K 24 pollici', 3.3, 21.2, 15.2, 8.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Stampante fotografica portatile Canon IVY Mini', 0.2, 4.7, 3.2, 0.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sistema di sicurezza Ring Alarm 5 Piece Kit', 1.0, 10.6, 10.6, 2.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Rasoio elettrico Philips Norelco OneBlade', 0.2, 3.0, 1.0, 7.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scanner di documenti Epson WorkForce ES-50', 0.6, 10.7, 1.9, 1.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Proiettore portatile Anker Nebula Capsule II', 0.8, 3.1, 3.1, 5.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante smart Amazon Echo Dot (4th Gen)', 0.3, 3.9, 3.9, 3.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Videogioco Nintendo Switch', 0.3, 9.4, 4.0, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pulisci schermo per computer WHOOSH! Screen Shine', 0.1, 2.5, 2.5, 7.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Smartwatch Garmin Forerunner 945', 0.1, 1.9, 1.9, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Monitor Dell UltraSharp 27 4K USB-C', 6.5, 24.1, 21.3, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lettore multimediale Roku Ultra', 0.1, 4.9, 4.9, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Monitor da gioco MSI Optix MAG271CQR', 5.5, 24.1, 21.3, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Presa intelligente TP-Link Kasa Smart', 0.2, 2.8, 2.6, 1.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecomando universale Logitech Harmony Elite', 0.1, 2.1, 1.1, 7.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fotocamera per esterni Blink Outdoor', 0.1, 7.1, 7.1, 2.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo HDMI AmazonBasics', 0.1, 1.5, 1.5, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caricabatterie wireless Anker PowerWave Pad', 0.1, 3.9, 3.9, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sistema di altoparlanti Logitech Z623', 8.4, 17.3, 11.2, 10.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecomando Apple TV Siri Remote', 0.1, 1.5, 3.9, 0.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore USB-C Apple', 0.1, 3.9, 3.9, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Monitor Samsung Odyssey G9', 16.7, 48.2, 14.5, 19.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ricaricatore portatile Anker PowerCore', 0.3, 2.8, 2.8, 3.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di ricarica Anker PowerLine+', 0.1, 3.9, 3.9, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Router Wi-Fi ASUS RT-AX86U', 0.6, 8.8, 6.3, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Webcam Logitech C920 HD Pro', 0.1, 3.7, 1.7, 1.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Disco rigido esterno Samsung T7', 0.1, 3.3, 2.2, 0.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tastiera wireless Logitech K780', 0.9, 14.9, 6.2, 0.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Torcia LED tascabile Anker Bolder LC90', 0.2, 6.2, 6.2, 2.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Docking station per laptop Dell WD19', 1.0, 8.1, 3.5, 1.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Router Wi-Fi TP-Link Archer AX50', 0.4, 10.2, 5.3, 1.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore Lightning Apple', 0.1, 0.7, 0.7, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante Bluetooth Ultimate Ears BOOM 3', 0.6, 2.9, 2.9, 7.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Alimentatore USB Anker PowerPort', 0.1, 2.1, 2.1, 1.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Base di ricarica wireless Samsung Wireless Charger', 0.2, 3.5, 3.5, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Router Wi-Fi NETGEAR Nighthawk AX12', 0.9, 12.0, 7.5, 2.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante portatile JBL Flip 5', 0.5, 7.1, 7.1, 18.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecomando universale Logitech Harmony Companion', 0.1, 2.1, 1.1, 7.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Kit di ricarica wireless Anker PowerWave', 0.3, 4.1, 4.1, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Disco rigido esterno LaCie Rugged Mini', 0.2, 3.4, 3.4, 0.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore da USB-C a HDMI Anker', 0.1, 4.9, 4.9, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Filtro antiriflesso per monitor 3M', 0.1, 9.3, 9.3, 0.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di prolunga per alimentatore AmazonBasics', 0.2, 5.0, 5.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Webcam Razer Kiyo', 0.2, 3.7, 2.6, 1.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Router Wi-Fi e modem NETGEAR Nighthawk CAX80', 1.2, 12.0, 7.8, 6.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ricaricatore portatile Anker PowerCore Slim', 0.3, 3.9, 3.9, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ricaricatore da auto Anker PowerDrive', 0.1, 1.7, 1.7, 0.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Stazione di ricarica wireless Anker PowerWave', 0.2, 4.7, 4.7, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappetino di ricarica wireless Samsung Wireless Charger', 0.2, 11.9, 11.9, 0.3);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore USB-C HDMI VGA Ethernet Anker', 0.1, 2.8, 2.8, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante portatile Sony SRS-XB33', 0.9, 9.7, 9.7, 24.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di ricarica USB-C Anker PowerLine III', 0.1, 3.0, 3.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore Thunderbolt 3 Anker PowerExpand', 0.1, 3.1, 3.1, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ricaricatore da auto Aukey 36W', 0.1, 2.8, 2.8, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Hub USB Anker 4 porte', 0.1, 3.6, 3.6, 0.8);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante Bluetooth Sony SRS-XB43', 1.0, 10.3, 10.3, 25.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Alimentatore per laptop Anker PowerPort Atom', 0.2, 1.1, 1.1, 0.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Base di ricarica wireless Anker PowerWave Stand', 0.2, 3.9, 3.9, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caricabatterie portatile Aukey USB-C', 0.2, 2.8, 2.8, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecamera per videoconferenza Logitech MeetUp', 0.1, 15.7, 4.5, 4.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Router Wi-Fi Linksys MR9000', 0.6, 10.6, 10.6, 1.8);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Adattatore da USB-C a VGA Anker', 0.1, 2.5, 2.5, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante portatile Bose SoundLink Micro', 0.3, 9.8, 9.8, 3.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scheda SD SanDisk Extreme Pro', 0.1, 3.3, 3.3, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Hub USB-C Anker PowerExpand', 0.1, 4.6, 4.6, 0.8);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scheda microSD Samsung EVO Select', 0.1, 3.2, 3.2, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Batteria esterna Aukey USB-C PD', 0.2, 4.1, 4.1, 0.9);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di ricarica magnetico Anker PowerLine III', 0.1, 4.9, 4.9, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di prolunga HDMI AmazonBasics', 0.2, 6.6, 6.6, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Altoparlante portatile Ultimate Ears WONDERBOOM', 0.4, 3.7, 3.7, 10.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di ricarica USB Anker PowerLine II', 0.1, 3.0, 3.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Base di ricarica magnetica Anker PowerWave', 0.2, 3.9, 3.9, 0.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caricabatterie portatile Anker PowerCore Fusion', 0.2, 2.8, 2.8, 2.8);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Hub USB-C Anker PowerExpand+', 0.1, 4.8, 4.8, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cavo di ricarica USB Anker PowerLine+', 0.1, 3.0, 3.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecamera per videoconferenza Logitech Rally', 0.3, 11.6, 6.4, 5.4);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Smartwatch', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Videocamera 4K', 0.7, 5.0, 3.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Libro ""Il Signore degli Anelli""""', 0.8, 13.0, 20.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pentole antiaderenti', 5.0, 10.0, 10.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Gioiello Collana in argento', 0.05, 2.0, 2.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Vaso di fiori artificiali', 0.3, 6.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scarpe da corsa', 0.4, 8.0, 4.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa a tracolla in pelle', 0.6, 12.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telecomando universale', 0.1, 2.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuscino memory foam', 1.0, 18.0, 18.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Forno a microonde', 10.0, 20.0, 15.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ferro da stiro a vapore', 1.5, 10.0, 5.0, 4.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo a LED', 0.3, 6.0, 6.0, 12.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Abito elegante da uomo', 0.8, 15.0, 20.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 1000 pezzi', 0.6, 20.0, 30.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bicicletta da città', 15.0, 70.0, 150.0, 100.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tazza da caffè in ceramica', 0.2, 4.0, 4.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Laptop ultraleggero', 1.0, 12.0, 8.0, 0.7);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Action figure Spider-Man', 0.2, 3.0, 3.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cornice per foto in legno', 0.3, 5.0, 7.0, 9.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Coperta in pile morbida', 0.8, 50.0, 60.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fioriera da balcone', 1.0, 12.0, 12.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete silenzioso', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Penna stilografica di lusso', 0.1, 1.0, 1.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuscino massaggiante Shiatsu', 2.0, 15.0, 15.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino escursionistico impermeabile', 2.5, 30.0, 20.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia da ufficio ergonomica', 8.0, 24.0, 24.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuffie Bluetooth con cancellazione del rumore', 0.3, 8.0, 8.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Portafoglio in pelle con fermasoldi', 0.1, 4.0, 3.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Vestito da sera lungo', 0.6, 18.0, 20.0, 4.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Strumento musicale ukulele', 0.5, 8.0, 25.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tavolo da biliardo professionale', 300.0, 100.0, 200.0, 75.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Palla da calcio ufficiale', 0.4, 8.0, 8.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tostapane a fette larghe', 2.0, 10.0, 8.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('T-shirt a maniche corte', 0.2, 10.0, 12.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Trapano avvitatore a batteria', 1.5, 10.0, 5.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Collare per cani regolabile', 0.1, 2.0, 30.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Gioiello Anello di fidanzamento', 0.05, 1.0, 1.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Passeggino pieghevole leggero', 5.0, 20.0, 40.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tavolino da salotto moderno', 10.0, 50.0, 80.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ortofrutta mista di stagione', 5.0, 30.0, 40.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di chiavi a cricchetto', 2.0, 10.0, 3.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per picnic', 1.0, 15.0, 10.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cornice digitale con display HD', 0.4, 8.0, 10.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lavatrice carica frontale', 50.0, 60.0, 60.0, 85.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Filtro per acquario esterno', 0.8, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ventilatore da soffitto con luci', 2.0, 40.0, 40.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in acciaio inossidabile', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Gioco da tavolo Monopoly', 1.5, 20.0, 20.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Vaso per piante sospeso', 0.5, 8.0, 8.0, 12.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Aspirapolvere robot programmabile', 3.0, 12.0, 12.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Peluche orso di peluche gigante', 2.0, 30.0, 30.0, 50.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da polso analogico', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Frigorifero doppia porta', 60.0, 80.0, 80.0, 180.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Parrucca lunga riccia', 0.2, 8.0, 8.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina da caffè automatica', 5.0, 10.0, 8.0, 12.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto persiano tradizionale', 8.0, 120.0, 180.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tende oscuranti per finestre', 1.0, 80.0, 200.0, 0.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Chitarra acustica professionale', 2.0, 20.0, 40.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Portabiti a forma di albero', 2.0, 30.0, 30.0, 180.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Griglia a gas da esterno', 20.0, 100.0, 60.0, 90.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia pieghevole da campeggio', 2.0, 20.0, 20.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Televisore OLED 65 pollici', 30.0, 55.0, 35.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Trolley da viaggio leggero', 3.0, 40.0, 20.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino scuola con ruote', 2.0, 30.0, 20.0, 50.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Auricolari senza fili Bluetooth', 0.1, 3.0, 3.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per pranzo', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per trucco', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fotocamera istantanea polaroid', 0.5, 4.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Regolabarba professionale', 0.3, 3.0, 3.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scopa elettrica senza fili', 3.0, 10.0, 5.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico in pelle', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scarpe da ginnastica', 0.6, 8.0, 4.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuffia per nuoto impermeabile', 0.1, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa da palestra', 0.5, 15.0, 8.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tovaglia antimacchia', 0.3, 60.0, 90.0, 0.1);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pianta grassa in vaso', 0.5, 6.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Giocattolo per gatti con piume', 0.1, 3.0, 3.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pallone da basket', 0.6, 24.0, 24.0, 0.6);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia da giardino pieghevole', 2.0, 20.0, 20.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da spiaggia', 2.5, 180.0, 180.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate', 0.2, 2.0, 2.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caricabatterie portatile USB', 0.1, 3.0, 3.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Barattolo ermetico per alimenti', 0.3, 5.0, 5.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 500 pezzi', 0.4, 15.0, 15.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fioriera sospesa a parete', 1.0, 10.0, 5.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da tasca vintage', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Grembiule da cucina', 0.3, 20.0, 30.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cuscini per sedie', 1.0, 16.0, 16.0, 4.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per la pasta fresca', 5.0, 10.0, 8.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album musicale CD', 0.1, 5.0, 5.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Guscio protettivo per smartphone', 0.05, 3.0, 6.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Trolley rigido con ruote', 4.0, 40.0, 25.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto yoga antiscivolo', 1.0, 24.0, 68.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pianta fiorita in vaso', 0.7, 8.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tavolino da caffè moderno', 8.0, 80.0, 60.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pantofole invernali morbide', 0.3, 10.0, 15.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè espresso', 4.0, 12.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Vaso di fiori freschi', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Gioiello Collana di perle', 0.05, 2.0, 2.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia ergonomica da ufficio', 5.0, 24.0, 24.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per passeggino', 1.0, 15.0, 10.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Trolley per attrezzatura fotografica', 4.0, 40.0, 25.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia da cucina digitale', 0.2, 8.0, 8.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pulitore a vapore per pavimenti', 3.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sveglia digitale con proiezione', 0.2, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pendrive USB 3.0', 0.02, 3.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Giacca invernale imbottita', 1.0, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappetino mouse ergonomico', 0.1, 8.0, 10.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia sospesa a dondolo', 3.0, 30.0, 30.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 1000 pezzi', 0.6, 20.0, 30.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Seggiolino auto per bambini', 10.0, 40.0, 40.0, 70.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di forbici da cucina', 0.2, 4.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Fioriera in plastica resistente', 1.0, 12.0, 12.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete decorativo', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia pesapersone digitale', 1.0, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina da caffè a cialde', 3.0, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pigiama invernale caldo', 0.5, 15.0, 20.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per picnic', 1.0, 15.0, 10.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per matrimoni', 0.4, 10.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bottiglia termica in acciaio', 0.3, 8.0, 8.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Asciugacapelli professionale', 0.8, 15.0, 15.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Peluche unicorno soffice', 0.2, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tagliere in legno di bambù', 0.5, 20.0, 30.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di tazze da caffè', 0.6, 8.0, 8.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bicicletta da corsa in alluminio', 8.0, 70.0, 150.0, 100.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scaldabiberon per neonati', 0.5, 8.0, 8.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Portachiavi personalizzabile', 0.1, 2.0, 2.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina da caffè americano', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tenda da campeggio a cupola', 2.0, 200.0, 200.0, 150.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di matite colorate', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per viaggi', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Gioiello Orecchini pendenti', 0.05, 1.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da polso sportivo', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per trucco', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè moka', 1.0, 8.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pigiama estivo leggero', 0.3, 15.0, 20.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in acciaio inossidabile', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Spremiagrumi manuale in acciaio', 0.5, 5.0, 5.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada solare da giardino', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caffettiera a filtro automatica', 1.5, 10.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per lunch box', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite per schizzi', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ventilatore a torre silenzioso', 2.0, 15.0, 15.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 2000 pezzi', 1.0, 30.0, 40.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia pesapersone analogica', 1.0, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di pastelli a cera', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Frigorifero monoporta compatto', 30.0, 50.0, 50.0, 120.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borraccia in acciaio inox', 0.3, 8.0, 8.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di penne gel colorate', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da polso elegante', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuscino per la gravidanza', 2.0, 40.0, 20.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lavastoviglie compatta', 25.0, 60.0, 50.0, 80.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Peluche coniglio soffice', 0.2, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per neonati', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti di precisione', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto yoga ecologico', 1.0, 24.0, 68.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè pod', 3.0, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pigmenti acrilici', 0.5, 10.0, 5.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete moderno', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in bambù', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia da cucina elettronica', 0.2, 8.0, 8.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia pieghevole per esterni', 2.0, 20.0, 20.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di forbici da sarta', 0.1, 4.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per pranzo', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 1500 pezzi', 0.8, 25.0, 30.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per compleanni', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Spremiagrumi elettrico professionale', 0.5, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di matite colorate', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada solare da giardino', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete vintage', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pigiama estivo leggero', 0.3, 15.0, 20.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in acciaio inossidabile', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Spremiagrumi manuale in acciaio', 0.5, 5.0, 5.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada solare da giardino', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caffettiera a filtro automatica', 1.5, 10.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per lunch box', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite per schizzi', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ventilatore a torre silenzioso', 2.0, 15.0, 15.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 2000 pezzi', 1.0, 30.0, 40.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia pesapersone analogica', 1.0, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di pastelli a cera', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Frigorifero monoporta compatto', 30.0, 50.0, 50.0, 120.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tavolo da giardino in legno', 15.0, 80.0, 80.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Collare per cani regolabile', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cassetta degli attrezzi completa', 5.0, 40.0, 20.0, 25.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cuscino per la gravidanza', 2.0, 40.0, 20.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lavastoviglie compatta', 25.0, 60.0, 50.0, 80.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Peluche coniglio soffice', 0.2, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per neonati', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti di precisione', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto yoga ecologico', 1.0, 24.0, 68.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè pod', 3.0, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pigmenti acrilici', 0.5, 10.0, 5.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete moderno', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in bambù', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia da cucina elettronica', 0.2, 8.0, 8.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Sedia pieghevole per esterni', 2.0, 20.0, 20.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di forbici da sarta', 0.1, 4.0, 1.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per pranzo', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 1500 pezzi', 0.8, 25.0, 30.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Album fotografico per compleanni', 0.4, 8.0, 10.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Spremiagrumi elettrico professionale', 0.5, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di matite colorate', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada solare da giardino', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Orologio da parete vintage', 0.5, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pigiama estivo leggero', 0.3, 15.0, 20.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di posate in acciaio inossidabile', 1.0, 5.0, 5.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Spremiagrumi manuale in acciaio', 0.5, 5.0, 5.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada solare da giardino', 1.0, 10.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Caffettiera a filtro automatica', 1.5, 10.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Borsa termica per lunch box', 0.5, 10.0, 6.0, 8.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite per schizzi', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ventilatore a torre silenzioso', 2.0, 15.0, 15.0, 60.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Puzzle 2000 pezzi', 1.0, 30.0, 40.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Bilancia pesapersone analogica', 1.0, 30.0, 30.0, 2.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Scatola di pastelli a cera', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Frigorifero monoporta compatto', 30.0, 50.0, 50.0, 120.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tavolo da giardino in legno', 15.0, 80.0, 80.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Collare per cani regolabile', 0.1, 4.0, 4.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Cassetta degli attrezzi completa', 5.0, 40.0, 20.0, 25.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di tazze da tè', 0.6, 8.0, 8.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappetino da yoga antiscivolo', 1.0, 24.0, 68.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè espresso', 3.0, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di colori ad olio', 0.5, 10.0, 5.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da lettura a LED', 0.3, 10.0, 5.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Asciugamano da spiaggia grande', 0.8, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di chiavi a brugola', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per bagno', 0.5, 40.0, 60.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate professionali', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da trekking impermeabile', 1.5, 30.0, 50.0, 70.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè filtro', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per acquerello', 0.4, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile', 0.3, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente', 5.0, 200.0, 200.0, 250.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.5, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite da disegno professionale', 0.4, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop impermeabile', 1.0, 30.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura a olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da soffitto moderna', 1.0, 50.0, 50.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa tropicale', 0.6, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.5, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite da disegno professionale', 0.4, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop impermeabile', 1.0, 30.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura a olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da soffitto moderna', 1.0, 50.0, 50.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa tropicale', 0.6, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di tazze da caffè in ceramica', 0.6, 8.0, 8.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappetino da yoga antiscivolo', 1.0, 24.0, 68.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè espresso', 3.0, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di colori ad olio', 0.5, 10.0, 5.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da lettura a LED', 0.3, 10.0, 5.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Asciugamano da spiaggia grande', 0.8, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di chiavi a brugola', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per bagno', 0.5, 40.0, 60.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate professionali', 0.3, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da trekking impermeabile', 1.5, 30.0, 50.0, 70.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per il caffè filtro', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per acquerello', 0.4, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile', 0.3, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente', 5.0, 200.0, 200.0, 250.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.2, 5.0, 2.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.5, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite da disegno professionale', 0.4, 10.0, 5.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop impermeabile', 1.0, 30.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura a olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da soffitto moderna', 1.0, 50.0, 50.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa tropicale', 0.6, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di piatti in ceramica', 2.0, 25.0, 25.0, 3.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pallone da calcio professionale', 0.4, 22.0, 22.0, 22.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.5, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per acquerello', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da lettura a LED', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Asciugamano da mare colorato', 0.6, 70.0, 140.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.3, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per doccia', 0.4, 50.0, 80.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da trekking impermeabile', 1.8, 35.0, 60.0, 70.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè filtro', 2.2, 14.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile', 0.3, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente', 6.0, 250.0, 250.0, 300.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a stella', 0.4, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.5, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pastelli per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop antifurto', 1.2, 30.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.0, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura a olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da soffitto moderna', 1.0, 50.0, 50.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa tropicale', 0.6, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di tazze da tè', 0.6, 8.0, 8.0, 6.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Pallone da calcio professionale', 0.4, 22.0, 22.0, 22.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.5, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per acquerello', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da lettura a LED', 0.2, 5.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Asciugamano da mare colorato', 0.6, 70.0, 140.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.3, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per doccia', 0.4, 50.0, 80.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da trekking impermeabile', 1.8, 35.0, 60.0, 70.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè filtro', 2.2, 14.0, 10.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile', 0.3, 15.0, 15.0, 30.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente', 6.0, 250.0, 250.0, 300.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a stella', 0.4, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.5, 20.0, 30.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pastelli per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop antifurto', 1.2, 30.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di bicchieri in vetro', 1.2, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Palla da basket professionale', 0.6, 29.5, 29.5, 29.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè espresso', 2.7, 12.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura acrilica', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo con braccio flessibile', 0.5, 15.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa a righe', 0.8, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di giraviti Phillips', 0.3, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per vasca', 0.4, 50.0, 70.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da escursionismo impermeabile', 1.9, 35.0, 60.0, 75.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè filtro', 2.0, 14.0, 12.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile in altezza', 0.4, 18.0, 18.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente al vento', 7.0, 300.0, 300.0, 250.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.4, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.6, 25.0, 35.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pastelli colorati per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop antifurto', 1.3, 32.0, 16.0, 42.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè americano', 2.5, 12.0, 8.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura a olio', 0.5, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da soffitto moderna a LED', 1.2, 60.0, 60.0, 10.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa geometrica', 0.7, 90.0, 180.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di bicchieri in vetro', 1.2, 10.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Palla da basket professionale', 0.6, 29.5, 29.5, 29.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè espresso', 2.7, 12.0, 10.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura acrilica', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo con braccio flessibile', 0.5, 15.0, 15.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Telo mare con stampa a righe', 0.8, 80.0, 160.0, 0.2);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di giraviti Phillips', 0.3, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Tappeto antiscivolo per vasca', 0.4, 50.0, 70.0, 0.5);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di matite colorate per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino da escursionismo impermeabile', 1.9, 35.0, 60.0, 75.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Macchina per caffè filtro', 2.0, 14.0, 12.0, 20.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pennelli per pittura ad olio', 0.4, 10.0, 5.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Lampada da tavolo regolabile in altezza', 0.4, 18.0, 18.0, 40.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Ombrellone da giardino resistente al vento', 7.0, 300.0, 300.0, 250.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di cacciaviti a croce', 0.4, 6.0, 3.0, 1.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Teglia da forno antiaderente', 0.6, 25.0, 35.0, 5.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Set di pastelli colorati per bambini', 0.3, 8.0, 4.0, 15.0);
INSERT INTO public.product (name, weight, width, length, height) VALUES ('Zaino per laptop antifurto', 1.3, 32.0, 16.0, 42.0);


-- insert categorie
INSERT INTO public.category (name) VALUES ('Elettronica');
INSERT INTO public.category (name) VALUES ('Telefonia');
INSERT INTO public.category (name) VALUES ('Informatica');
INSERT INTO public.category (name) VALUES ('Ufficio');
INSERT INTO public.category (name) VALUES ('Accessori PC');
INSERT INTO public.category (name) VALUES ('Audio');
INSERT INTO public.category (name) VALUES ('TV e Home Cinema');
INSERT INTO public.category (name) VALUES ('Fotografia');
INSERT INTO public.category (name) VALUES ('Elettrodomestici');
INSERT INTO public.category (name) VALUES ('Casa');
INSERT INTO public.category (name) VALUES ('Cucina');
INSERT INTO public.category (name) VALUES ('Wearable');
INSERT INTO public.category (name) VALUES ('Tablet');
INSERT INTO public.category (name) VALUES ('Gaming');
INSERT INTO public.category (name) VALUES ('Lettori eBook');
INSERT INTO public.category (name) VALUES ('Sicurezza');
INSERT INTO public.category (name) VALUES ('Droni');
INSERT INTO public.category (name) VALUES ('Monitor');
INSERT INTO public.category (name) VALUES ('Cura Personale');
INSERT INTO public.category (name) VALUES ('Proiettori');
INSERT INTO public.category (name) VALUES ('Smart Home');
INSERT INTO public.category (name) VALUES ('Accessori TV');
INSERT INTO public.category (name) VALUES ('Accessori Cellulari');
INSERT INTO public.category (name) VALUES ('Networking');
INSERT INTO public.category (name) VALUES ('Storage');
INSERT INTO public.category (name) VALUES ('Illuminazione');
INSERT INTO public.category (name) VALUES ('Accessori Auto');
INSERT INTO public.category (name) VALUES ('Accessori');
INSERT INTO public.category (name) VALUES ('Libri');
INSERT INTO public.category (name) VALUES ('Fantasy');
INSERT INTO public.category (name) VALUES ('Gioielli');
INSERT INTO public.category (name) VALUES ('Donna');
INSERT INTO public.category (name) VALUES ('Decorazioni');
INSERT INTO public.category (name) VALUES ('Abbigliamento');
INSERT INTO public.category (name) VALUES ('Sport');
INSERT INTO public.category (name) VALUES ('Borse');
INSERT INTO public.category (name) VALUES ('Arredamento');
INSERT INTO public.category (name) VALUES ('Uomo');
INSERT INTO public.category (name) VALUES ('Giochi');
INSERT INTO public.category (name) VALUES ('Puzzle');
INSERT INTO public.category (name) VALUES ('Ciclismo');
INSERT INTO public.category (name) VALUES ('Tazze');
INSERT INTO public.category (name) VALUES ('Computer');
INSERT INTO public.category (name) VALUES ('Action Figure');
INSERT INTO public.category (name) VALUES ('Giardino');
INSERT INTO public.category (name) VALUES ('Vasi');
INSERT INTO public.category (name) VALUES ('Scrittura');
INSERT INTO public.category (name) VALUES ('Penne');
INSERT INTO public.category (name) VALUES ('Escursionismo');
INSERT INTO public.category (name) VALUES ('Portafogli');
INSERT INTO public.category (name) VALUES ('Strumenti Musicali');
INSERT INTO public.category (name) VALUES ('Ukulele');
INSERT INTO public.category (name) VALUES ('Biliardo');
INSERT INTO public.category (name) VALUES ('Calcio');
INSERT INTO public.category (name) VALUES ('Elettroutensili');
INSERT INTO public.category (name) VALUES ('Fai da te');
INSERT INTO public.category (name) VALUES ('Animali');
INSERT INTO public.category (name) VALUES ('Anelli');
INSERT INTO public.category (name) VALUES ('Bambini');
INSERT INTO public.category (name) VALUES ('Passeggini');
INSERT INTO public.category (name) VALUES ('Soggiorno');
INSERT INTO public.category (name) VALUES ('Alimentari');
INSERT INTO public.category (name) VALUES ('Frutta e Verdura');
INSERT INTO public.category (name) VALUES ('Outdoor');
INSERT INTO public.category (name) VALUES ('Lavatrici');
INSERT INTO public.category (name) VALUES ('Acquari');
INSERT INTO public.category (name) VALUES ('Climatizzazione');
INSERT INTO public.category (name) VALUES ('Posate');
INSERT INTO public.category (name) VALUES ('Famiglia');
INSERT INTO public.category (name) VALUES ('Pulizia');
INSERT INTO public.category (name) VALUES ('Giocattoli');
INSERT INTO public.category (name) VALUES ('Bambole');
INSERT INTO public.category (name) VALUES ('Orologi');
INSERT INTO public.category (name) VALUES ('Frigoriferi');
INSERT INTO public.category (name) VALUES ('Caffè');
INSERT INTO public.category (name) VALUES ('Chitarre');
INSERT INTO public.category (name) VALUES ('Barbecue');
INSERT INTO public.category (name) VALUES ('TV');
INSERT INTO public.category (name) VALUES ('Viaggi');
INSERT INTO public.category (name) VALUES ('Scuola');
INSERT INTO public.category (name) VALUES ('Pranzo');
INSERT INTO public.category (name) VALUES ('Bellezza');
INSERT INTO public.category (name) VALUES ('Trucco');
INSERT INTO public.category (name) VALUES ('Barba');
INSERT INTO public.category (name) VALUES ('Nuoto');
INSERT INTO public.category (name) VALUES ('Tovaglie');
INSERT INTO public.category (name) VALUES ('Piante');
INSERT INTO public.category (name) VALUES ('Basket');
INSERT INTO public.category (name) VALUES ('Spiaggia');
INSERT INTO public.category (name) VALUES ('Disegno');
INSERT INTO public.category (name) VALUES ('Contenitori');
INSERT INTO public.category (name) VALUES ('Utensili');
INSERT INTO public.category (name) VALUES ('Musica');
INSERT INTO public.category (name) VALUES ('CD');
INSERT INTO public.category (name) VALUES ('Yoga');
INSERT INTO public.category (name) VALUES ('Salute');
INSERT INTO public.category (name) VALUES ('Notte');
INSERT INTO public.category (name) VALUES ('Alimentazione');
INSERT INTO public.category (name) VALUES ('Portachiavi');
INSERT INTO public.category (name) VALUES ('Maternità');
INSERT INTO public.category (name) VALUES ('Arte');
INSERT INTO public.category (name) VALUES ('Pittura');
INSERT INTO public.category (name) VALUES ('Cucito');
INSERT INTO public.category (name) VALUES ('Bagno');
INSERT INTO public.category (name) VALUES ('Trekking');
INSERT INTO public.category (name) VALUES ('Piatti');
INSERT INTO public.category (name) VALUES ('Bicchieri');

