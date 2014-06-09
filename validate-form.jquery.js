/*
	Validate forms
	User the method validateForm(selector)
	Class:
		validate-required
		validate-number
		validate-email
		validate-url
		validate-date
		validate-past-date

	example:
		HTML:
			<form id="myForm">
				<input type="text" class="validate-required"/>
				<input type="email" class="validate-required validate-email"/>
				<input type="text" class="validate-url"/>
			</form>
		Script:
			validateForm('#myForm');

	See more
		https://github.com/alameenkhader/validate-form
*/

var validateForm = function(selector) {
	var $form = $(selector);
	var $formFields = $form.find('select, input, textarea')
		.not(':input[type=button], :input[type=submit], :input[type=reset], :input.select2-input, select.select2, select.selected-skills');

	validate.errorFields = [];
	$('.validate-error').remove();

	$.each($formFields, function(i, field) {
		if($(field).is(':visible')) { // Do not validate hidden fields.
			validate.field(field);
		}
	});

	if(validate.errorFields.length > 0) {
		$('html, body').scrollTop($('.validate-error:first').offset().top - 300);
		return false;
	} else {
		return true;
	}
};

var validate = {
	errorFields: [],
	field: function(field) {
		var minlength = $(field).attr('data-minlength');
		var options = {
			object: $(field),
			val: $(field).val().trim(),
			valLength: $(field).val().trim().length,
			isEmpty: ($(field).val().trim().length < 1)
		};
		this.required(options);
		this.email(options);
		this.url(options);
		this.number(options, minlength);
		this.date(options);
		this.pastDate(options);
	},

	markAsErrorField: function(options) {
		options.field.object.after('<label class="validate-error">' + options.message + '</label>');
		this.errorFields.push(options.field.object);
	},

	required: function(field) { //To validate presense of required field
		if(this.isValidField(field.object) && field.object.hasClass('validate-required') && field.isEmpty) {
			this.markAsErrorField({ field: field, message: 'This field is required.' });
		}	
	},

	email: function(field) {
		if(!field.isEmpty && this.isValidField(field.object) && field.object.hasClass('validate-email') && !this.isValidEmail(field.val)) {
			this.markAsErrorField({ field: field, message: 'Invalid email.' });
		}	
	},

	url: function(field) {
		if(!field.isEmpty && this.isValidField(field.object) && field.object.hasClass('validate-url') && !this.isValidUrl(field.val)) {
			this.markAsErrorField({ field: field, message: 'Invalid url.' });
		}	
	},

	number: function(field, minlength) {
		if(!field.isEmpty && this.isValidField(field.object) && field.object.hasClass('validate-number')) {
			if(!this.isValidNumber(field.val)) {
				this.markAsErrorField({ field: field, message: 'Should be a numeric.' });
			} 
		} 
	},

	date: function(field) {
		if(!field.isEmpty && this.isValidField(field.object) && field.object.hasClass('validate-date') && !this.isValidDate(field.val)) {
			this.markAsErrorField({ field: field, message: 'Invalid Date.' });
		}
	},

	pastDate: function(field) {
		if(!field.isEmpty && this.isValidField(field.object) && field.object.hasClass('validate-past-date') && !this.isValidPastDate(field.val)) {
			this.markAsErrorField({ field: field, message: 'Invalid Date.' });
		}
	},

	isValidEmail: function(str) {
		var lastAtPos = str.lastIndexOf('@');
	    var lastDotPos = str.lastIndexOf('.');
	    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
	},

	isValidField: function($field) {
		return ($.inArray($field, this.errorFields) < 0);
	},

	isValidUrl: function(str) {
		return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(str);
	},

	isValidNumber: function(str) {
		return !isNaN(str);
	},

	isValidDate: function(dateStr) {
		// Checks for the following valid date formats:
		// MM/DD/YYYY
		// Also separates date into month, day, and year variables
		var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
	 
		var matchArray = dateStr.match(datePat); // is the format ok?
		if (matchArray == null) 
		{
			//alert("Date must be in MM/DD/YYYY format")
			return false;
		}
	 
		month = matchArray[1]; // parse date into variables
		day = matchArray[3];
		year = matchArray[4];
		if (month < 1 || month > 12) 
		{ 
			// check month range
			// alert("Month must be between 1 and 12");
			return false;
		}
		if (day < 1 || day > 31) 
		{
			//alert("Day must be between 1 and 31");
			return false;
		}
		if ((month==4 || month==6 || month==9 || month==11) && day==31) 
		{
			//alert("Month "+month+" doesn't have 31 days!")
			return false;
		}
		if (month == 2) 
		{ 
			// check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day==29 && !isleap)) 
			{
				//alert("February " + year + " doesn't have " + day + " days!");
				return false;
			}
		}
		return true;  // date is valid
	},

	isValidPastDate: function(dateStr) {
		// First check whether it is a valid date or not
		return (this.isValidDate && ( new Date(dateStr) < new Date() ) );
	}

};
