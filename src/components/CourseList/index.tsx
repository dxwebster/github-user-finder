import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, CourseItem } from './styles';
import course01 from '../../assets/01.jpg';
import course02 from '../../assets/02.jpg';
import course03 from '../../assets/03.jpg';

import { coursesRequest, modulesRequest } from '../../store/modules/courses/actions';

export default function CourseList() {
  const { courses, loading } = useSelector((state: RootStateOrAny) => state.courses);
  const { userId } = useSelector((state: RootStateOrAny) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(coursesRequest());
    }
  }, []);

  function setCourseImage(name: string) {
    const Images = {
      course01,
      course02,
      course03,
      default: '',
    };
    return Images[name] || Images.default;
  }

  function getModules(courseId: string) {
    dispatch(modulesRequest(courseId));
    navigate('../course/', { replace: true });
  }

  return (
    <Container>
      {loading ? (
        <>
          <CourseItem>...loading</CourseItem>
          <CourseItem>...loading</CourseItem>
          <CourseItem>...loading</CourseItem>
        </>
      ) : (
        courses?.map((course: any) => (
          <CourseItem key={course.id}>
            <button type="button" onClick={() => getModules(course.id)}>
              <img src={setCourseImage(course.img)} alt="course-img" />

              <div className="title-box">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>

              <div className="footer-box">
                <span className="author">{course.progress}</span>
              </div>
            </button>
          </CourseItem>
        ))
      )}
    </Container>
  );
}
