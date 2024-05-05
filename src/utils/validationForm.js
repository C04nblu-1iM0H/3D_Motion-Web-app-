
export const validateForm = (email, password) => {
  if (email.length < 3) return 'Поле Email должно содержать не менее 3 символов ❗';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Введите корректный email адрес ❗';
  if (password.length <= 8) return 'Пароль должен содержать не менее 8 символов ❗';
  if (!/(?=.*[a-zA-Z].*[a-zA-Z])(?=.*\d.*\d)[a-zA-Z\d]+$/.test(password)) return 'Пароль должен содержать буквы латинского алфавита и цифры ❗';
  return null;
}

export const validateGoogleForm = (email) => {
  if (email.length < 3) return 'Поле Email должно содержать не менее 3 символов ❗';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Введите корректный email адрес ❗';
  return null;
}

export const validateCreateCourseForm = (courseName, courseDescription) =>{
  if(courseName.length <= 10 || courseName === '') return 'Название курса должно быть больше 20 символов  ❗';
  if(courseName.length >= 80 ) return 'Слишком большее название курса, попробуйте уложиться в 60 символов  ❗';
  if(courseDescription.length < 10 || courseDescription === '') return 'Рекомендуем увеличить размер описания курса для более полного и информативного описания ❗';

}


export const validateCreateLessonForm = (lessonName, lessonDescription, lessonMaterial) =>{
  if(lessonName.length <= 10 || lessonName === '') return 'Название урока должно быть больше 10 символов  ❗';
  if(lessonName.length >= 60 ) return 'Слишком большее название урока, попробуйте уложиться в 60 символов  ❗';
  if(lessonDescription.length < 20 || lessonDescription === '') return 'Рекомендуем увеличить размер описания урока для более полного и информативного описания ❗';
  if(lessonMaterial.length < 30 || lessonMaterial === '') return 'Рекомендуем увеличить размер материала для расскрытия тему этого урока ❗';
}