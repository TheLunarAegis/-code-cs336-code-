'use strict';
 module.exports = function(prsn){
	this.first_name = prsn.first_name;
	this.last_name = prsn.last_name;
	this.loginID = prsn.loginID;
	this.startDate = prsn.startDate;
}

module.exports.prototype.seniority = function(){
			var today = new Date();
			var startDate = new Date(this.startDate);
			var age = today.getFullYear() - startDate.getFullYear();
			var m = today.getMonth() - startDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
					age--;
			}
			return age;
}

module.exports.prototype.fullname = function(){
	return this.first_name + ' ' + this.last_name;
}