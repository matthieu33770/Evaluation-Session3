#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

#------------------------------------------------------------
# Schema: projet3
#------------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `db_projet3`;
USE `db_projet3`;

#------------------------------------------------------------
# Table: role
#------------------------------------------------------------

CREATE TABLE IF NOT EXISTS role(
        id_role Int  Auto_increment  NOT NULL ,
        fonction    Varchar (255) NOT NULL
	,CONSTRAINT role_PK PRIMARY KEY (id_role)
)ENGINE=InnoDB;


INSERT INTO `role` (`fonction`) VALUES ('admin'),('user');

#------------------------------------------------------------
# Table: users
#------------------------------------------------------------

CREATE TABLE IF NOT EXISTS users(
        id_users Int  Auto_increment  NOT NULL ,
        prenom   Varchar (100) NOT NULL ,
        nom      Varchar (100) NOT NULL ,
        email    Varchar (255) NOT NULL ,
        id_role  Int
	,CONSTRAINT users_PK PRIMARY KEY (id_users)

	,CONSTRAINT users_role_FK FOREIGN KEY (id_role) REFERENCES role(id_role)
)ENGINE=InnoDB;

INSERT INTO `users` (`prenom`, `nom`, `email`, `id_role`) VALUES ('Géraldine','Autrique','geraldine.autrique@laposte.fr',2),('Nicolas','Filine','nicolas.filine@laposte.fr',2),('Pierre','Gorce','pierrexgorce@gmail.com',1),('Samuel','Joblon','samuel.joblon@gmail.com',2),('Phoneprasong','Khamvongsa','pomlao@hotmail.com',2),('Vincent','Lebegue','vincent.lebegue@labanquepostale.fr',2),('Matthieu','Londeix','matthieu.londeix@laposte.fr',1),('Thomas','Longueville','thomas.longueville@laposte.fr',2),('Christine','Métivier','christine.pereira@laposte.fr',2),('Laurent','Picard','laurent2.picard@laposte.fr',2),('David','Pouline','david.pouline@facteo.fr',2),('Julien','Prod\'homme','prodhomme.julien@gmail.com',2),('Samuel','Sabot','samuel.sabot@facteo.fr',2),('Salvatore','Sancesario','salvatore.sancesario@facteo.fr',2),('David','Sylvestre','david.sylvestre.lp2@gmail.com',2),('Cedric','Tressous','cedric.tressous@gmail.com',2),('Josselin','Tobelem','jtobelem@simplon.co',2),('Philippe','Bouget','	
pbouget.ext@simplon.co',2);