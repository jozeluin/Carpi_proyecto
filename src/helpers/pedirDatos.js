
import data from '../data/data.json'

export const pedirDatos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {// delay de 500ms
      resolve(data)
    }, 500)
})
}

