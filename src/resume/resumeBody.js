import React from 'react';
import Section from './section';

export default () => (
  <div>
    <div style={{display: 'flex', gap: '1rem'}}>
    <Section title='Skills' items={[
      {text: 'Unity'}, 
      {text: 'React'},
      {text: 'NestJS'}, 
      {text: 'Github'}, 
      {text: 'GCP'}
      ]}/>
    <Section title='Languages' items={[
      {text: 'Typescript'}, 
      {text: 'C#'},
      {text: 'C++'}, 
      {text: 'Python'}, 
      ]}/>
      <Section title='Human Languages' items={[
        {text: 'English'}, 
        {text: 'French'},
        {text: 'Italian'},
        ]}/>
      </div>
    <div style={{display: 'flex', gap: '1rem'}}>
      <div style={{flexShrink:'0'}}>
        <Section column title='Education' items={[
          {text: 'Bachelor of Computer Science (Co-op) \nConcordia University, Montreal, QC\n4.27/4.30 GPA'}, 
          {text: 'DEC in Sciences (Pure and Applied)\nDawson College, Montreal, QC\n-'},
          ]}/>
      </div>
      <Section title='Projects' items={[
        {text: 'Hexagons\n (2021-2022)\n\n Turn-based strategy game\nLocal/Online multiplayer against friends and AI\nProcedurally generated maps, custom scenarios, and a map builder for authoring them', highlighted: true},
        ]}/>
    </div>
    <Section title='Work Experience' column items={[
      {text: 'Unity\n (2021-2023)\n\n Started a new team to bring existing Unity products to the Cloud for widespread use in e-commerce \nDeveloped dashboards (React) and APIs (NestJS) for managing content \nDeveloped integrations with Unity Editor'},
      {text: 'Unity (Intern)\n (2020)\n\n Joined an existing team to develop a graph-based tool for transforming large volumes of data and procedurally generating content in Unity \nWorked on new and existing front-end features to improve user-experience in terms of learnability, usability, and appeal \nWorked on back-end features to promote long-term maintainability of software and effective use of Data-Oriented-Design tech stack'}, 
      {text: 'Autodesk (Intern)\n (2020)\n\n Researched and developed machine learning models for computer vision tasks including single image super-resolution and infilling'}, 
      {text: 'Eidos (Intern)\n (2019)\n\n Created an in-house tool for logging and visualizing changes to game state over time in C++ with Dear ImGui \nDesigned and deocumented tool in collaborations with prospective users.'}, 
      {text: 'EXFO (Intern)\n (2018)\n\n Collaborated with another intern to prototype machine learning solutions to challenges in the telecom industry'}, 
      ]}/>
  </div>
);