export default function validationProfileForm(name, surname, gender, phone) {
  const phoneRegex = /^(\+7|8)\d{10}$/;

  if(name.length < 3 && name.length > 20){
    return "Поле Name должно содержать не менее 3 и не более 20 символов";
  }else if(!/^[a-zA-Zа-яА-Я]+$/.test(name)){
    return "Name может содержать только русские и английские символы.";
  }

  if(surname.length < 3 && surname.length > 50){
    return "Поле surname должно содержать не менее 3 и не более 50 символов";
  }else if(!/^[a-zA-Zа-яА-Я]+$/.test(surname)){
    return "Surname может содержать только русские и английские символы.";
  }

  if(!gender) return "Вы не выбрали ваш пол";

  if(!phoneRegex.test(phone)){
    return "Не корректный номер телефона";
  }

  return null;
}