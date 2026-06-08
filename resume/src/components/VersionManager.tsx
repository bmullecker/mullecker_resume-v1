import { useState, useRef, useEffect } from 'react';
import type { ResumeVersion, VersionsStore, ResumeData } from '../data';

interface VersionManagerProps {
  store: VersionsStore;
  currentData: ResumeData;
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (version: ResumeVersion) => void;
  onStoreChange: (store: VersionsStore) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const VERSION_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#ef4444', '#14b8a6',
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return VERSION_COLORS[Math.abs(hash) % VERSION_COLORS.length];
}

export default function VersionManager({
  store,
  currentData,
  isOpen,
  onClose,
  onSwitch,
  onStoreChange,
}: VersionManagerProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [newVersionName, setNewVersionName] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);
  const newInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renamingId && renameInputRef.current) renameInputRef.current.focus();
  }, [renamingId]);

  useEffect(() => {
    if (showNewInput && newInputRef.current) newInputRef.current.focus();
  }, [showNewInput]);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const persistStore = (newStore: VersionsStore) => {
    setSaving(true);
    try {
      localStorage.setItem('resume-store', JSON.stringify(newStore));
      showToast('success', 'Saved to browser storage');
    } catch (e: any) {
      showToast('error', 'Failed to save to local storage');
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async () => {
    const name = newVersionName.trim() || `Version ${store.versions.length + 1}`;
    const newVersion: ResumeVersion = {
      id: `v${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(currentData)), // deep clone current view
    };
    const newStore: VersionsStore = {
      activeId: newVersion.id,
      versions: [...store.versions, newVersion],
    };
    onStoreChange(newStore);
    onSwitch(newVersion);
    setShowNewInput(false);
    setNewVersionName('');
    await persistStore(newStore);
  };

  const handleSwitch = async (version: ResumeVersion) => {
    if (version.id === store.activeId) return;
    // Save current edits into the active version before switching
    const updatedVersions = store.versions.map(v =>
      v.id === store.activeId ? { ...v, data: currentData } : v
    );
    const newStore: VersionsStore = { activeId: version.id, versions: updatedVersions };
    onStoreChange(newStore);
    onSwitch(version);
    await persistStore(newStore);
  };

  const handleRenameStart = (version: ResumeVersion) => {
    setRenamingId(version.id);
    setRenameValue(version.name);
  };

  const handleRenameCommit = async () => {
    if (!renamingId) return;
    const trimmed = renameValue.trim();
    if (!trimmed) { setRenamingId(null); return; }
    const updatedVersions = store.versions.map(v =>
      v.id === renamingId ? { ...v, name: trimmed } : v
    );
    const newStore = { ...store, versions: updatedVersions };
    onStoreChange(newStore);
    setRenamingId(null);
    await persistStore(newStore);
  };

  const handleDuplicate = async (version: ResumeVersion) => {
    const duped: ResumeVersion = {
      id: `v${Date.now()}`,
      name: `${version.name} (copy)`,
      createdAt: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(version.data)),
    };
    const newStore: VersionsStore = {
      activeId: duped.id,
      versions: [...store.versions, duped],
    };
    onStoreChange(newStore);
    onSwitch(duped);
    await persistStore(newStore);
  };

  const handleDelete = async (version: ResumeVersion) => {
    if (store.versions.length <= 1) {
      showToast('error', "Can't delete the only version");
      return;
    }
    const remaining = store.versions.filter(v => v.id !== version.id);
    const newActiveId = version.id === store.activeId
      ? remaining[remaining.length - 1].id
      : store.activeId;
    const newStore: VersionsStore = { activeId: newActiveId, versions: remaining };
    onStoreChange(newStore);
    if (version.id === store.activeId) {
      onSwitch(remaining.find(v => v.id === newActiveId)!);
    }
    await persistStore(newStore);
  };

  if (!isOpen) return null;

  return (
    <div className="vm-backdrop" onClick={onClose}>
      <div className="vm-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="vm-modal-header">
          <div className="vm-modal-header-left">
            <span className="vm-icon">⎇</span>
            <h2 className="vm-title">Resume Versions</h2>
            {toast && <span className={`vm-toast ${toast.type}`}>{toast.msg}</span>}
          </div>
          <div className="vm-header-actions">
            {!showNewInput ? (
              <button className="vm-btn-new" onClick={() => setShowNewInput(true)}>
                + New Version
              </button>
            ) : (
              <div className="vm-new-input-row">
                <input
                  ref={newInputRef}
                  type="text"
                  className="vm-new-input"
                  placeholder="Version name…"
                  value={newVersionName}
                  onChange={e => setNewVersionName(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleCreate();
                    if (e.key === 'Escape') { setShowNewInput(false); setNewVersionName(''); }
                  }}
                />
                <button className="vm-btn-create" onClick={handleCreate} disabled={saving}>
                  {saving ? '…' : 'Create'}
                </button>
                <button className="vm-btn-cancel" onClick={() => { setShowNewInput(false); setNewVersionName(''); }}>
                  ✕
                </button>
              </div>
            )}
            <button className="vm-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Version Grid */}
        <div className="vm-grid">
          {store.versions.map(version => {
            const isActive = version.id === store.activeId;
            const color = getColor(version.id);
            const isRenaming = renamingId === version.id;

            return (
              <div
                key={version.id}
                className={`vm-card ${isActive ? 'active' : ''}`}
                style={{ '--version-color': color } as React.CSSProperties}
              >
                <div className="vm-card-accent" style={{ background: color }} />

                <div className="vm-card-body">
                  <div className="vm-card-top">
                    {isRenaming ? (
                      <input
                        ref={renameInputRef}
                        className="vm-rename-input"
                        value={renameValue}
                        onChange={e => setRenameValue(e.target.value)}
                        onBlur={handleRenameCommit}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleRenameCommit();
                          if (e.key === 'Escape') setRenamingId(null);
                        }}
                      />
                    ) : (
                      <span
                        className="vm-card-name"
                        onDoubleClick={() => handleRenameStart(version)}
                        title="Double-click to rename"
                      >
                        {version.name}
                      </span>
                    )}
                    {isActive && <span className="vm-active-badge">Active</span>}
                  </div>

                  <div className="vm-card-meta">
                    <span className="vm-card-preview">
                      {version.data.personalInfo.title}
                    </span>
                    <span className="vm-card-date">{formatDate(version.createdAt)}</span>
                  </div>
                </div>

                <div className="vm-card-actions">
                  {!isActive && (
                    <button
                      className="vm-action-btn vm-action-switch"
                      onClick={() => handleSwitch(version)}
                      style={{ '--action-color': color } as React.CSSProperties}
                    >
                      Switch to this
                    </button>
                  )}
                  <button
                    className="vm-action-btn vm-action-ghost"
                    onClick={() => handleRenameStart(version)}
                    title="Rename"
                  >
                    ✏
                  </button>
                  <button
                    className="vm-action-btn vm-action-ghost"
                    onClick={() => handleDuplicate(version)}
                    title="Duplicate"
                  >
                    ⎘
                  </button>
                  <button
                    className="vm-action-btn vm-action-delete"
                    onClick={() => handleDelete(version)}
                    title="Delete"
                    disabled={store.versions.length <= 1}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
