const modules = import.meta.glob('./*.{png,jpg,jpeg,svg}', {
  eager: true,   // сразу собрать в одном чанке
  as: 'url',     // вернуть не модуль, а строку-URL
})

export const expertiseImages: Record<string, string> = {}

for (const path in modules) {
  // path будет вроде './avtotechnichna.png'
  const fileName = path.replace(/^\.\//, '') // 'avtotechnichna.png'
  expertiseImages[fileName] = modules[path] as string
}