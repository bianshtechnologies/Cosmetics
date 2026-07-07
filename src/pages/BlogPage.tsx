import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, Clock, Share2, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlogPage: React.FC = () => {
  const { blogs } = useStore();
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<string[]>([
    'A masterpiece of cellular explanation. Highly informative.',
    'I switched from silicone primers to squalane based on these insights and my flakiness is gone.'
  ]);

  const activeBlog = blogs.find((b) => b.id === selectedBlogId) || null;

  // Reading progress indicator hook
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    if (selectedBlogId) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setScrollProgress(0);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedBlogId]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments((prev) => [...prev, commentInput]);
      setCommentInput('');
    }
  };

  const handleShare = () => {
    alert('Copied article link to clipboard!');
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      {/* Dynamic Reading Progress Bar */}
      {selectedBlogId && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(231, 201, 169, 0.2)', zIndex: 2000 }}>
          <div style={{ height: '100%', background: 'var(--accent-dark)', width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }} />
        </div>
      )}

      <div className="luxury-container">
        <AnimatePresence mode="wait">
          {!selectedBlogId ? (
            /* BLOG STREAM INDEX */
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              {/* Magazine Header */}
              <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-dark)', fontWeight: 600 }}>The Aura Compendium</span>
                <h1 style={{ fontSize: 'calc(2rem + 2vw)', fontFamily: 'var(--font-serif)', margin: '15px 0' }}>Botanical Science & Rituals</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>
                  Read deep essays about epidermal longevity, active botanical extraction ratios, and editorial cosmetic styling written by chemists and beauty curators.
                </p>
              </div>

              {/* Large Featured Hero Article */}
              {blogs[0] && (
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', overflow: 'hidden', padding: '30px', marginBottom: '50px' }}>
                  <img src={blogs[0].image} alt={blogs[0].title} style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '16px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600 }}>Featured Essay • {blogs[0].category}</span>
                      <h2 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', lineHeight: '1.3', margin: 0 }}>{blogs[0].title}</h2>
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{blogs[0].excerpt}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '20px' }}>
                      <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {blogs[0].readTime}</span>
                        <span>By {blogs[0].author}</span>
                      </div>
                      <button onClick={() => setSelectedBlogId(blogs[0].id)} className="btn-luxury" style={{ padding: '10px 24px', fontSize: '11px', borderRadius: '20px' }}>
                        Read Article
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Blogs List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {blogs.slice(1).map((blog) => (
                  <div key={blog.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px' }} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600 }}>{blog.category}</span>
                    <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0 }}>{blog.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{blog.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{blog.readTime}</span>
                      <button onClick={() => setSelectedBlogId(blog.id)} style={{ background: 'none', border: 'none', color: 'var(--accent-dark)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Read</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* DETAILED BLOG VIEW */
            activeBlog && (
              <motion.div
                key="blog-details"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                style={{ maxWidth: '800px', margin: '0 auto' }}
              >
                <button
                  onClick={() => setSelectedBlogId(null)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '30px' }}
                >
                  <ArrowLeft size={14} />
                  <span>Back to Compendium</span>
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <img src={activeBlog.image} alt={activeBlog.title} style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '24px', boxShadow: 'var(--glass-shadow)' }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-dark)', fontWeight: 600 }}>{activeBlog.category} • Published {activeBlog.date}</span>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button onClick={handleShare} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '50%', padding: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>

                  <h1 style={{ fontSize: '40px', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>{activeBlog.title}</h1>
                  
                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                    <span>By {activeBlog.author}</span>
                    <span>•</span>
                    <span>{activeBlog.readTime}</span>
                  </div>

                  <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '2.0', letterSpacing: '0.01em' }}>
                    {activeBlog.content}
                  </p>

                  {/* COMMENTS SECTION */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', marginTop: '40px' }}>
                    <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <MessageSquare size={18} /> Editorial Review Comments ({comments.length})
                    </h3>

                    {/* Comments list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                      {comments.map((comment, idx) => (
                        <div key={idx} style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)', padding: '16px', borderRadius: '12px', fontSize: '13px', lineHeight: '1.5' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                            <span>AURA Member</span>
                            <span>Verified Reader</span>
                          </div>
                          {comment}
                        </div>
                      ))}
                    </div>

                    {/* Comments post form */}
                    <form onSubmit={handlePostComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <textarea
                        placeholder="Add your reflections on this essay..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        required
                        className="input-luxury"
                        style={{ height: '100px', resize: 'none', borderRadius: '12px', fontSize: '13px' }}
                      />
                      <button type="submit" className="btn-luxury" style={{ alignSelf: 'flex-end', padding: '10px 24px', fontSize: '11px', borderRadius: '20px' }}>
                        Post Reflection
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
