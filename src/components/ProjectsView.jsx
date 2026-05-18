'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Edit3, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProjectHeader from './ProjectHeader';
import ProjectFormModal from './ProjectFormModal';
import ViewTabs from './ViewTabs';
import TimelineSchedule from './TimelineSchedule';

const statusColors = {
  Active: 'bg-emerald-500/10 text-emerald-300',
  'On-hold': 'bg-amber-500/10 text-amber-300',
  Completed: 'bg-slate-700/10 text-slate-400',
  Planning: 'bg-sky-500/10 text-sky-300',
};

const ProjectsView = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchProjects = useCallback(async () => {
    if (!user?.id) {
      setProjects([]);
      return;
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch projects error:', error);
      setMessage('Unable to load projects.');
      return;
    }

    setProjects(data || []);
  }, [user]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, user]);

  const handleOpenNewProject = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
    setMessage('');
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setMessage('');
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const handleSaveProject = async (projectData) => {
    setIsSaving(true);
    setMessage('');

    try {
      if (selectedProject?.id) {
        const { error } = await supabase
          .from('projects')
          .update({
            title: projectData.title,
            description: projectData.description,
            status: projectData.status,
            progress: projectData.progress,
            members_count: projectData.members_count,
            company: projectData.company,
            category: projectData.category,
            start_date: projectData.start_date || null,
            end_date: projectData.end_date || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedProject.id)
          .eq('owner_id', user?.id);

        if (error) throw error;
        setMessage('Project updated successfully.');
      } else {
        if (!user?.id) {
          throw new Error('User not authenticated');
        }

        const { error } = await supabase
          .from('projects')
          .insert([{
            ...projectData,
            owner_id: user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }]);

        if (error) throw error;
        setMessage('Project created successfully.');
      }

      await fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error('Save project error:', error);
      setMessage(error.message || 'Could not save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (project) => {
    if (!project?.id) return;
    setIsSaving(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)
        .eq('owner_id', user?.id);
      if (error) throw error;
      await fetchProjects();
      handleCloseModal();
      setMessage('Project deleted successfully.');
    } catch (error) {
      console.error('Delete project error:', error);
      setMessage(error.message || 'Could not delete project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <ProjectHeader onAddProject={handleOpenNewProject} />
      {message && (
        <div className="mb-4 rounded-2xl border border-slate-700 bg-[#171c2f] px-5 py-4 text-sm text-slate-200">
          {message}
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-slate-800 bg-[#171c2f] p-8 text-center text-slate-400">
                No projects found yet. Click "New Project" to add one.
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="rounded-3xl border border-slate-800 bg-[#171c2f] p-6 shadow-xl shadow-slate-950/20">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{project.category || 'General'}</p>
                      <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status] || 'bg-slate-700/10 text-slate-300'}`}>
                      {project.status || 'Active'}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-400 min-h-[3rem]">{project.description || 'No description provided.'}</p>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-3">
                      <span>Progress</span>
                      <span>{project.progress ?? 0}%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-3">
                      <span>Team size</span>
                      <span>{project.members_count ?? 1}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-900/60 px-4 py-3">
                      <span>Company</span>
                      <span>{project.company || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project)}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#5f47ff] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4c36e0]"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(project)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-[#171c2f] px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-rose-500 hover:text-rose-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
        isSaving={isSaving}
      />

      <div className="mt-10">
        <ViewTabs />
        <TimelineSchedule />
      </div>
    </div>
  );
};

export default ProjectsView;
