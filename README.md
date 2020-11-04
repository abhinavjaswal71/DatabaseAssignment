```
I created 2 table named `doctors` and `Patients` table. I successfully able
to implement CRUD operation in doctors table but does'nt able to implement Patients table.

```

## MYSQL Script

This is the MYSQL Script.

```
Create database HospitalManagement
use HospitalManagement
CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

```

Run the below commands on your workbench or mysql command line to create a new user for node app



```
create table if not exists Patients(
    `Health_Card_Number` int(5) primary key not null auto_increment,
   `Patient_Name` varchar(50) not null,
   `Sex` varchar(5) null,
   `Patient_Contact_Details` varchar(100) not null,
   `Patient_Address` varchar(100) not null,
   `DateOfSubmission` Date not null,
   `DateOfDischarged` Date not null,
   `MedicalHistory` varchar(100) not null,
   `DoctorId` int(5) not null,
   foreign key(DoctorId) references doctors(id)
);

```
Run the below commands on your workbench or mysql command line to create a new user for node app

```
USE mysql;
CREATE USER 'nodeclientNew'@'localhost' IDENTIFIED by '123456';
GRANT ALL PRIVILEGES ON *.* TO 'nodeclientNew'@'localhost';
flush privileges;

```




## Commands

Clone this repo

```
git clone https://github.com/abhinavjaswal71/CIBCAssignement2
```

Initializes the app

```
npm install
```

Install the dependencies

```
npm install express express-fileupload body-parser mysql ejs req-flash --save
```

Install nodemon globally

```
npm install nodemon -g
```

Start the app (make sure mysql scripts below are run before the next command)

```
nodemon app.js
```

If nodemon does not work please start the script by 

```
node app.js
```


Open the browser and browse at http://localhost:5000

