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
	PRIMARY KEY("id"),
	FOREIGN KEY("role_id") REFERENCES "role_user"("id"),
	FOREIGN KEY("status_id") REFERENCES "state_user"("id")
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
CREATE TABLE IF NOT EXISTS "equipment_services" (
	"equipment_id"	TEXT,
	"service_id"	INTEGER,
	PRIMARY KEY("equipment_id","service_id"),
	FOREIGN KEY("equipment_id") REFERENCES "equipments"("id"),
	FOREIGN KEY("service_id") REFERENCES "services_equipment"("id")
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
	"entry_condition"	TEXT,
	"exit_condition"	TEXT,
	PRIMARY KEY("id"),
	FOREIGN KEY("device_id") REFERENCES "devices_equipment"("id"),
	FOREIGN KEY("state_id") REFERENCES "state_equipment"("id")
);
INSERT INTO "role_user" ("id","name") VALUES (1,'Administrador'),
 (2,'Técnico');
INSERT INTO "state_user" ("id","name") VALUES (1,'Activo'),
 (2,'Inactivo');
INSERT INTO "users" ("id","first_name","last_name","username","password","email","phone","role_id","status_id","created_at") VALUES ('f910fd68-2115-4671-a8b3-89a0a0d2f494','Admin Name','Admin Ap','admin','$2b$10$Dwk7xmAK.MSGHBwvUhLAA.5KwHJbFrFLxyUeioF36NQPzjc5Nv1zu','admin@admin.com','123456789',1,1,'24/06/2024, 01:47');
INSERT INTO "devices_equipment" ("id","name") VALUES (1,'Laptop'),
 (2,'Computadora'),
 (3,'Impresora');
INSERT INTO "state_equipment" ("id","name") VALUES (1,'En reparación'),
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
COMMIT;
