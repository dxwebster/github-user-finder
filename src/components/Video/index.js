import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';

function Video() {
  const { activeModule, activeLesson, collapseSidebar } = useSelector((state) => state.courses);

  return (
    <Container sidebarIsCollapsed={collapseSidebar}>
      {activeModule && activeLesson && (
        <>
          <div>
            <h1>{activeModule.title}</h1>
            <h3>{activeLesson.title}</h3>
          </div>

          <iframe src={activeLesson.video} frameBorder="0" title="video" />
        </>
      )}
    </Container>
  );
}

export default Video;
