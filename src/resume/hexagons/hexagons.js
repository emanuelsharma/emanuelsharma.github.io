import React, {useRef} from 'react';
import Styled from 'styled-components';
import Menu from './MainMenu.png';
import Screen1 from './screen4.png';
import Screen2 from './screen5.png';
import MapEditor from './MapEditor.gif';
import Gameplay from './Gameplay.gif';
import Animations from './Animations.gif';
import Grid from './Grid.PNG';

const VerticalLayout = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  flex: 1;
`;

const HorizontalLayout = Styled(VerticalLayout)`
  flex-direction: row;
  align-content: stretch;
  flex-wrap: wrap;
`;

const SectionContainer = Styled.div`
  flex-basis: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const Header = Styled.div`
  font-family: sans-serif;
  font-size: 0.2em;
  font-weight: bold;
  padding: 0.1em 0.5em;
  background-color: #fde8c6;
  color: #436b62;
  border-radius: 4px 4px 0 0;
  //font-weight: 800;
  //text-transform: uppercase;
`;

const Body = Styled.div`
  font-size: 0.12em;
  padding: 0.5em;
  background-color: #63877c;
  border-radius: 0 0 4px 4px;
  font-family: sans-serif;
  color: #fde8c6;
  overflow: hidden;
  flex: 1;
`;

const ImgContainer = Styled.div`
  flex: 1;
`;

const Img = Styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const stopPropagatingEvent = event => {
  event.stopPropagation();
}

const useHorizontalScroll = (ref, event) => {
  const el = ref.current;
  if (el) {
    if (el.deltaY == 0) return;
    el.scrollTo({
      left: el.scrollLeft + event.deltaY,
    });
  }
  event.stopPropagation();
}

export default () => {
  const ref = useRef(null);
  const ref2 = useRef(null);

  return (
    <VerticalLayout>
      <HorizontalLayout>
      <SectionContainer onClick={stopPropagatingEvent}>
        <Header>Hexagons</Header>
        <Body>
          <p>Hexagons is a turn-based strategy game.</p>
          <p>Players pilot battle-mechs through procedurally generated caves. Their goal is to control mine ressources and build more mechs so that they can push past enemy lines, and destroy all enemies.</p>
          <p>Last player standing wins!</p>
        </Body>
      </SectionContainer>
      </HorizontalLayout>
      <HorizontalLayout>
        <ImgContainer>
          <Img onClick={stopPropagatingEvent} src={Menu} alt="Logo"/>
        </ImgContainer>
        <ImgContainer>
          <Img onClick={stopPropagatingEvent} src={Grid} alt="Logo"/>
        </ImgContainer>
        <ImgContainer>
          <Img onClick={stopPropagatingEvent} src={Screen1} alt="Logo"/>
        </ImgContainer>
      </HorizontalLayout>
      <HorizontalLayout>
        <SectionContainer onClick={stopPropagatingEvent}>
          <Header>Procedural Maps</Header>
          <Body>
            <p>The design of Hexagons was largely inspired by Chess with one exception. I didn't want there to be a set of established opening positions.</p>
            <p>Instead, I wanted to take advantage of video games as a medium by procedurally generating new maps every game. This way, players are forced to modify their approach as they uncover the terrain.</p>
          </Body>
        </SectionContainer>
        <img style={{width:"100%"}} onClick={stopPropagatingEvent} src={Gameplay} alt="Logo"/>
      </HorizontalLayout>
      <HorizontalLayout>
        <SectionContainer onClick={stopPropagatingEvent}>
          <Header>Map Editor, Save System, Multiplayer</Header>
          <Body>
            <p>I wanted players to be able to enjoy Hexagons alone or with friends so I added the ability to play against AI or real players.</p>
            <p>The AI was implemented using a combination of behaviour trees for high-level decision making and state-space search for micro-level battle-tactics.</p>
            <p>The multiplayer was originally approached using a custom solution and later moved to Unity Relay.</p>
            <p>It was critical that players also have the option of saving/reloading previous games so I added this feature too. This also made it possible for players to reconnect to ongoing games and mediate desync issues.</p>
            <p>Once saving/reloading became an options, I added a map editor so that players could create custom games and scenarios.</p>
          </Body>
        </SectionContainer>
        <img style={{width:"100%"}} onClick={stopPropagatingEvent} src={MapEditor} alt="Logo"/>
      </HorizontalLayout>
      <HorizontalLayout>
        <SectionContainer onClick={stopPropagatingEvent}>
          <Header>Art</Header>
          <Body>
            <p>I took advantage of this project to flex some creative muscles as well. As a result, all assets are entirely original. In fact, this was my first experience using Blender.</p>
            <p>The animations are of particular note. I wanted units to be able to interact convincingly with their environment. To achieve this, I adopted a mix of procedural and hand-crafted animations.</p>
          </Body>
        </SectionContainer>
        <img style={{width:"100%"}} onClick={stopPropagatingEvent} src={Animations} alt="Logo"/>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
