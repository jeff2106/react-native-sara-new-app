export default function (email) {
  const EMAIL_REG = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return EMAIL_REG.test(email)
}
