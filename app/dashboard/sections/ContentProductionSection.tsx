import { useState } from 'react';
import {  SectionPanel, FocusInput, FocusTextarea, Field, FormActions, RecordRow, EmptyState, labelStyle, inputStyle } from './shared';
import { T } from '@/app/data';

interface ContentProduction { _id?: string; title: string; type: "photo" | "video" | "other"; url: string; thumbnail?: string; description?: string; tags: string[]; createdAt?: Date; }

export default function ContentProductionSection({ contentProduction, form, setForm, editing, setEditing, onSubmit, onDelete, onEdit, loading }: any) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'url' | 'thumbnail') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', form.type === 'video' ? 'video' : 'image');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setForm({ ...form, [field]: data.url });
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SectionPanel
      subtitle="Manage" title={`${editing ? "Edit" : "Add"} Content`}
      form={
        <form onSubmit={onSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
            <FocusInput label="Title *" placeholder="Product Photoshoot" value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 6 }}>
              <label style={labelStyle}>Type *</label>
              <select
                value={form.type || "photo"}
                onChange={e => setForm({ ...form, type: e.target.value as "photo" | "video" | "other" })}
                style={{ ...inputStyle, cursor: "pointer", background: T.cream }}
                required
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <Field label={`${form.type === 'video' ? 'Video' : 'Photo'} File *`}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                type="file"
                accept={form.type === 'video' ? 'video/*' : 'image/*'}
                onChange={(e) => handleFileUpload(e, 'url')}
                disabled={uploading}
                style={{ fontSize: 12, color: T.ink }}
              />
              {uploading && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>Uploading...</span>}
            </div>
            {form.url && (
              <div style={{ marginTop: 8, fontSize: 11, color: `${T.ink}40`, wordBreak: "break-all" }}>
                {form.url}
              </div>
            )}
          </Field>
          <Field label="Thumbnail File (optional)">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'thumbnail')}
                disabled={uploading}
                style={{ fontSize: 12, color: T.ink }}
              />
              {uploading && <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber }}>Uploading...</span>}
            </div>
            {form.thumbnail && (
              <div style={{ marginTop: 8, fontSize: 11, color: `${T.ink}40`, wordBreak: "break-all" }}>
                {form.thumbnail}
              </div>
            )}
          </Field>
          <FocusTextarea label="Description" placeholder="Behind the scenes footage from our latest project." value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
          <FocusInput label="Tags (comma separated)" placeholder="behind, production, studio" value={form.tags?.join(", ") || ""} onChange={e => setForm({ ...form, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })} />
          <FormActions loading={loading} editing={!!editing} onCancel={() => { setEditing(null); setForm({ tags: [] }); }} />
        </form>
      }
      list={
        <div>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${T.sand}25` }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}30`, letterSpacing: "0.26em", textTransform: "uppercase" }}>
              {contentProduction.length} {contentProduction.length === 1 ? "item" : "items"}
            </span>
          </div>
          <div style={{ border: `1px solid ${T.sand}25` }}>
            {contentProduction.length === 0 ? <EmptyState label="content" /> : contentProduction.map((cp: ContentProduction) => (
              <RecordRow key={cp._id} onEdit={() => onEdit(cp)} onDelete={() => onDelete(cp._id!)}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 60, height: 40, background: T.creamDark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", borderRadius: 4 }}>
                    {cp.type === "video" ? (
                      cp.thumbnail ? (
                        <img src={cp.thumbnail} alt={cp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <video src={cp.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
                      )
                    ) : cp.type === "photo" ? (
                      <img src={cp.url} alt={cp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: 16 }}>📦</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, color: T.ink, fontSize: 15, letterSpacing: "-0.01em" }}>{cp.title}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: T.amber, letterSpacing: "0.12em", textTransform: "uppercase" }}>{cp.type}</span>
                      {cp.tags && cp.tags.length > 0 && (
                        <>
                          <span style={{ width: 2, height: 2, borderRadius: "50%", background: `${T.ink}25`, display: "inline-block" }} />
                          <div style={{ display: "flex", gap: 6 }}>
                            {cp.tags.slice(0, 3).map(t => <span key={t} style={{ fontFamily: "Inter, sans-serif", fontSize: 9, color: `${T.ink}40`, letterSpacing: "0.1em" }}>{t}</span>)}
                          </div>
                        </>
                      )}
                    </div>
                    {cp.description && (
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: `${T.ink}40`, marginTop: 4, maxWidth: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {cp.description}
                      </div>
                    )}
                  </div>
                </div>
              </RecordRow>
            ))}
          </div>
        </div>
      }
    />
  );
}
