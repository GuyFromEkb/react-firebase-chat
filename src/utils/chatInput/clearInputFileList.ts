/**
 * Принимает реф инпута и предполагаемое имя файла, находящееся в FileList
 *
 * @param {FileList} inputEl  input
 * @return Если fileName есть в файл листе, то "удаляет" (по факту просто пересоздаёт файл лист)
 */
const clearInputFileList = (inputEl: HTMLInputElement | null, fileName: string) => {
  if (!inputEl?.files) return

  const dt = new DataTransfer()

  for (const key in inputEl.files) {
    const element = inputEl.files[key]
    if (Object.prototype.hasOwnProperty.call(inputEl.files, key) && element.name !== fileName) {
      dt.items.add(element)
    }
  }

  inputEl.files = dt.files
}

export { clearInputFileList }
