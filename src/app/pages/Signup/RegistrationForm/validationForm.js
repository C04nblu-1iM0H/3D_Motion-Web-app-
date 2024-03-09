export function validateForm(email, password) {
    if (email.length < 3) return 'Email должен содержать не менее 3 символов ❗';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Введите корректный email адрес ❗';
    if (password.length <= 8) return 'Пароль должен содержать не менее 8 символов ❗';
    if (!/(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z\d]+$/.test(password)) return 'Пароль должен содержать буквы латинского алфавита и цифры ❗';
    return null; // No validation error
  }