import { useState } from 'react'
import { normalizeImageUrl, handleImageError } from '../utils/imageHelper'

function ImageGallery({ images, title = 'Galeria de Fotos' }) {
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!images || images.length === 0) {
    return null
  }

  const displayedImages = showAll ? images : images.slice(0, 10)
  const hasMore = images.length > 10

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const navigateLightbox = (direction) => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    } else {
      setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-2xl font-light mb-6 text-gray-900 tracking-tight">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedImages.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={normalizeImageUrl(img)}
                alt={`${title} - Imagem ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {hasMore && !showAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
            >
              Ver Todas as Fotos ({images.length})
            </button>
          </div>
        )}

        {showAll && hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Mostrar Menos
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('prev')
            }}
            className="absolute left-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateLightbox('next')
            }}
            className="absolute right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="max-w-7xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={normalizeImageUrl(images[lightboxIndex])}
              alt={`Imagem ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={handleImageError}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageGallery
