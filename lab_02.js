/*Student:		Jordan Caleb Hordyk
 *Date:			9-12-2018
 *Class:		CS 336
 *Professor:	Keith VanderLinden
 */

function Person(name, birthday) {
	this.name = name;
	this.birthday = birthday;
	this.my_friends = new Array();
	this.greeting = "You're a nerd!";
}

Person.prototype.change_name = function(new_name) {
	this.name = new_name;
}

Person.prototype.get_name = function() {
	return this.name;
}

Person.prototype.change_greeting = function(new_greeting) {
	this.greeting = new_greeting;
}

Person.prototype.get_age = function() {
	var today = new Date();
	var birthday = new Date(this.birthday);
	var age = today.getFullYear() - birthday.getFullYear();
	var m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

Person.prototype.add_friend = function(friend_name){
	this.my_friends.push(friend_name);
}

Person.prototype.get_greeting = function() {
	return this.greeting;
}

console.log("");

var p1 = new Person("Jordan", "1997-05-25");
console.log(p1.get_name() + " says: " + p1.get_greeting());
var p2 = new Person("Gavin", "1998-09-14");
console.log(p2.get_name() + " says: " + p2.get_greeting());

console.log("");

p1.add_friend("Gavin");
p2.add_friend("Jordan");

console.log(p1.get_name() + " is " + p1.get_age() + " years old.");
console.log(p2.get_name() + " is " + p2.get_age() + " years old.");

console.log("");

p1.change_name("TheLunarAegis");
p1.change_greeting("You Must Construct Additional Pylons");
p2.change_name("Garen");
p2.change_greeting("DEMACIAAAAA!!!");

console.log(p1.get_name() + " says: " + p1.get_greeting());
console.log(p2.get_name() + " says: " + p2.get_greeting());

console.log("");

console.log(p1.get_name() + " is " + p1.get_age() + " years old.");
console.log(p2.get_name() + " is " + p2.get_age() + " years old.");

console.log("");


function Student(name, birthday, study){
	Person.call(this, name, birthday);
	this.study = study;
	this.greeting = "I'm a nerd.";
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.get_study = function() {
	return this.study;
}

var s1 = new Student("Justine", "1996-11-05", "Math");
s1.add_friend("Jordan");

console.log(s1.get_name() + " says: " + s1.get_greeting());
console.log(s1.get_name() + " is " + s1.get_age() + " years old.");
console.log(s1.get_name() + " studies " + s1.get_study() + ".");

console.log("");

