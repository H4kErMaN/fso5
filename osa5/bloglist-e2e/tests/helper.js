const loginWith = async (page, username, password) => {
  // Klikkaa navigaation login-linkkiä ensin
  await page.getByRole('link', { name: 'login' }).click()
  await page.getByPlaceholder('Username').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  // Klikkaa navigaation create-linkkiä
  await page.getByRole('link', { name: 'create new blog' }).click()
  await page.getByPlaceholder('write blog title here').fill(title)
  await page.getByPlaceholder('write blog author here').fill(author)
  await page.getByPlaceholder('write blog url here').fill(url)
  await page.getByRole('button', { name: 'create' }).click()

  // Odotetaan että lista päivittyy ja blogi näkyy linkkinä
  await page.getByRole('link', { name: `${title} ${author}` }).waitFor()
}

module.exports = { loginWith, createBlog }
