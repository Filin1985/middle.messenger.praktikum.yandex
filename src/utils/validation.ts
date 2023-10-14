export const validator = {
  loginValidation: (value: string) => {
    if (value.length <= 3 || value.length >= 20) {
      return "Login should be more at least 3 and at most 20";
    }

    if (!value.match(/(?=.*[a-zA-Z])/)) {
      return "Login should have at least one letter";
    }

    if (!value.match(/(?=.*[a-zA-Z])/)) {
      return "Login should have at least one letter";
    }

    if (!value.match(/^[a-zA-Z0-9_-]{3,}$/)) {
      return "Login can include latin letters, numbers, dash and underscore";
    }
    return "";
  },

  passwordValidation: (value: string) => {
    if (value.length <= 8 || value.length >= 40) {
      return "Password should be more at least 8 and at most 40";
    }

    if (!value.match(/(?=.*[A-Z])/)) {
      return "Login should have at least one uppercase letter";
    }

    if (!value.match(/(?=.*[0-9])/)) {
      return "Login should have at least one number ";
    }

    return "";
  },

  emailValidation: (value: string) => {
    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return "Email doesn't match the pattern";
    }
    return "";
  },

  phoneValidation: (value: string) => {
    if (!value.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/)) {
      return "Phone doesn't match the pattern";
    }
    return "";
  },

  nameValidation: (value: string) => {
    if (!value.match(/^([A-ZА-Я]{1})([A-ZА-Яa-zа-я-]{0,})$/)) {
      return "Name should start from latin or cyrillic uppercase";
    }
    return "";
  },

  messageValidation: (value: string) => {
    if (!value) {
      return "Message can't be empty";
    }
    return "";
  },
};
