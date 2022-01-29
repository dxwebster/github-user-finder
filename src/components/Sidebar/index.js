import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, ModuleList, LessonList, Lesson, ButtonSection, ModuleSection } from './styles';

import { selectLesson, setCollapseSidebar} from '../../store/modules/courses/actions';

function Sidebar() {
  const { modules, collapseSidebar } = useSelector((state) => state.courses);
  const [clickedModule, setClickedModule] = useState(null);
  const [clickedLesson, setClickedLesson] = useState(null);

  const dispatch = useDispatch();

  function handleOpenModule(moduleIndex) {
    if (moduleIndex === clickedModule) {
      setClickedModule(null);
    } else {
      setClickedModule(moduleIndex);
    }
  }

  function handleSelectLesson(module, lesson) {
    if (lesson.id === clickedLesson) {
      setClickedLesson(null);
    } else {
      setClickedLesson(lesson.id);
    }

    dispatch(selectLesson(module, lesson));
  }

  return (
    <>
      {modules?.length && (
        <Container isCollapsed={collapseSidebar}>
          
          <ButtonSection isCollapsed={collapseSidebar}>
            <button onClick={() => dispatch(setCollapseSidebar(!collapseSidebar))} />
          </ButtonSection>
         
          <ModuleSection isCollapsed={collapseSidebar}>
            {modules.map((module, moduleIndex) => (
              <ModuleList key={moduleIndex} isOpen={moduleIndex === clickedModule}>
                <div onClick={() => handleOpenModule(moduleIndex)}>
                  <h3>{module.title}</h3>
                  <span>{module.quantity} aulas</span>
                </div>

                <LessonList isOpen={moduleIndex === clickedModule}>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Lesson
                      key={lessonIndex}
                      id={lesson.id}
                      onClick={() => handleSelectLesson(module, lesson)}
                      isActive={lesson.id === clickedLesson}
                    >
                      {lesson.id}. {lesson.title}
                    </Lesson>
                  ))}
                </LessonList>
              </ModuleList>
            ))}
          </ModuleSection>
          
         
        </Container>
      )}
    </>
  );
}

export default Sidebar;
