import React from 'react';
import Section from './section';
import Styled from 'styled-components';
import {skills, humanLanguages, programmingLanguages} from './skills';
import {workExperiences, projects} from './experiences';

const VerticalLayout = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
`

const HorizontalLayout = Styled(VerticalLayout)`
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-items: stretch;
`

export default ({selectedItem, handleItemSelected}) => {
  const SkillBox = ({title, items}) => (
    <Section 
      title={title}
      items={Array.from(Object.values(items)).map(item => ({
        id: item.name,
        text: item.name,
        highlighted: 
          selectedItem && (
            selectedItem.id === item.name || 
            selectedItem?.skills?.some(({name}) => name === item.name)
            ),
      }))}
      handleItemSelected={handleItemSelected}
    />);
  
  const ExperienceBox = ({title, items}) => (
    <Section 
      column
      title={title}
      items={Array.from(Object.values(items)).map(item => ({
          ...item, 
          id: item.name,
          text: `${item.name}\n${item.date}\n${item.description}`,
          highlighted: 
            selectedItem && (
              selectedItem.id === item.name || 
              item?.skills?.some(({name}) => name === selectedItem.id)
              ),
      }))}
      handleItemSelected={handleItemSelected}
    />);

  return (<VerticalLayout>
    <SkillBox title='Skills/Tools' items={skills}/>
    <HorizontalLayout>
      <SkillBox title='Human Languages' items={humanLanguages}/>
      <SkillBox title='Programming Languages' items={programmingLanguages}/>
    </HorizontalLayout>
    <HorizontalLayout>
      <Section column title='Education'
        items={[
          {id: '1', text: 'Bachelor of Computer Science (Co-op) \nConcordia University, Montreal, QC\n4.27/4.30 GPA'}, 
          {id: '2', text: 'DEC in Sciences (Pure and Applied)\nDawson College, Montreal, QC'},
        ]}
        handleItemSelected={() => {}}
      />
      <ExperienceBox title='Projects' items={projects}/>
    </HorizontalLayout>
    <ExperienceBox title='Work Experience' items={workExperiences}/>
  </VerticalLayout>);
}