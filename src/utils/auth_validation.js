import Validator from 'validator';
import isEmpty from 'is-empty';
export const validateLoginInput = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    // Email checks
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    // Password checks
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    
    return { errors, isValid: isEmpty(errors) };
};

export const validateRegisterInput = (data, res) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.nickname = !isEmpty(data.nickname) ? data.nickname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  
  // Nickname checks
  if(Validator.isEmpty(data.nickname)) {
    errors.nickname = 'Nickname field is required';
  }
  
  // Email checks
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  // Password checks
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  // at least one numeric character (?=.*[0-9]), (?=.*\d)
  // at least one special character (?=.*[!@#\$%\^&\*])
  if(data.password.match("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]){8,}")) {
    errors.password ='Password is not enaugh strong';
  } 

  // Check validation
  if (!isEmpty(errors)) {
    return res.status(400).json(errors);
  } else return;
};

// export const isAdmin = (user) => {
//   if(user.role === 'Admin') {
//      return true;
//   }
//   else {
//      res.status(400).send('You have not access for this action');
//   }
   
// };
