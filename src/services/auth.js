export function signIn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'IUHASIDUFHAIUSDHFUIHAIUSDHFUIAD',
        user: {
          name: 'Matheus',
          email: 'matheus.tfrigo@gmail.com',
        },
      })
    }, 1000)
  })
}