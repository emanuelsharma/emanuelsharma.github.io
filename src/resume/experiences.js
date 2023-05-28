import React from 'react';
import {skills, programmingLanguages} from './skills';
import Hexagons from './hexagons/hexagons';

export const workExperiences = {
  UnityFullTime: {
    name: 'Unity ', 
    date: '(2021-2023)', 
    description: 
      `Started a new team to bring existing Unity products to the Cloud for widespread use in e-commerce
      Developed dashboards (React) and APIs (NestJS) for managing content
      Developed integrations with Unity Editor`,
    skills: [
      skills.Unity, 
      skills.React, 
      skills.NestJS, 
      skills.ThreeJS, 
      skills.Github, 
      skills.GCP, 
      skills.Figma, 
      skills.Jira, 
      programmingLanguages.CSharp,
      programmingLanguages.Typescript,
    ],
  },
  UnityInternship: {
    name: 'Unity (Intern)', 
    date: '(2020)',
    description: 
      `Joined an existing team to develop a graph-based tool for transforming large volumes of data and procedurally generating content in Unity
      Worked on new and existing front-end features to improve user-experience in terms of learnability, usability, and appeal
      Worked on back-end features to promote long-term maintainability of software and effective use of Data-Oriented-Design tech stack`,
    skills: [
      skills.Unity, 
      skills.Github, 
      skills.Jira, 
      programmingLanguages.CSharp,
    ],
  },
  AutodeskInternship: {
    name: 'Autodesk (Intern)', 
    date: '(2020)',
    description: 
      `Researched and developed machine learning models for computer vision tasks including single image super-resolution and infilling`,
    skills: [
      skills.Github, 
      skills.Jira, 
      programmingLanguages.Cpp,
      programmingLanguages.Python,
    ],
  },
  EidosInternship: {
    name: 'Eidos (Intern)', 
    date: '(2019)',
    description: 
      `Created an in-house tool for logging and visualizing changes to game state over time in C++ with Dear ImGui
      Designed and documented tool in collaborations with prospective users`,
    skills: [
      programmingLanguages.Cpp,
    ],
  },
  EXFOInternship: {
    name: 'EXFO (Intern)', 
    date: '(2018)',
    description: 
      `Collaborated with another intern to prototype machine learning solutions to challenges in the telecom industry`,
    skills: [
      programmingLanguages.Python,
    ],
  },
};

export const projects = {
  Hexagons: {
    name: 'Hexagons', 
    date: '(2021-2022)', 
    description: 
      `Turn-based strategy game
      Local/Online multiplayer against friends and AI
      Procedurally generated maps, custom scenarios, and a map builder for authoring them`,
    skills: [
      skills.Unity, 
      skills.Blender, 
      skills.Photoshop, 
      skills.Illustrator, 
      programmingLanguages.CSharp,
    ],
    renderDetails: () => (<Hexagons/>),
  },
};
