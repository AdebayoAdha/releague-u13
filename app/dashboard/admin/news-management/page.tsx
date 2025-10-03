'use client'
import { useState, useEffect } from 'react'
import Main from '../../../components/Main'
import Section from '../../../components/Section'
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'

interface Article {
  id: number
  title: string
  content: string
  status: 'published' | 'draft'
  createdAt: string
  author: string
  image?: string
}

export default function NewsManagement() {
  const [articles, setArticles] = useState<Article[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', status: 'draft' as 'published' | 'draft', image: '' })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || [])
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingArticle ? `/api/news/${editingArticle.id}` : '/api/news'
      const method = editingArticle ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        fetchArticles()
        setShowForm(false)
        setEditingArticle(null)
        setFormData({ title: '', content: '', status: 'draft', image: '' })
      }
    } catch (error) {
      console.error('Error saving article:', error)
    }
  }

  const handleEdit = (article: Article) => {
    setEditingArticle(article)
    setFormData({ title: article.title, content: article.content, status: article.status, image: article.image || '' })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/news/${id}`, { method: 'DELETE' })
        if (response.ok) fetchArticles()
      } catch (error) {
        console.error('Error deleting article:', error)
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
      <Section title="News Management">
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <button 
            onClick={() => { setShowForm(true); setEditingArticle(null); setFormData({ title: '', content: '', status: 'draft', image: '' }) }}
            style={{ background: '#dc2626', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', marginBottom: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <FaPlus style={{ marginRight: '8px' }} />
            Create Article
          </button>

          {showForm && (
            <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>{editingArticle ? 'Edit Article' : 'Create New Article'}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Article Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                  required
                />
                <textarea
                  placeholder="Article Content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '200px', resize: 'vertical' }}
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
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  style={{ padding: '12px', marginBottom: '16px', border: '1px solid #d1d5db', borderRadius: '6px', marginRight: '16px' }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <div>
                  <button type="submit" style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', marginRight: '12px', cursor: 'pointer' }}>
                    {editingArticle ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} style={{ background: '#6b7280', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '6px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Created</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px' }}>{article.title}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        background: article.status === 'published' ? '#dcfce7' : '#fef3c7', 
                        color: article.status === 'published' ? '#166534' : '#92400e',
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {article.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(article.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(article)} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(article.id)} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {articles.length === 0 && (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: '24px' }}>No articles found. Create your first article!</p>
            )}
          </div>
        </div>
      </Section>
    </Main>
  )
}