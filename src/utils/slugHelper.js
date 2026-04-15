export const slugify = (text = '') => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const getImovelSlugPath = (imovel) => {
  const slug = slugify(imovel?.nome || 'imovel')
  return `/imoveis/${slug}`
}

export const isMongoId = (value = '') => /^[a-f0-9]{24}$/i.test(value.trim())

export const extractImovelIdFromParam = (value = '') => {
  const raw = value.trim()
  const mongoIdRegex = /^[a-f0-9]{24}$/i

  if (mongoIdRegex.test(raw)) {
    return raw
  }

  const parts = raw.split('-')
  const maybeId = parts[parts.length - 1]
  return mongoIdRegex.test(maybeId) ? maybeId : ''
}
