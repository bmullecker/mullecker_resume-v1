import { useState, Dispatch, SetStateAction } from 'react'; // 1. Add these
import type { ResumeData, SkillCategory, Experience, Education, VersionsStore } from '../data';

interface EditorSidebarProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  isOpen: boolean;
  onClose: () => void;
  store: VersionsStore;
  // 2. Update this type to match React's setter
  onStoreChange: Dispatch<SetStateAction<VersionsStore>>;
}

export default function EditorSidebar({ data, onChange, isOpen, onClose, store, onStoreChange }: EditorSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const response = await fetch('/api/versions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ type: 'success', message: 'Saved to versions.json!' });
        setTimeout(() => setStatus(null), 4000);
      } else {
        throw new Error(result.error || 'Unknown server error');
      }
    } catch (error: any) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  // Personal Info handlers
  const handlePersonalInfoChange = (field: keyof typeof data.personalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Experience handlers
  const handleExperienceChange = (index: number, field: keyof Experience, value: any) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const handleResponsibilityChange = (jobIndex: number, respIndex: number, value: string) => {
    const newExperience = [...data.experience];
    const newResponsibilities = [...newExperience[jobIndex].responsibilities];
    newResponsibilities[respIndex] = value;
    newExperience[jobIndex] = {
      ...newExperience[jobIndex],
      responsibilities: newResponsibilities,
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const addResponsibility = (jobIndex: number) => {
    const newExperience = [...data.experience];
    newExperience[jobIndex] = {
      ...newExperience[jobIndex],
      responsibilities: [...newExperience[jobIndex].responsibilities, ''],
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const removeResponsibility = (jobIndex: number, respIndex: number) => {
    const newExperience = [...data.experience];
    newExperience[jobIndex] = {
      ...newExperience[jobIndex],
      responsibilities: newExperience[jobIndex].responsibilities.filter((_, i) => i !== respIndex),
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const addExperience = () => {
    const newJob: Experience = {
      role: 'New Role',
      company: 'New Company',
      date: '2026',
      responsibilities: ['Responsibility description'],
    };
    onChange({
      ...data,
      experience: [...data.experience, newJob],
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  // Skills handlers
  const handleSkillCategoryChange = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = {
      ...newSkills[index],
      category: value,
    };
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const handleSkillItemChange = (catIndex: number, itemIndex: number, value: string) => {
    const newSkills = [...data.skills];
    const newItems = [...newSkills[catIndex].items];
    newItems[itemIndex] = value;
    newSkills[catIndex] = {
      ...newSkills[catIndex],
      items: newItems,
    };
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const addSkillItem = (catIndex: number) => {
    const newSkills = [...data.skills];
    newSkills[catIndex] = {
      ...newSkills[catIndex],
      items: [...newSkills[catIndex].items, ''],
    };
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const removeSkillItem = (catIndex: number, itemIndex: number) => {
    const newSkills = [...data.skills];
    newSkills[catIndex] = {
      ...newSkills[catIndex],
      items: newSkills[catIndex].items.filter((_, i) => i !== itemIndex),
    };
    onChange({
      ...data,
      skills: newSkills,
    });
  };

  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      category: 'New Category',
      items: ['Skill'],
    };
    onChange({
      ...data,
      skills: [...data.skills, newCat],
    });
  };

  const removeSkillCategory = (index: number) => {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== index),
    });
  };

  // Education handlers
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      degree: 'Degree',
      major: 'Major',
      school: 'School Name',
      year: '2026',
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={`editor-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="editor-header">
        <h3 className="editor-header-title">Resume Editor</h3>
        <div className="editor-header-actions">
          {status && (
            <span className={`toast-message ${status.type}`}>
              {status.message}
            </span>
          )}
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Version'}
          </button>
          <button className="btn-editor-close" onClick={onClose}>
            &times;
          </button>
        </div>
      </div>

      <div className="editor-body">
        {/* Personal Info Section */}
        <div className="editor-section">
          <button className="editor-section-header" onClick={() => toggleSection('personal')}>
            <span>Personal Info</span>
            <span>{activeSection === 'personal' ? '▼' : '▲'}</span>
          </button>
          {activeSection === 'personal' && (
            <div className="editor-section-content">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-input"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Professional Experience Section */}
        <div className="editor-section">
          <button className="editor-section-header" onClick={() => toggleSection('experience')}>
            <span>Professional Experience</span>
            <span>{activeSection === 'experience' ? '▼' : '▲'}</span>
          </button>
          {activeSection === 'experience' && (
            <div className="editor-section-content">
              <div className="list-editor-container">
                {data.experience.map((job, jobIdx) => (
                  <div key={jobIdx} className="list-editor-item">
                    <div className="list-editor-item-header">
                      <span>Job #{jobIdx + 1}</span>
                      <button className="btn-remove-item" onClick={() => removeExperience(jobIdx)}>
                        Remove
                      </button>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-input"
                        value={job.role}
                        onChange={(e) => handleExperienceChange(jobIdx, 'role', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-input"
                        value={job.company}
                        onChange={(e) => handleExperienceChange(jobIdx, 'company', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Dates</label>
                      <input
                        type="text"
                        className="form-input"
                        value={job.date}
                        onChange={(e) => handleExperienceChange(jobIdx, 'date', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bullet Points</label>
                      <div className="list-editor-container" style={{ gap: '8px' }}>
                        {job.responsibilities.map((resp, respIdx) => (
                          <div key={respIdx} className="bullet-manager-row">
                            <textarea
                              className="form-textarea"
                              style={{ minHeight: '60px' }}
                              value={resp}
                              onChange={(e) => handleResponsibilityChange(jobIdx, respIdx, e.target.value)}
                            />
                            <button
                              className="btn-bullet-delete"
                              onClick={() => removeResponsibility(jobIdx, respIdx)}
                              title="Delete Bullet"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <button className="btn-add-item" onClick={() => addResponsibility(jobIdx)}>
                          + Add Bullet Point
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-add-item" style={{ marginTop: '8px' }} onClick={addExperience}>
                + Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Technical Skills Section */}
        <div className="editor-section">
          <button className="editor-section-header" onClick={() => toggleSection('skills')}>
            <span>Technical Skills</span>
            <span>{activeSection === 'skills' ? '▼' : '▲'}</span>
          </button>
          {activeSection === 'skills' && (
            <div className="editor-section-content">
              <div className="list-editor-container">
                {data.skills.map((skillCat, catIdx) => (
                  <div key={catIdx} className="list-editor-item">
                    <div className="list-editor-item-header">
                      <span>Category #{catIdx + 1}</span>
                      <button className="btn-remove-item" onClick={() => removeSkillCategory(catIdx)}>
                        Remove
                      </button>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={skillCat.category}
                        onChange={(e) => handleSkillCategoryChange(catIdx, e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Skill Tags</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                        {skillCat.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              background: 'rgba(255,255,255,0.06)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              gap: '6px',
                            }}
                          >
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => handleSkillItemChange(catIdx, itemIdx, e.target.value)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '12px',
                                outline: 'none',
                                width: `${Math.max(item.length * 8, 40)}px`,
                              }}
                            />
                            <button
                              onClick={() => removeSkillItem(catIdx, itemIdx)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                padding: 0,
                                fontSize: '14px',
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="btn-add-item" onClick={() => addSkillItem(catIdx)}>
                        + Add Skill Tag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-add-item" style={{ marginTop: '8px' }} onClick={addSkillCategory}>
                + Add Skill Category
              </button>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="editor-section">
          <button className="editor-section-header" onClick={() => toggleSection('education')}>
            <span>Education</span>
            <span>{activeSection === 'education' ? '▼' : '▲'}</span>
          </button>
          {activeSection === 'education' && (
            <div className="editor-section-content">
              <div className="list-editor-container">
                {data.education.map((edu, eduIdx) => (
                  <div key={eduIdx} className="list-editor-item">
                    <div className="list-editor-item-header">
                      <span>Education #{eduIdx + 1}</span>
                      <button className="btn-remove-item" onClick={() => removeEducation(eduIdx)}>
                        Remove
                      </button>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(eduIdx, 'degree', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Major</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.major}
                        onChange={(e) => handleEducationChange(eduIdx, 'major', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">School</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(eduIdx, 'school', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(eduIdx, 'year', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-add-item" style={{ marginTop: '8px' }} onClick={addEducation}>
                + Add Education
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
