const EndPoints = {
  login : 'home/api/v1/login/',
  logout : 'home/api/v1/logout/',
  registerByEmail : 'home/api/v1/send-email-otp/',
  registerByPhone : 'home/api/v1/send-phone-otp/',
  registerOtpEmail : 'home/api/v1/confirm-email-otp/',
  registerOtpPhone : 'home/api/v1/confirm-phone-otp/',
  createPassword : 'home/api/v1/create-password/',
  plaidCallToken: 'payment/api/v1/generate_token_link/',
  termsAndConditions: 'modules/terms-and-conditions/',
  privacyPolicies: 'modules/privacy-policy/',
  plaidPost: '/payment/api/v1/generate_token_link/'
}

export default EndPoints;