'use client'
import { useState } from 'react'

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setUploaded(true)
      setTimeout(() => {
        setUploaded(false)
        setSelectedFile(null)
      }, 3000)
    }, 2000)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Data Story
          </h2>
          <p className="text-xl text-gray-600">
            Upload a video showcasing how NarraViz transformed your data workflow
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-dashed border-blue-200">
          <div className="text-center">
            <input
              type="file"
              accept="video/mp4,video/mov,video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-upload"
            />
            
            {!selectedFile && !uploaded && (
              <label
                htmlFor="video-upload"
                className="cursor-pointer inline-flex flex-col items-center"
              >
                <span className="text-5xl mb-4">📹</span>
                <span className="text-lg font-medium text-gray-700 mb-2">
                  Click to upload video
                </span>
                <span className="text-sm text-gray-500">
                  MP4, MOV up to 100MB
                </span>
              </label>
            )}

            {selectedFile && !uploading && !uploaded && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <span className="text-sm text-gray-700">{selectedFile.name}</span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <button
                  onClick={handleUpload}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                >
                  Upload Video
                </button>
              </div>
            )}

            {uploading && (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                <p className="text-gray-600">Uploading your story...</p>
              </div>
            )}

            {uploaded && (
              <div className="space-y-4">
                <span className="text-5xl">✅</span>
                <p className="text-green-600 font-medium">Thank you for sharing your story!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}