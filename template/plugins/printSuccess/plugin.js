const { green, blue } = require('kleur')

module.exports = {
  async apply(value, previousValues) {
    return new Promise(resolve => {
      console.log('\n')
      console.log(
        'TheCodingMachine React-Native Boilerplate initialized with success ! 🚀\n',
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
        console.log(blue('THE TYPESCRIPT VERSION 📘'))
      }
      console.log('\n')

      console.log(
        '- 📚 If you need to read more about this boilerplate : ',
      )
      console.log(
        '- 🤕 If you have some troubles : ',
      )
      console.log(
        '- ⭐ If you love this boilerplate, give us a star, you will be a ray of sunshine in our lives :) ',
      )
      resolve()
    })
  },
}
