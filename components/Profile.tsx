

import React, { useState } from 'react';
import { Language, Theme, ThemeCustomization, Pattern, Intensity } from '../types';
import { LANGUAGES, THEME_CUSTOMIZATIONS } from '../constants';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';
import { UserCircleIcon, KeyIcon, ArrowRightOnRectangleIcon, PencilSquareIcon } from './Icons';

interface ProfileProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  themeCustomization: ThemeCustomization;
  setThemeCustomization: (customization: ThemeCustomization) => void;
  handleLogout: () => void;
  openChangePasswordModal: () => void;
}

const Profile: React.FC<ProfileProps> = ({ 
    language, 
    setLanguage, 
    theme, 
    themeCustomization, 
    setThemeCustomization,
    handleLogout,
    openChangePasswordModal 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Artisan User',
    email: 'artisan@example.com',
    bio: 'Passionate creator of handcrafted goods, weaving stories into every piece. Inspired by tradition and nature.'
  });
  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleEdit = () => {
    setTempProfileData(profileData); // Store current state before editing
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // No need to reset tempProfileData, it will be overwritten on next edit
  };

  const handleSave = () => {
    setProfileData(tempProfileData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
    console.log("Profile data saved:", tempProfileData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfileData(prev => ({ ...prev, [name]: value }));
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const customOptions = THEME_CUSTOMIZATIONS[theme];

  const handlePatternChange = (pattern: Pattern) => {
    setThemeCustomization({ ...themeCustomization, pattern });
  };
  
  const handleIntensityChange = (intensity: Intensity) => {
    setThemeCustomization({ ...themeCustomization, intensity });
  };

  const optionButtonBase = `px-3 py-1.5 text-sm rounded-full border-2 transition-colors text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text`;
  const optionButtonInactive = `border-transparent bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 hover:border-border-color dark:hover:border-gray-600`;
  const optionButtonActive = `font-semibold border-accent-primary dark:border-indigo-400 ethnic:border-ethnic-primary craftsman:border-craftsman-primary handloom:border-handloom-primary terracotta:border-terracotta-primary tribal:border-tribal-primary madhubani:border-madhubani-primary bg-accent-secondary dark:bg-indigo-500/20 ethnic:bg-ethnic-primary/10 craftsman:bg-craftsman-primary/10 handloom:bg-handloom-primary/10 terracotta:bg-terracotta-primary/10 tribal:bg-tribal-primary/10 madhubani:bg-madhubani-primary/10`;

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <Card>
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                {!isEditing && (
                    <Button variant="secondary" onClick={handleEdit}>
                        <PencilSquareIcon className="w-5 h-5 mr-2" /> Edit Profile
                    </Button>
                )}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-bg-secondary dark:bg-gray-700/50 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 rounded-full flex items-center justify-center">
                        <UserCircleIcon className="w-24 h-24 text-gray-400" />
                    </div>
                    {isEditing && <Button variant="secondary" className="w-full mt-2">Change Picture</Button>}
                </div>
                <div className="flex-grow w-full space-y-4">
                    {isEditing ? (
                        <>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input label="Full Name" name="name" value={tempProfileData.name} onChange={handleInputChange} />
                                <Input label="Email" type="email" name="email" value={tempProfileData.email} onChange={handleInputChange} />
                            </div>
                            <Textarea label="Bio / Artist Statement" name="bio" value={tempProfileData.bio} onChange={handleInputChange} rows={3}/>
                        </>
                    ) : (
                        <>
                            <div>
                                <p className="font-semibold text-text-secondary">Full Name</p>
                                <p className="text-lg">{profileData.name}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-text-secondary">Email</p>
                                <p className="text-lg">{profileData.email}</p>
                            </div>
                             <div>
                                <p className="font-semibold text-text-secondary">Bio</p>
                                <p className="text-lg">{profileData.bio}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isEditing && (
                <div className="flex justify-end gap-4 mt-6">
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            )}
        </Card>

        <Card className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <div className="space-y-6">
                <div>
                    <label className="font-semibold block mb-2">Language</label>
                    <Select value={language} onChange={e => setLanguage(e.target.value as Language)}>
                        {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </Select>
                    <p className="text-sm mt-1 text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">Set your preferred language for UI and AI generation.</p>
                </div>

                {customOptions && (
                  <>
                    <hr className="border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border" />
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Customize '{capitalize(theme)}' Theme</h3>
                      <div className="space-y-4">
                          {customOptions.patterns && (
                              <div>
                                  <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Pattern Style</label>
                                  <div className="flex flex-wrap gap-2">
                                      {customOptions.patterns.map(p => (
                                        <button key={p} onClick={() => handlePatternChange(p)} className={`${optionButtonBase} ${themeCustomization.pattern === p ? optionButtonActive : optionButtonInactive}`}>
                                            {p}
                                        </button>
                                      ))}
                                  </div>
                              </div>
                          )}
                           {customOptions.intensities && (
                              <div>
                                  <label className="font-semibold block mb-2 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">Pattern Intensity</label>
                                  <div className="flex flex-wrap gap-2">
                                      {customOptions.intensities.map(i => (
                                        <button key={i} onClick={() => handleIntensityChange(i)} className={`${optionButtonBase} ${themeCustomization.intensity === i ? optionButtonActive : optionButtonInactive}`}>
                                            {i}
                                        </button>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>
                    </div>
                  </>
                )}
                
                <hr className="border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border" />
                <div>
                    <h3 className="font-semibold text-lg">Account Management</h3>
                    <div className="flex flex-wrap gap-4 mt-2">
                        <Button variant="secondary" onClick={openChangePasswordModal} className="flex items-center gap-2">
                            <KeyIcon className="w-5 h-5" />
                            <span>Change Password</span>
                        </Button>
                        <Button variant="primary" onClick={handleLogout} className="flex items-center gap-2">
                           <ArrowRightOnRectangleIcon className="w-5 h-5" />
                           <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
};

export default Profile;
