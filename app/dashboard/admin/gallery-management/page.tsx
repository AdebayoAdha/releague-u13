'use client'
import { useState, useEffect } from 'react'
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaPlus, FaTrash, FaEye } from 'react-icons/fa'

interface Photo {
  id: number
  title: string
  image: string
  album: string
  createdAt: string
}

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', album: '', image: '' })

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      const response = await fetch('/api/gallery')
      if (response.ok) {
        const data = await response.json()
        setPhotos(data.photos || [])
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        fetchPhotos()
        setShowForm(false)
        setFormData({ title: '', album: '', image: '' })
      }
    } catch (error) {
      console.error('Error uploading photo:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      try {
        const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
        if (response.ok) fetchPhotos()
      } catch (error) {
        console.error('Error deleting photo:', error)
      }
    }
  }

  return (
    <Main>
      <div style={{ padding: '20px 16px 0' }}>
        <a href="/dashboard/admin" style={{ display: 'flex', alignItems: 'center', color: '#059669', textDecoration: 'none', marginBottom: '20px' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Dashboard
        </a>
      </div>
      <Section title="Gallery Management">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button 
            onClick={() => { setShowForm(true); setFormData({ title: '', album: '', image: '' }) }}
            style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Upload Photo
          </button>

          {showForm && (
            <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>Upload New Photo</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Photo Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  required
                />
                <input
                  type="text"
                  placeholder="Album Name"
                  value={formData.album}
                  onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                  style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  required
                />
                {formData.image && (
                  <div style={{ marginBottom: '16px' }}>
                    <img src={formData.image} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '6px' }} />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => setFormData({ ...formData, image: e.target?.result as string })
                      reader.readAsDataURL(file)
                    }
                  }}
                  style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  required
                />
                <div>
                  <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', marginRight: '12px', cursor: 'pointer' }}>
                    Upload
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} style={{ background: '#6b7280', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {photos.map((photo) => (
              <div key={photo.id} style={{ background: '#f9fafb', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={photo.image} alt={photo.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>{photo.title}</h4>
                  <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Album: {photo.album}</p>
                  <p style={{ margin: '0 0 16px 0', color: '#9ca3af', fontSize: '12px' }}>{new Date(photo.createdAt).toLocaleDateString()}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleDelete(photo.id)} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {photos.length === 0 && (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>No photos uploaded yet. Upload your first photo!</p>
          )}
        </div>
      </Section>
    </Main>
  )
}