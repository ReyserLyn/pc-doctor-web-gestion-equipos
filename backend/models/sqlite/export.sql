BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "role_user" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "state_user" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	TEXT NOT NULL UNIQUE,
	"first_name"	TEXT NOT NULL,
	"last_name"	TEXT NOT NULL,
	"username"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"email"	TEXT NOT NULL,
	"phone"	TEXT NOT NULL,
	"role_id"	INTEGER,
	"status_id"	INTEGER,
	"created_at"	TEXT NOT NULL,
	FOREIGN KEY("status_id") REFERENCES "state_user"("id"),
	FOREIGN KEY("role_id") REFERENCES "role_user"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "devices_equipment" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "state_equipment" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "services_equipment" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "equipments" (
	"id"	TEXT NOT NULL UNIQUE,
	"customer"	TEXT NOT NULL,
	"phone"	TEXT,
	"device_id"	INTEGER,
	"brand"	TEXT,
	"model"	TEXT,
	"reception_date"	TEXT,
	"delivery_date"	TEXT,
	"state_id"	INTEGER,
	"service_id"	INTEGER,
	"entry_condition"	TEXT,
	"exit_condition"	TEXT,
	FOREIGN KEY("state_id") REFERENCES "state_equipment"("id"),
	FOREIGN KEY("device_id") REFERENCES "devices_equipment"("id"),
	FOREIGN KEY("service_id") REFERENCES "services_equipment"("id"),
	PRIMARY KEY("id")
);


INSERT INTO "role_user" ("id","name") VALUES (1,'Administrador'),
 (2,'Tecnico');
INSERT INTO "state_user" ("id","name") VALUES (1,'Activo'),
 (2,'Inactivo');
INSERT INTO "users" ("id","first_name","last_name","username","password","email","phone","role_id","status_id","created_at") VALUES ('cdf3bea0-9d59-4a9b-b9c1-4a92acf59e0b','Reyser Julio','Zapata Butron','ReyserLynnsn','$2b$10$sHBwP1lGHhGUGSZID06lfO6JIERJNmqf5MMpfSrFeMBEHUwdNHoKi','reyser.zap.145@gmail.com','987471074',1,1,'18/06/2024, 08:29'),
 ('0c9f492c-1f20-4e2a-b239-54fae9e0d3be','Reyser Julio','Zapata Butron','ReyserLy','$2b$10$qekDSw73zzUg9yGn5xFoH.eodLKouIYTM.pVg/tNAs.Lwnuw7xiJC','reyser.zap.145@gmail.com','987471074',1,1,'18/06/2024, 16:42'),
 ('de2dc207-2f60-4adf-aca3-6d92c4b2ef1d','Reyser Julio','Zapata Butron','ReyserLyn','$2b$10$QrR5mTU8/7ZZbb.Fo2LDAOabeKJRRFQ.qCPVxRMydfab07NvIviSi','reyser.zap.145@gmail.com','987471074',1,1,'18/06/2024, 16:42');
INSERT INTO "devices_equipment" ("id","name") VALUES (1,'Laptop'),
 (2,'Computadora'),
 (3,'Impresora');
INSERT INTO "state_equipment" ("id","name") VALUES (1,'En Reparación'),
 (2,'Reparado'),
 (3,'Entregado');
INSERT INTO "services_equipment" ("id","name") VALUES (1,'Mantenimiento Interno'),
 (2,'Mantenimiento Lógico'),
 (3,'Activaciones'),
 (4,'Programas'),
 (5,'Juegos'),
 (6,'Reparación'),
 (7,'Drivers'),
 (8,'Formateo'),
 (9,'Actualizaciones');
INSERT INTO "equipments" ("id","customer","phone","device_id","brand","model","reception_date","delivery_date","state_id","service_id","entry_condition","exit_condition") VALUES ('123e4567-e89b-12d3-a456-426614174010','John Doe','1234567890',1,'Dell','Inspiron 15','2024-06-18 08:00','2024-06-20 17:00',1,3,'Good','Good'),
 ('123e4567-e89b-12d3-a456-426614174011','Jane Smith','0987654321',2,'HP','Pavilion 14','2024-06-19 09:00','2024-06-21 16:00',2,5,'Fair','Repaired'),
 ('123e4567-e89b-12d3-a456-426614174012','Alice Johnson','5551234567',1,'Apple','MacBook Pro','2024-06-20 10:00','2024-06-22 15:00',3,2,'Excellent','Like New'),
 ('123e4567-e89b-12d3-a456-426614174013','Bob Brown','4445556666',3,'Canon','Pixma MG2522','2024-06-21 11:00','2024-06-23 14:00',1,1,'Poor','Functional'),
 ('123e4567-e89b-12d3-a456-426614174014','Charlie Green','3334445555',2,'Lenovo','ThinkPad X1','2024-06-22 12:00','2024-06-24 13:00',2,4,'Damaged','Repaired');
COMMIT;
