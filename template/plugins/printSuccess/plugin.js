const { green, blue , red} = require('kleur')

module.exports = {
  async apply(value, previousValues) {
    return new Promise(resolve => {
      console.log('\n')
      console.log(
        "Bienvenue  , Je suis Sara et je suis content de voir que tu va utiliser mon template , let's Go !!!! ! 🚀\n",
      )
      console.log(
        `${green(
          '                                                                           \n' +
            '  SSSSSSSSSSSSSS              SSSS                SSSSSSSSSSSSS              SSSSSSS \n' +
            '  SSSSSSSSSSSSSS            SSSSSSSSS             SSSSSSSSSSSSSSS         SSSSSSSSSSSSS       \n' +
            '  SSSS                    SSSSSSSSSSSSS           SSSSS     SSSSS        SSSSSSSSSSSSSSS        \n' +
            '  SSSS                  SSSSSS     SSSSSS         SSSSS    SSSSS        SSSSSS     SSSSSS       \n' +
            '  SSSSSSSSSSSSSS      SSSSSSS      SSSSSSS        SSSSSSSSSSSSS        SSSSSSS     SSSSSSS           \n' +
            '  SSSSSSSSSSSSSS     SSSSSSSSSSSSSSSSSSSSSSS      SSSSSSSSSSSSSS      SSSSSSSSSSSSSSSSSSSSS            \n' +
            '            SSSS   SSSSSSSSSSSSSSSSSSSSSSSSSS     SSSSS    SSSSSS     SSSSSSSSSSSSSSSSSSSSS           \n' +
            '            SSSS   SSSSSS              SSSSSS     SSSSS     SSSSSS    SSSSSSS       SSSSSSS             \n' +
            ' SSSSSSSSSSSSSSS   SSSSS                SSSSS     SSSSS      SSSSSS   SSSSSS         SSSSSS    \n' +
            ' SSSSSSSSSSSSSSS   SSSS                  SSSS     SSSSS        SSSSS  SSSSS           SSSSS          ',
        )}`,
      )
      if (previousValues.typescript) {
        console.log(blue("Desolé mais la version Typescript n'est pas encore disponible !"))
      }
      console.log('\n')

      console.log(
        '- 📚 Si vous avez besoin d\'en savoir plus sur ce template: +2250555412087',
      )
      console.log(
        '- 😩 Si vous avez des problèmes : jeanphilippesara225@gmail.com ',
      )
      console.log(
      '- ⭐ Si vous aimez ce Template , laissez-moi une étoile, vos avis me permettrons a apporter plus de correctif 🫶🏼🫶🏼',
      )
      resolve()
    })
  },
}
