const form = document.getElementById('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
	const formControl = input.parentElement;

	formControl.classList.remove('success');
	formControl.classList.add('error');

	const small = formControl.querySelector('small');
	small.innerText = message;
};

const showSuccess = input => {
	const formControl = input.parentElement;

	formControl.classList.remove('error');
	formControl.classList.add('success');
};

const checkRequired = inputArray => {
	inputArray.forEach(input => {
		if (input.value.trim() === '') {
			showError(input, `${getFieldName(input.id)} cannot be empty`);
		}
	});
};

const getFieldName = input => {
	return input.charAt(0).toUpperCase() + input.slice(1).replace('-n', ' N');
};

// Check email is valid
const checkEmail = input => {
	if (!isValidEmail(input.value)) {
		showError(input, 'Looks like this is not an email');
	} else {
		showSuccess(input);
	}
};

const isValidEmail = email => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const checkLength = (input, min, max) => {
	if (input.value.trim().length < min) {
		showError(
			input,
			`The ${getFieldName(input.id)} should be at least ${min} characters`
		);
	} else if (input.value.trim().length > max) {
		showError(
			input,
			`The ${getFieldName(input.id)} should be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
};

const checkPasswordMatching = (password1, password2) => {
	if (password2.value !== password1.value) {
		showError(password2, 'Password does not match');
	} else {
		showSuccess(password2);
	}
};

// Event listenrs
form.addEventListener('submit', event => {
	event.preventDefault();

	checkRequired([firstName, lastName, email, password, password2]);

	if (firstName.value.trim() !== '') {
		checkLength(firstName, 3, 15);
	}

	if (lastName.value.trim() !== '') {
		checkLength(lastName, 3, 15);
	}

	if (email.value.trim() !== '') {
		checkEmail(email);
	}

	if (password.value.trim() !== '') {
		checkLength(password, 6, 25);
	}

	checkPasswordMatching(password, password2);
});
