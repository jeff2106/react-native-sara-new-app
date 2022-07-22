export const Config = {
  // Version de l'application
  VERSION: '0.9.21',
  UPLOADFILE: 'http://192.168.20.72:2025/globalpayapiMob/',
  API_URL: 'http://192.168.20.72:2053/globalpayapi/',
  // 192.168.20.221/globalpayapi/
  //http://verolive-secure.com/globalpayapi/
  //Testing : http://192.168.20.72:2053/globalpayapi/
  GRAPHQL_URL: 'http://verolive-secure.com/globalpayapi/graphql',
  SPRING_URL: 'http://192.168.20.221/globalpayapi/sp/',

  DEFAULT_COUNTRY_CODE: 'CI',

  // Lien des documents de procuration utilisé lors de l'enregistrement
  ENTREPRISE_PROCURATION_PDF_URL:
    'http://www.africau.edu/images/default/sample.pdf',
  EXPERT_COMPTABLE_PROCURATION_PDF_URL:
    'http://www.africau.edu/images/default/sample.pdf',
  CGA_PROCURATION_PDF_URL: 'http://www.africau.edu/images/default/sample.pdf',

  // Code du fournisseur des impôts
  CODE_IMPOT: 'ACT_0033',

  // Code des moyens de paiement
  CODE_COMPTE_BANCAIRE: '1',
  CODE_CARTE_BANCAIRE: '2',
  CODE_MOBILE_MONEY: '3',
  CODE_COUPON: '4',

  //lONGUEUR DES CHAMPS DU COMPTE BANCAIRE
  LONG_CODE_BANQUE: 5,
  LONG_CODE_AGENCE: 5,
  LONG_CODE_GUICHET: 5,
  LONG_NUMERO_COMPTE: 12,
  LONG_CLE_RIB: 2,

  // REGEX COMPTE BANCAIRE
  REG_CODE_BANK: '^[A-Z]{2}[0-9]{3}$',
  REG_CODE_AGENCE: '^[0-9]{5}$',
  REG_NUMERO_COMPTE: '^[0-9]{12}$',
  REG_CLE_RIB: '^[0-9]{2}$',

  //LONGUEUR DES CHAMPS DE LA CARTE
  LONG_NUMERO_CARTE: 16,
  LONG_NUMERO_CVV: 3,
  LONG_DATE_LIMIT: 5,

  // REGEX CARTE BANCAIRE
  REG_NUMERO_CARTE_VISA: '^4[0-9]{15}$',
  REG_NUMERO_CARTE_MASTERCARD: '^5[0-9]{15}$',
  REG_NUMERO_CVV: '^[0-9]{3}$',
  REG_DATE_LIMITE: '^[0-9]{2}/[0-9]{2}$',
}
