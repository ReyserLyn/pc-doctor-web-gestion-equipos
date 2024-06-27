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
	FOREIGN KEY("service_id") REFERENCES "services_equipment"("id"),
	FOREIGN KEY("equipment_id") REFERENCES "equipments"("id")
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
 (3,'Impresora'),
 (4,'Celular');
INSERT INTO "state_equipment" ("id","name") VALUES (1,'En reparación'),
 (2,'Reparado'),
 (3,'Entregado');
INSERT INTO "services_equipment" ("id","name") VALUES (1,'Mantenimiento'),
 (2,'Internet'),
 (3,'Windows'),
 (4,'Limpieza'),
 (5,'Recarga Tintas'),
 (6,'Juegos'),
 (7,'Reparación'),
 (8,'Programas'),
 (9,'Drivers'),
 (10,'Formateo'),
 (11,'Antivirus'),
 (12,'Actualizaciones');
INSERT INTO "equipment_services" ("equipment_id","service_id") VALUES ('94789f58-5f14-4431-9049-eca2a4ae1ae4',1),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',3),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',4),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',6),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',9),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',12),
 ('94789f58-5f14-4431-9049-eca2a4ae1ae4',11),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',1),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',3),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',4),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',6),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',8),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',9),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',11),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',12),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',5),
 ('b042f269-7f28-4a46-85ef-282b614d96d9',2),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',1),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',4),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',2),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',5),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',8),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0',11);
INSERT INTO "equipments" ("id","customer","phone","device_id","brand","model","reception_date","delivery_date","state_id","entry_condition","exit_condition") VALUES ('94789f58-5f14-4431-9049-eca2a4ae1ae4','asdasdas','987471074',2,'dasdas','asd','27/06/2024 04:10','Pendiente',1,'asdasdsa','Pendiente'),
 ('b042f269-7f28-4a46-85ef-282b614d96d9','asdasdas','987471074',4,'asdsa','sdas','27/06/2024 04:10','Pendiente',1,'asddaad','Pendiente'),
 ('defd2040-fbeb-460c-beed-de0de3ee77c0','sadadsda','987471074',4,'asddasdsasa','asdasdasdas','27/06/2024 04:47','Pendiente',1,'asdasdasdsa','Pendiente');
COMMIT;
